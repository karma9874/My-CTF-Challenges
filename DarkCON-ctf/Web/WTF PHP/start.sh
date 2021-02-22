if [ "$#" -ne 2 ]
then
        echo "Usage: ./start.sh <docker name> <port number>"
else
        echo "Building docker"
        docker build -t $1 .
        echo "Running docker"
        docker run --cap-add LINUX_IMMUTABLE -d --name=$1 -p 0.0.0.0:$2:80 $1
fi