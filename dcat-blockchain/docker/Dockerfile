FROM ubuntu:18.04
RUN apt-get update
RUN apt update
RUN apt-get install sudo &&\
    apt-get -y install vim
RUN apt-get -y install software-properties-common
RUN add-apt-repository -y ppa:ethereum/ethereum
RUN apt -y install curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
RUN apt -y install nodejs
RUN apt-get -y install ethereum
RUN mkdir dcnet && mkdir /dcnet/node1 && mkdir /dcnet/node1/keystore
COPY dcnet.json /dcnet
#COPY UTC--2020-03-01T20-41-31.851679000Z--ec831f9cd2c1617998c4bd93ebc6d064751712f1 /dcnet/node1/keystore
COPY SocialNetwork.json /dcnet/node1
COPY geth-init.sh /dcnet/node1
COPY get-data.js /dcnet/node1
RUN cd /dcnet/node1 && npm -y install web3
RUN chown 755 /dcnet/node1/geth-init.sh
RUN geth --nousb --datadir /dcnet/node1/ init /dcnet/dcnet.json
ENTRYPOINT nohup geth --nousb --port 3012 --networkid 7410 --datadir=/dcnet/node1 --maxpeers=5  --rpc --rpcport 8542 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner" --ipcpath=geth.ipc --allow-insecure-unlock --ipcpath=/dcnet/node1/geth.ipc


#cd /dcnet/node1
#npm -y install web3
# docker build -t poqianggo/posts .
# docker exec -ti 013914adfc8b  /bin/bash
