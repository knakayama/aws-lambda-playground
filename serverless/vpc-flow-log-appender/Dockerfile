FROM node:8.2.1-alpine

WORKDIR /serverless
COPY package.json yarn.lock ./
RUN yarn --prod --ignore-scripts
COPY src ./src
RUN yarn --prod
COPY *.yml ./

ENV AWS_DEFAULT_REGION=us-west-2

ENTRYPOINT ["yarn"]
CMD ["version"]
