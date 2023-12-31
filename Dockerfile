FROM node:18.16.1-alpine3.18

RUN mkdir app
WORKDIR /app

COPY package*.json .
RUN npm  install 

COPY . .
RUN npm run build


EXPOSE 3000

CMD [ "npm", "run", "start" ]