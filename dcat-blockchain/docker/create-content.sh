docker stop $(docker ps -q)
docker rm $(docker ps -a -q)
docker-compose up -d poqianggo
sleep 3
##docker-compose up dkr
docker exec $(docker ps -q) /bin/bash /dcnet/node1/geth-init.sh
#docker exec -ti $(docker ps -q) /bin/bash
docker stop $(docker ps -q)
