// Configuración del token LMB y el contrato de preventa

export const TOKEN_CONFIG = {
  // Información básica del token
  name: "LORD M",
  symbol: "LMB",
  decimals: 18,

  // Información del contrato
  tokenAddress: "0xA1412331439BD6Ac4Fd8228556E865C597ED9B54", // Dirección del token LMB
  presaleAddress: "0x2637FA7A2335D3709B67f15Fb602deD86336633c", // Dirección del contrato PreSaleV3 (pendiente de completar)
  usdtAddress: "0x55d398326f99059fF775485246999027B3197955", // Dirección del contrato USDT (pendiente de completar)

  // Información de la red (asumiendo BSC)
  network: {
    name: "BSC", // Binance Smart Chain
    chainId: 56, // ID de la cadena BSC
    rpcUrl: "https://bsc-dataseed.binance.org/", // URL del RPC de BSC
    blockExplorerUrl: "https://bscscan.com/", // URL del explorador de bloques BSC
  },

  // Wallets asignadas
  wallets: {
    presale: "0x3Bd2D68541F359BdFDd5F172A6d4BA60096e8814",
    rewards: "0x6CD5c09Df5939D30609A7EF2e6a1abd5A55203Be",
    marketing: "0x74CdB3235b6a5397c5952E7D5aAc9A0F5E43Eb69",
  },

  // Redes sociales
  socialMedia: {
    instagram: "https://instagram.com/lordmtoken",
    facebook: "https://facebook.com/lordmtoken",
    youtube: "https://youtube.com/lordmtoken",
    twitter: "https://twitter.com/lordmtoken",
  },

  // Parámetros de la preventa (extraídos del contrato)
  presale: {
    minContribution: 10, // 10 USDT
    maxContribution: 200, // 200 USDT
    marketingFee: 20, // 20%
    totalStages: 8,
    // Total de tokens en preventa: 405 millones (según el contrato)
    totalTokens: 405_000_000,
    stages: [
      { price: 0.2, maxTokens: 22_500_000 }, // Etapa 1
      { price: 0.3, maxTokens: 30_000_000 }, // Etapa 2
      { price: 0.4, maxTokens: 37_500_000 }, // Etapa 3
      { price: 0.5, maxTokens: 45_000_000 }, // Etapa 4
      { price: 0.7, maxTokens: 52_500_000 }, // Etapa 5
      { price: 0.9, maxTokens: 60_000_000 }, // Etapa 6
      { price: 1.1, maxTokens: 67_500_000 }, // Etapa 7
      { price: 1.4, maxTokens: 90_000_000 }, // Etapa 8
    ],
  },

  // ABI oficial del contrato PreSaleV3
  presaleABI: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_usdtTokenAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_preSaleWallet",
          type: "address",
        },
        {
          internalType: "address",
          name: "_marketReleaseWallet",
          type: "address",
        },
        {
          internalType: "address",
          name: "_rewardsWallet",
          type: "address",
        },
        {
          internalType: "address",
          name: "_marketingWallet",
          type: "address",
        },
        {
          internalType: "address",
          name: "_ceoWallet",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "MarketingFundsTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint8",
          name: "newStage",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newPrice",
          type: "uint256",
        },
      ],
      name: "StageAdvanced",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "cost",
          type: "uint256",
        },
      ],
      name: "TokensPurchased",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "usdtAmount",
          type: "uint256",
        },
      ],
      name: "buyTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "ceoWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "contributions",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "currentStage",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "marketReleaseWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "marketingWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ownerAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ownerWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "preSaleEndTime",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "preSaleWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "rewardsWallet",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "stages",
      outputs: [
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "maxTokens",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "soldTokens",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalTokensSold",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "usdtToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],

  // ABI estándar para tokens ERC20 (USDT y LMB)
  erc20ABI: [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ],
}

