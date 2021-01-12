FROM node:12.13.0-alpine As development

RUN apk update && apk add build-base git python

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ["yarn", "start:dev" ]