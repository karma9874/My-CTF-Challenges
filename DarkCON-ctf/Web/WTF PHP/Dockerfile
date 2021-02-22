FROM php:7.3.2-apache

RUN echo darkCON{us1ng_3_y34r_01d_bug_t0_byp4ss_d1s4ble_funct10n} > /etc/f1@g.txt

RUN mv /bin/rm /bin/.rm

RUN chmod -R 444 /etc/f1@g.txt

COPY files/ /var/www/html
COPY ./php.ini /usr/local/etc/php/

#RUN chown root:root /var/www/html/index.php
#RUN chown root:root /var/www/html/upload.php
#RUN chown www-data:www-data /var/www/html/uploads

RUN chown -R root:www-data /var/www/html/ && chmod 750 /var/www/html/
RUN chown www-data:www-data /var/www/html/uploads

EXPOSE 80
