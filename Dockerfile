# specify the node base image with your desired version node:<version>
FROM node:10

ENV NPM_CONFIG_LOGLEVEL info
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# replace this with your application's default port
EXPOSE 8080

CMD [ "node", "app.js" ]
