FROM node:16.16.0 as BUILD_IMAGE

WORKDIR /app/vite_app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn run build

FROM node:16.16.0 as PRODUCTION_IMAGE

WORKDIR /app/vite_app

COPY --from=BUILD_IMAGE /app/vite_app/dist/  /app/vite_app/dist/
EXPOSE 3000

COPY package.json .
COPY yarn.lock .
COPY vite.config.ts .

RUN yarn add typescript
EXPOSE 3000

CMD ["serve","-s","dist"]