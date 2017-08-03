FROM node:8.2.1-alpine

COPY package.json /serverless/package.json
WORKDIR /serverless
RUN yarn --prod
COPY src ./src
COPY input.json *.yml ./

ENTRYPOINT ["yarn"]
CMD ["version"]
