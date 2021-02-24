FROM node:12-buster-slim

RUN apt-get update && apt-get install python -y && apt-get install build-essential -y

RUN echo darkCTF{1nj3ct1ng_d0cx_f0r_xx3} > /flag.txt

COPY cron /etc/cron.d/cron
RUN chmod 0644 /etc/cron.d/cron
RUN crontab /etc/cron.d/cron

WORKDIR /app
COPY files/ .

RUN npm install

EXPOSE 9999

CMD cron
CMD ["node", "/app/app.js"]


