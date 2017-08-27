FROM node:8.2.1-alpine

WORKDIR /workdir
COPY package.json yarn.lock ./
RUN yarn --prod
COPY src ./src
COPY static ./static
COPY *.yml ./

ENTRYPOINT ["yarn"]
CMD ["version"]
