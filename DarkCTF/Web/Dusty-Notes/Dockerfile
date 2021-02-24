FROM node:12-buster-slim

WORKDIR /app
COPY files/ .

RUN echo darkCTF{n0d3js_l1br4r13s_go3s_brrrr!} > /flag.txt

ENV NODE_ENV production
ENV PORT 9999
RUN npm install


EXPOSE 9999

CMD ["node", "/app/app.js"]