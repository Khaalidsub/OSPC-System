FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./

RUN npm install --production

COPY ./ ./

RUN npm build

EXPOSE 3000

USER node

CMD ["yarn","start"]