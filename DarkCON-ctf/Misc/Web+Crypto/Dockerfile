FROM node:12-buster-slim

RUN echo darkCON{l3ngth_3xt3ns10n_2_n0d3_s3r1411z3_brrrrr_xD} > /etc/flag.txt

RUN apt-get update && apt-get install -y \
curl

RUN mkdir -p /karma/app/src

COPY files/ /karma/app/src

RUN useradd -M -d /karma karma

RUN chown -R root:karma /karma && chmod -R 755 /karma

RUN chmod -R 440 /etc/flag.txt

WORKDIR /karma/app/src

RUN npm install

EXPOSE 9999

CMD ["node", "/karma/app/src/app.js"]
