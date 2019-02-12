// 从node.js的crypto-js库中导入SHA256函数
const SHA256 = require('crypto-js/sha256');

// 定义当前日期
var dt = new Date();
var timestamp = dt.toString();

/**
 * 构造区块对象
 */
class Block {

    /**
     * 区块对象默认构造函数
     * @param  index        [区块索引值]
     * @param  timestamp    [时间戳]
     * @param  data         [区块交易数据]
     * @param  previousHash [之前区块的哈希]
     */
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    /**
     * 计算区块哈希
     * @return  [返回区块的哈希值]
     */
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    /**
     * 挖矿
     * @param  difficulty [挖矿的难度值]
     */
    mineBlock(difficulty) {
      while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
        this.nonce++;
        this.hash = this.calculateHash();
      }
      console.log("Block mined: " + this.hash);
    }
}

/**
 * 构造区块链对象
 */
class Blockchain{

    /**
     * 区块链对象默认构造函数
     */
    constructor() {
        this.chain = [this.createGenesis()];
         this.difficulty = 4;
    }

    /**
     * 创建创世区块
     * @return [返回创世区块]
     */
    createGenesis() {
        return new Block(0, timestamp, "Genesis block", "0");
    }

    /**
     * 获取最新区块
     * @return [返回最新的区块]
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * 增加新区块
     * @param  newBlock [新区块]
     */
    addBlock(newBlock){
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.mineBlock(this.difficulty);
      this.chain.push(newBlock);
    }

    /**
     * 检查区块链的有效性
     * @return [true代表区块没有被篡改，false代表区块被篡改]
     */
    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

//创建用例进行区块链测试
let testChain = new Blockchain();

console.log("Mining block...");
testChain.addBlock(new Block(1, timestamp, "This is block 1"));
console.log("Mining block...");
testChain.addBlock(new Block(2, timestamp, "This is block 2"));

console.log(JSON.stringify(testChain, null, 4));
//检查区块链数据是否被篡改
console.log("Is blockchain valid?" + testChain.checkValid().toString());
