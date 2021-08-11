docker rm -f xss
docker build -t xss . && \
docker run -d --name=xss --rm -p80:9999 -it xss
