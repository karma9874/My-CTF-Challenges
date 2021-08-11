while true;
do
if curl --output /dev/null --silent --head --fail 127.0.0.1; then
  sleep 30
else
  ./build_docker.sh
  sleep 20
fi
done
