FROM node:13 as base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ /app/

RUN npm run build
EXPOSE 5000

FROM base AS dev
CMD [ "npm", "run", "dev" ]

FROM node:13-alpine as prod
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=base /app/build /app/build
COPY views/ /app/views

EXPOSE 5000
CMD ["node", "/app/build/index.js" ]