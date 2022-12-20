·POST/transactions/new:添加新的交易，格式为JSON。

http://localhost:3000/transactions/new

```json
{
    "sender": "my address",
    "recipient": "someone else's address",
    "amount": "5"
}
```

·GET/mine:将目前的交易打包到新的区块。

·GET/chain:返回当前的区块链。
