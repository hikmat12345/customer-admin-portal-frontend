#!/bin/bash 
REGION=us-east-1
AWS_ACCOUNT_NUMBER=271453939301
S3_CODE_DEPLOY=271453939301-aws-code-deploy-us-east-1
CONTAINER_PORT=3000
#ECR_REPO_NAME=customer-admin-ui
# Fetch the latest image from ECR Repo and extract the TAG from it
echo "Getting newest tag..."
export NEWEST_TAG=`aws ecr --region $REGION describe-images --repository-name $ECR_REPO_NAME --query\
 'sort_by(imageDetails,& imagePushedAt)[-1].imageTags[0]' | sed 's/"//g'`
echo "Done. Newest tag is $NEWEST_TAG"

echo "Creating task defintions for environments..."
# Substitute ${NEWEST_TAG} in file $ECR_REPO_NAME-dev-template.json and save 
# as td-$ECR_REPO_NAME-dev.json 
jq -n --arg FAMILY "dev-$ECR_REPO_NAME" \
      --arg ECR_REPO_NAME $ECR_REPO_NAME \
      --arg IMAGE "$AWS_ACCOUNT_NUMBER.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO_NAME:$NEWEST_TAG" \
      --argjson CONTAINER_PORT $CONTAINER_PORT \
      --arg AWSLOGS_GROUP "/ecs/dev/$ECR_REPO_NAME" \
      -f td-dev-template.json > td-$ECR_REPO_NAME-dev.json

jq -n --arg FAMILY "uat-$ECR_REPO_NAME" \
      --arg ECR_REPO_NAME $ECR_REPO_NAME \
      --arg IMAGE "$AWS_ACCOUNT_NUMBER.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO_NAME:$NEWEST_TAG" \
      --argjson CONTAINER_PORT $CONTAINER_PORT \
      --arg AWSLOGS_GROUP "/ecs/uat/$ECR_REPO_NAME" \
      -f td-uat-template.json > td-$ECR_REPO_NAME-uat.json

jq -n --arg FAMILY "prod-$ECR_REPO_NAME" \
      --arg ECR_REPO_NAME $ECR_REPO_NAME \
      --arg IMAGE "$AWS_ACCOUNT_NUMBER.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO_NAME:$NEWEST_TAG" \
      --argjson CONTAINER_PORT $CONTAINER_PORT \
      --arg AWSLOGS_GROUP "/ecs/prod/$ECR_REPO_NAME" \
      -f td-prod-template.json > td-$ECR_REPO_NAME-prod.json
echo "Done."

# Register our updated task definition "td-$ECR_REPO_NAME-dev.json" to ECS and filter 
# the ARN (with out "") and save as variable
echo "Registering task definitions..."
export TASK_DEF_ARN_DEV=`aws ecs --region $REGION register-task-definition --cli-input-json file://td-$ECR_REPO_NAME-dev.json \
 | jq .taskDefinition.taskDefinitionArn | sed 's/"//g'`
echo "  Dev task definition registered: $TASK_DEF_ARN_DEV"

export TASK_DEF_ARN_UAT=`aws ecs --region $REGION register-task-definition --cli-input-json file://td-$ECR_REPO_NAME-uat.json \
 | jq .taskDefinition.taskDefinitionArn | sed 's/"//g'`
echo "  Uat task definition registered: $TASK_DEF_ARN_UAT"

export TASK_DEF_ARN_PROD=`aws ecs --region $REGION register-task-definition --cli-input-json file://td-$ECR_REPO_NAME-prod.json \
 | jq .taskDefinition.taskDefinitionArn | sed 's/"//g'`
echo "  Production task definition registered: $TASK_DEF_ARN_PROD"
echo "Done."

echo "Creating appspecs from template..."
# Substitute ${TASK_DEF_ARN} in file "*appspec-template.json" 
jq -n --arg TASK_DEF_ARN $TASK_DEF_ARN_DEV \
      --argjson CONTAINER_PORT $CONTAINER_PORT \
      --arg ECR_REPO_NAME $ECR_REPO_NAME \
      -f appspec-template.json > dev-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json
echo "  Dev appspec created."

jq -n --arg TASK_DEF_ARN $TASK_DEF_ARN_UAT \
      --argjson CONTAINER_PORT $CONTAINER_PORT \
      --arg ECR_REPO_NAME $ECR_REPO_NAME \
      -f appspec-template.json > uat-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json
echo "  Uat appspec created."

jq -n --arg TASK_DEF_ARN $TASK_DEF_ARN_PROD \
      --argjson CONTAINER_PORT $CONTAINER_PORT \
      --arg ECR_REPO_NAME $ECR_REPO_NAME \
      -f appspec-template.json > production-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json
echo "  Production appspec created."

echo "Done."

# Upload file "dev-$ECR_REPO_NAME-appspec.json" to S3 for later use in deployment-section
# AWS recommends using S3 for storing appspecs; see reference in "create-deployment-*.json"
echo "Uploading appspecs to S3..."
aws s3 cp dev-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json s3://$S3_CODE_DEPLOY
aws s3 cp uat-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json s3://$S3_CODE_DEPLOY
aws s3 cp production-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json s3://$S3_CODE_DEPLOY
echo "Done."

echo "Creating CodeDeploy commands from template..."
# Substitute ${NEWEST_TAG} in "create-deployment-dev.json"
jq -n --arg ECR_REPO_NAME $ECR_REPO_NAME \
      --arg DEPLOYMENT_GROUP_NAME "dev-$ECR_REPO_NAME" \
      --arg OBJECT_KEY "dev-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json" \
      --arg S3_BUCKET "$S3_CODE_DEPLOY" \
      -f create-deployment-template.json > create-deployment-dev.json
echo "  Dev created."

jq -n --arg ECR_REPO_NAME $ECR_REPO_NAME \
      --arg DEPLOYMENT_GROUP_NAME "uat-$ECR_REPO_NAME" \
      --arg OBJECT_KEY "uat-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json" \
      --arg S3_BUCKET "$S3_CODE_DEPLOY" \
      -f create-deployment-template.json > create-deployment-uat.json
echo "  Uat created."

jq -n --arg ECR_REPO_NAME $ECR_REPO_NAME \
      --arg DEPLOYMENT_GROUP_NAME "prod-$ECR_REPO_NAME" \
      --arg OBJECT_KEY "production-$ECR_REPO_NAME-appspec-$NEWEST_TAG.json" \
      --arg S3_BUCKET "$S3_CODE_DEPLOY" \
      -f create-deployment-template.json > create-deployment-production.json
echo "  Production created."

echo "Done."