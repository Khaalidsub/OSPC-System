FROM node:14-alpine As development

RUN apk update && apk add build-base git python

# WORKDIR /usr/src/app

COPY  package.json yarn.lock lerna.json ./
COPY  packages/client/package.json ./packages/client/package.json
COPY  packages/common ./packages/common

RUN yarn install

COPY packages/client/ ./packages/client/

RUN yarn build:client

FROM node:14-alpine As production

# WORKDIR /usr/src/app

COPY  package.json yarn.lock lerna.json ./
COPY  packages/client/package.json ./packages/client/package.json

COPY --from=development ./packages/common .

RUN yarn install --production

COPY --from=development . .

EXPOSE 3000
ENV NODE_ENV production
CMD ["yarn", "run:prod:client" ]