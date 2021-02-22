FROM node:12-buster-slim

WORKDIR /usr/src/app

COPY files/ .

RUN npm install

EXPOSE 9999

CMD ["node", "/usr/src/app/app.js"]