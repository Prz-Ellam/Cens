FROM node:16.17-alpine as BUILD

WORKDIR /app/cens

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]