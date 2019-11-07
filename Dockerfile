FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .

RUN rm -rf ./node_modules

RUN npm install

RUN npm uninstall bcrypt
RUN npm install --save bcrypt

EXPOSE 10009

CMD [ "npm", "start" ]