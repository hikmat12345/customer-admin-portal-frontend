'use server';

import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { COGNITO_CLIENT_ID, COGNITO_USER_POOL_ID } from 'config/config';

export const verifyJwtToken = async (token: string) => {
  const userPoolId = COGNITO_USER_POOL_ID;
  const clientId = COGNITO_CLIENT_ID;

  if (!userPoolId || !clientId) {
    return false;
  }

  const verifier: any = CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: 'id',
    clientId,
  });

  try {
    const payload = await verifier.verify(token);
    return payload;
  } catch (err) {
    return false;
  }
};
