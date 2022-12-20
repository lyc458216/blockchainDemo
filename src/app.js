const express = require('express');
const {v4: uuidV4} = require('uuid');
const bodyParser = require("body-parser");
const Blockchain = require('./blockchain').Blockchain;

const app = express();
const port = process.env.PORT || 3000;
const nodeIdentifier = uuidV4();
const testCoin = new Blockchain();
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// 接口实现
// 挖矿，将目前的交易打包到新的区块
app.get('/mine', (req, res) => {
    const latestBlockIndex = testCoin.chain.length;
    const newBlock = new Block(latestBlockIndex, new Date().toString()); 
    newBlock.transactions = testCoin.currentTransactions;
    // Get a reward for mining the new block 
    newBlock.transactions.unshift({
    sender: '0',
        recipient: nodeIdentifier, 
        amount: 50
    });
    testCoin.addBlock(newBlock);
    testCoin.currentTransactions = [];
    res.send(`Mined new block ${JSON.stringify(newBlock, undefined, 2)}`);
});

// 添加新的交易，格式为JSON
app.post('/transactions/new', urlencodedParser, (req, res) => {
    const newTransaction = req.body;
    testCoin.addNewTransaction(newTransaction);
    res.send(`The transaction ${JSON.stringify(newTransaction)} is successfully added to the blockchain.`);
});

// 返回当前的区块链
app.get('/chain', (req, res) => {
    const response = {
        chain: testCoin.chain,
        length: testCoin.chain.length
    }
    res.send(response);
})

// 记录日志的中间件
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`; 
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.error(err);
    });
    next();
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});