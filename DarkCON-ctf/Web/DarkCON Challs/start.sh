docker build -t graphql_app .
docker-compose up --build -d
docker cp ./darkcon.sql graphql_mysql:/
docker exec graphql_mysql /bin/sh -c 'mysql -u root -pscammer@123 darkcon </darkcon.sql'
