# Initial Stage
FROM node:22-alpine as builder
RUN apk update && apk add git openssh
WORKDIR /app
COPY package*.json ./
RUN --mount=type=ssh \
    --mount=type=bind,target=~/.ssh/known_hosts,source=known_hosts \
    npm install --production
COPY . .
RUN npm run build

# Second Stage
FROM node:22-alpine
RUN apk update && apk add git openssh
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]