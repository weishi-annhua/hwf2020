geth --exec "personal.newAccount('start123')" attach /dcnet/node1/geth.ipc
geth --exec "personal.unlockAccount(eth.coinbase,'start123',9999999)" attach /dcnet/node1/geth.ipc
geth --exec "admin.addPeer('enode://627de6fb3896802aaa6e119cb83c1dab4ff9417574b0428a14edde1746f6083ebd976b0d28b557789498d1bece44be0cdb9cb36b862f23b1060ac9b5f87b1342@10.51.9.84:3020?discport=0')" attach /dcnet/node1/geth.ipc
cd /dcnet/node1
npm -y install web3
echo "Wating for connection..."
sleep 30
echo "Getting data..1"
sleep 30
echo "Getting data...2"
sleep 30
echo "Getting data....3"
sleep 30
echo "Generating file...4"
node get-data.js
