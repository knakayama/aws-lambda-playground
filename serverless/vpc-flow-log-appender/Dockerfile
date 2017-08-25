FROM node:8.2.1-alpine

WORKDIR /workdir
COPY package.json yarn.lock ./
RUN yarn --prod --ignore-scripts
COPY src ./src
RUN yarn --prod
COPY *.yml ./

ENV AWS_DEFAULT_REGION=ap-northeast-1

ENTRYPOINT ["yarn"]
CMD ["version"]
