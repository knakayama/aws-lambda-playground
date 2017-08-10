FROM node:8.2.1-alpine

WORKDIR /serverless
COPY package.json yarn.lock ./
RUN yarn --prod
COPY *.yml ./
COPY src ./src
RUN sed -i "s/__\(ApiGatewayDeployment\)__/\\1$(date '+%s')/" resource.yml

ENV AWS_DEFAULT_REGION=us-west-2

ENTRYPOINT ["yarn"]
CMD ["version"]
