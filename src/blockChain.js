import {Block} from './block'
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        // 添加难度值
        this.difficulty = 2;
    }
    // 创建创始区块 
    createGenesisBlock() {
        const genesisBlock = new Block(0, "01/10/2017"); 
        genesisBlock.previousHash = '0'; 
        genesisBlock.addNewTransaction('Leo', 'Janice', 520); 
        return genesisBlock;
    }
    // 获取最新区块 
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    // 添加区块到区块链 
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; 
        // 把挖矿的过程应用到添加区块到区块链的过程中:
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    // 验证当前区块链是否有效 
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            // 验证当前区块的 hash 是否正确
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            // 验证当前区块的 previousHash 是否等于上一个区块的 hash 
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true; 
    }
}
// 测试
const testCoin = new Blockchain(); 
console.log(JSON.stringify(testCoin.chain, null, 2));
// [
//     {
//         "index": 0,
//         "timestamp": "01/10/2017",
//         "transactions": [{
//             "sender": "Leo", "recipient": "Janice", "amount": "520"
//         }],
//         "previousHash": "0",
//         "hash": "23975e8996cd37311c7fd0907f9b2511c3bf23cf9c9147cca329dec76d7b544e"
//     }
// ]

// 添加
block1 = new Block('1', '02/10/2017'); 
block1.addNewTransaction('Alice', 'Bob', 500); 
testCoin.addBlock(block1);
console.log(block1)

// Mining block 1
// BLOCK MINED: 005fed00324fcbe1f0ab1703afe94e45a99e197a7df142e669444687f9513e57 
// Block {
//     index: '1',
//     timestamp: '02/10/2017',
//     transactions: [{ 
//          sender: 'Alice', 
//          recipient: 'Bob', 
//          amount: 500 
//      }], 
//      previousHash: '31b15cc32d6772f237dcf298d5b7a2417f298f40ce6d8d5fbe07958141df7a4c', 
//      hash: '005fed00324fcbe1f0ab1703afe94e45a99e197a7df142e669444687f9513e57',
//      nonce: 419
// }
