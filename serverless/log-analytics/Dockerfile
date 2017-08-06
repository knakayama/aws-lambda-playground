FROM node:8.2.1-alpine

WORKDIR /serverless
COPY package.json yarn.lock ./
RUN yarn --prod
COPY *.yml ./
COPY src ./src
COPY data ./data

ENV AWS_DEFAULT_REGION=us-west-2

ENTRYPOINT ["yarn"]
CMD ["version"]
