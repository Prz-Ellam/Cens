# First stage
FROM node:16.17-alpine as BUILD

WORKDIR /app/cest

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


# Second stage
FROM node:16.17-alpine as PROD

WORKDIR /app/cest

COPY --from=BUILD /app/cest/dist /app/cest/dist
COPY --from=BUILD /app/cest/node_modules /app/cest/node_modules

EXPOSE 8080

COPY package*.json .
COPY vite.config.js .

CMD ["npm", "run", "preview"]