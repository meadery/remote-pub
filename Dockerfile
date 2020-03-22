FROM node:13 AS dev
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY ./ /app/

EXPOSE 5000
CMD [ "npm", "run", "dev" ]

FROM node:13 as prod-deps-builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
COPY ./ /app/
RUN npm run build

FROM gcr.io/distroless/nodejs as prod
WORKDIR /app

COPY --from=prod-deps-builder /app/build /app/build
COPY --from=prod-deps-builder /app/views /app/views
COPY --from=prod-deps-builder /app/node_modules /app/node_modules

EXPOSE 5000
CMD ["/app/build/index.js" ]