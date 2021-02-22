FROM node:12-buster-slim

RUN echo darkCON{wh4t_1f_1_t01d_u_h4v3_r1ght_f14g_0f_th1s_ch411} > /etc/flag.txt

RUN chmod -R 440 /etc/flag.txt

ENV PHANTOM_JS_VERSION ${PHANTOM_JS_VERSION:-2.1.1-linux-x86_64}

# Install runtime dependencies
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        bzip2 \
        libfontconfig \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# https://github.com/Yelp/dumb-init/releases
ENV DUMB_INIT_VERSION ${DUMB_INIT_VERSION:-1.2.2}

RUN set -x  \
    # Install official PhantomJS release
 && mkdir /tmp/phantomjs \
 && curl -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOM_JS_VERSION}.tar.bz2 \
        | tar -xj --strip-components=1 -C /tmp/phantomjs \
 && mv /tmp/phantomjs/bin/phantomjs /usr/local/bin \
    # Install dumb-init (to handle PID 1 correctly).
 && curl -Lso /tmp/dumb-init.deb https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64.deb \
 && dpkg -i /tmp/dumb-init.deb

ENV OPENSSL_CONF=/opt/openssl.cnf

#RUN set -x \
    # Runs as non-root user.
 #&& useradd --system --uid 52379 -m --shell /usr/sbin/nologin phantomjs \
# && touch /opt/openssl.cnf \
    # Basic test.
# && su phantomjs -s /bin/sh -c "dumb-init phantomjs --version"


RUN mkdir -p /karma/app/src

COPY files/ /karma/app/src

RUN useradd -M -d /karma karma

RUN chown -R root:karma /karma && chmod -R 755 /karma

WORKDIR /karma/app/src

RUN npm install


EXPOSE 9999

CMD ["node", "app.js"]
