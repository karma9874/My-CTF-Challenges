FROM httpd:2.4
COPY ./files/ /usr/local/apache2/htdocs/
RUN mv /usr/local/apache2/htdocs/meme_stash/git /usr/local/apache2/htdocs/meme_stash/.git
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf