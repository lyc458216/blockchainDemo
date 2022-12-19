const SHA256 = require('crypto-js/sha256');
export class Block {
    // 构造函数
    constructor(index, timestamp) {
        this.index = index; 
        this.timestamp = timestamp; 
        this.transactions = []; 
        this.previousHash = '';
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    // 计算区块的哈希值 
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString(); 
    }
    // 添加新的交易到当前区块 
    addNewTransaction(sender, recipient, amount) {
        this.transactions.push({
            sender,
            recipient,
            amount
        })
    }
    // 查看当前区块里的交易信息 
    getTransactions() {
        return this.transactions; 
    }
    // 挖矿
    mineBlock(difficulty) {
        console.log(`Mining block ${this.index}`);
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }
}