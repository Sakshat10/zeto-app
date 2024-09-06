export const zetoTokenAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedInnerCall",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "IdentityNotRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
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
    inputs: [
      {
        internalType: "uint256",
        name: "utxo",
        type: "uint256",
      },
    ],
    name: "UTXOAlreadyOwned",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "utxo",
        type: "uint256",
      },
    ],
    name: "UTXOAlreadySpent",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "utxo",
        type: "uint256",
      },
    ],
    name: "UTXODuplicate",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "utxo",
        type: "uint256",
      },
    ],
    name: "UTXONotMinted",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
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
        internalType: "uint256[]",
        name: "outputs",
        type: "uint256[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "submitter",
        type: "address",
      },
    ],
    name: "UTXOMint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "inputs",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "outputs",
        type: "uint256[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "submitter",
        type: "address",
      },
    ],
    name: "UTXOTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "inputs",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "outputs",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "encryptionNonce",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "encryptedValues",
        type: "uint256[]",
      },
      {
        indexed: true,
        internalType: "address",
        name: "submitter",
        type: "address",
      },
    ],
    name: "UTXOTransferWithEncryptedValues",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Groth16Verifier_CheckHashesValue",
        name: "_depositVerifier",
        type: "address",
      },
      {
        internalType: "contract Groth16Verifier_CheckInputsOutputsValue",
        name: "_withdrawVerifier",
        type: "address",
      },
    ],
    name: "__ZetoFungibleWithdraw_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Groth16Verifier_CheckHashesValue",
        name: "_depositVerifier",
        type: "address",
      },
    ],
    name: "__ZetoFungible_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "utxo",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[2]",
            name: "pA",
            type: "uint256[2]",
          },
          {
            internalType: "uint256[2][2]",
            name: "pB",
            type: "uint256[2][2]",
          },
          {
            internalType: "uint256[2]",
            name: "pC",
            type: "uint256[2]",
          },
        ],
        internalType: "struct Commonlib.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "_deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "inputs",
        type: "uint256[2]",
      },
      {
        internalType: "uint256",
        name: "output",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[2]",
            name: "pA",
            type: "uint256[2]",
          },
          {
            internalType: "uint256[2][2]",
            name: "pB",
            type: "uint256[2][2]",
          },
          {
            internalType: "uint256[2]",
            name: "pC",
            type: "uint256[2]",
          },
        ],
        internalType: "struct Commonlib.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "_withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "utxo",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[2]",
            name: "pA",
            type: "uint256[2]",
          },
          {
            internalType: "uint256[2][2]",
            name: "pB",
            type: "uint256[2][2]",
          },
          {
            internalType: "uint256[2]",
            name: "pC",
            type: "uint256[2]",
          },
        ],
        internalType: "struct Commonlib.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
      {
        internalType: "contract Groth16Verifier_CheckHashesValue",
        name: "_depositVerifier",
        type: "address",
      },
      {
        internalType: "contract Groth16Verifier_CheckInputsOutputsValue",
        name: "_withdrawVerifier",
        type: "address",
      },
      {
        internalType: "contract Groth16Verifier_Anon",
        name: "_verifier",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256[2]",
            name: "pA",
            type: "uint256[2]",
          },
          {
            internalType: "uint256[2][2]",
            name: "pB",
            type: "uint256[2][2]",
          },
          {
            internalType: "uint256[2]",
            name: "pC",
            type: "uint256[2]",
          },
        ],
        internalType: "struct Commonlib.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "lockProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "utxos",
        type: "uint256[]",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_erc20",
        type: "address",
      },
    ],
    name: "setERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "txo",
        type: "uint256",
      },
    ],
    name: "spent",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "inputs",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2]",
        name: "outputs",
        type: "uint256[2]",
      },
      {
        components: [
          {
            internalType: "uint256[2]",
            name: "pA",
            type: "uint256[2]",
          },
          {
            internalType: "uint256[2][2]",
            name: "pB",
            type: "uint256[2][2]",
          },
          {
            internalType: "uint256[2]",
            name: "pC",
            type: "uint256[2]",
          },
        ],
        internalType: "struct Commonlib.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "inputs",
        type: "uint256[2]",
      },
      {
        internalType: "uint256",
        name: "output",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256[2]",
            name: "pA",
            type: "uint256[2]",
          },
          {
            internalType: "uint256[2][2]",
            name: "pB",
            type: "uint256[2][2]",
          },
          {
            internalType: "uint256[2]",
            name: "pC",
            type: "uint256[2]",
          },
        ],
        internalType: "struct Commonlib.Proof",
        name: "proof",
        type: "tuple",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
