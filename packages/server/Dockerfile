FROM node:12 as base

WORKDIR /app
COPY package.json \
    lerna.json \
    packages/server/package.json \
    packages/common \
    ./
RUN yarn --production
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

FROM base AS dev
COPY nest-cli.json \
    tsconfig.* \
    #  .eslintrc.js \
    #  .prettierrc \
    ./
# bring in src from context
# COPY packages/server/src .
RUN yarn
# RUN yarn lint
RUN yarn build

# use one of the smallest images possible
FROM node:12-alpine
# get package.json from base
COPY --from=base /app/package.json ./
# get the dist back
COPY --from=dev /app/dist/ ./dist/
# get the node_modules from the intial cache
COPY --from=base /app/node_modules/ ./node_modules/
# expose application port 
EXPOSE 3000
# start
CMD ["node", "dist/main.js"]