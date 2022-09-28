const blockChain = {
  chain: [
    {
      index: 0,
      nonce: 100,
      previousHash: "00",
      hash: "GENISISBLOCK",
      timeStamp: 1661720618785,
      pendingTransactions: [],
    },
    {
      index: 1,
      nonce: 198483,
      previousHash: "GENISISBLOCK",
      hash: "00003f2f1419bb5bab920dad9aeb38ed26ff56e7834640e8dd8e4baa59d60926",
      timeStamp: 1661720641208,
      pendingTransactions: [
        {
          amount: 12,
          senderAddress: "77SGDYSDG7S6GDS",
          receiverAddress: "87SD7GS8HDSYD",
          id: "edcfc840271411edbb8215346ac82316",
        },
        {
          amount: 12,
          senderAddress: "77SGDYSDG7S6GDS",
          receiverAddress: "87SD7GS8HDSYD",
          id: "ee0927c0271411edbb8215346ac82316",
        },
        {
          amount: 12,
          senderAddress: "77SGDYSDG7S6GDS",
          receiverAddress: "87SD7GS8HDSYD",
          id: "eec23e90271411edbb8215346ac82316",
        },
      ],
    },
    {
      index: 2,
      nonce: 114820,
      previousHash:
        "00003f2f1419bb5bab920dad9aeb38ed26ff56e7834640e8dd8e4baa59d60926",
      hash: "0000c143166e158a3f20dc74d8484b1f3fd187c8047edc0bf440048b916fef81",
      timeStamp: 1661720642674,
      pendingTransactions: [
        {
          amount: 10,
          senderAddress: "REWARD",
          receiverAddress: "e37c3270271411edbb8215346ac82316",
          id: "f0de40c0271411edbb8215346ac82316",
        },
      ],
    },
    {
      index: 3,
      nonce: 246591,
      previousHash:
        "0000c143166e158a3f20dc74d8484b1f3fd187c8047edc0bf440048b916fef81",
      hash: "00003d67810e0736ca2dc3ed132d4675c6f1ad78dd95450a528bf5874af136e0",
      timeStamp: 1661720644520,
      pendingTransactions: [
        {
          amount: 10,
          senderAddress: "REWARD",
          receiverAddress: "e37c3270271411edbb8215346ac82316",
          id: "f1bc44b0271411edbb8215346ac82316",
        },
      ],
    },
    {
      index: 4,
      nonce: 44431,
      previousHash:
        "00003d67810e0736ca2dc3ed132d4675c6f1ad78dd95450a528bf5874af136e0",
      hash: "0000a48c434d0c3b5728ee71d86e0aee6e5ea1824f953c0b68546420983221a6",
      timeStamp: 1661720645119,
      pendingTransactions: [
        {
          amount: 10,
          senderAddress: "REWARD",
          receiverAddress: "e37c3270271411edbb8215346ac82316",
          id: "f2d79fc0271411edbb8215346ac82316",
        },
      ],
    },
    {
      index: 5,
      nonce: 19238,
      previousHash:
        "0000a48c434d0c3b5728ee71d86e0aee6e5ea1824f953c0b68546420983221a6",
      hash: "00005d3b3d05bd85b3b8d6d59d9e3f5cc639f472b3541a7bca255d6b3b4fae1c",
      timeStamp: 1661720645927,
      pendingTransactions: [
        {
          amount: 10,
          senderAddress: "REWARD",
          receiverAddress: "e37c3270271411edbb8215346ac82316",
          id: "f3313170271411edbb8215346ac82316",
        },
      ],
    },
    {
      index: 6,
      nonce: 120870,
      previousHash:
        "00005d3b3d05bd85b3b8d6d59d9e3f5cc639f472b3541a7bca255d6b3b4fae1c",
      hash: "000099104b60c60687d3e9627b7af5c7d606b68df0f3b62f6b3b996477057e33",
      timeStamp: 1661720650878,
      pendingTransactions: [
        {
          amount: 10,
          senderAddress: "REWARD",
          receiverAddress: "e37c3270271411edbb8215346ac82316",
          id: "f3aca300271411edbb8215346ac82316",
        },
        {
          amount: 12,
          senderAddress: "77SGDYSDG7S6GDS",
          receiverAddress: "87SD7GS8HDSYD",
          id: "f4d82ab0271411edbb8215346ac82316",
        },
      ],
    },
    {
      index: 7,
      nonce: 91680,
      previousHash:
        "000099104b60c60687d3e9627b7af5c7d606b68df0f3b62f6b3b996477057e33",
      hash: "00007a42aa2e7c7866d472cb5dc8d5712c5cfbf9d3b65f6d527871e956a92b74",
      timeStamp: 1661720654299,
      pendingTransactions: [
        {
          amount: 10,
          senderAddress: "REWARD",
          receiverAddress: "e37c3270271411edbb8215346ac82316",
          id: "f6a1ee30271411edbb8215346ac82316",
        },
      ],
    },
  ],
  pendingTransactions: [
    {
      amount: 10,
      senderAddress: "REWARD",
      receiverAddress: "e37db910271411ed9069cb9688a83f7d",
      id: "f8a9f330271411ed9069cb9688a83f7d",
    },
  ],
  currentNodeURL: "http://localhost:3001",
  networkNodes: [
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005",
    "http://localhost:3006",
  ],
};

module.exports = { blockChain };
