docker build -t wc_app .
docker-compose up --build -d
docker cp ./scam.sql wc_mysql:/
docker exec wc_mysql /bin/sh -c 'mysql -u root -pscammer@123 scam </scam.sql'
