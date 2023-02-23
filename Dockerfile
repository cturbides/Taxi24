FROM node:current-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i

COPY . .

ENV DB_USER=${DB_USER} DB_PASSWORD=${DB_PASSWORD}

CMD ["npm", "start"]
