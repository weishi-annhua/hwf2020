const Web3 = require('web3');
const fs = require('fs');
const SocialNetwork = require('./SocialNetwork.json');

//web3 = new Web3("http://localhost:8542");
//web3.eth.getAccounts(console.log);
test();


//abi = JSON.parse(fs.readFileSync('SocialNetwork.abi').toString());
//console.log(abi);

//contract = new web3.eth.Contract(abi);
//contract.options.address = "0x9696A8094782E1214c8DddBD1670ca0b8A803dE5";

async function test() {
    web3 = new Web3("http://localhost:8542");

    // Load account
    const accounts = await web3.eth.getAccounts();
    thisAccount = accounts[0];

    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]

    //console.log(networkData);

    posts = [];
    let postsText;
    if(networkData) {
        const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, networkData.address);
        const postCount = await socialNetwork.methods.postCount().call();
        // Load Posts
        for (var i = postCount; i >= 1; i--) {
          const post = await socialNetwork.methods.posts(i).call();
          posts = [...posts, post];
          //console.log(post['content']);
          postsText += post['content'] + '\n';
        }
        // write to a new file named 2pac.txt
        fs.writeFile('postContents.txt', postsText, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
  
        // success case, the file was saved
          console.log('Post contents saved!');
        });
        //console.log(posts);
        console.log(postsText);
    } else {
        console.log('SocialNetwork contract not deployed to detected network.');
    }

  
}

async function getFirstAccount(web3) {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
}

async function loadBlockchainData(web3) {
    web3 = new Web3("http://localhost:8542");
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = SocialNetwork.networks[networkId]
    if(networkData) {
      const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
      this.setState({ socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      // Load Posts
      for (var i = postCount; i >= 1; i--) {
      //for (var i = 1; i <= postCount; i++) {
        const post = await socialNetwork.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }
      // Sort posts. Show highest tipped posts first
      this.setState({
        posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      this.setState({ loading: false})
    } else {
      window.alert('SocialNetwork contract not deployed to detected network.')
    }

}