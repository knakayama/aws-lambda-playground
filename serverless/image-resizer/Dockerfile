FROM node:8.2.1-alpine

COPY package.json /serverless/package.json
WORKDIR /serverless
RUN yarn --prod --ignore-scripts
COPY src ./src
COPY images ./images
RUN yarn --prod
COPY *.yml event.json ./

ENTRYPOINT ["yarn"]
CMD ["version"]
