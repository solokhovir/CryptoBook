import { ethers } from "ethers"
import provider from "./provider"

const address = "0xC08e34369F4e7CCDdCC5250049b779Df7F031685"
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_telegram",
                "type": "string"
            }
        ],
        "name": "createContact",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_telegram",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_discord",
                "type": "string"
            }
        ],
        "name": "createContact",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "ownerToContact",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
const ethABI = [
    "function ownerToContact(address) public view returns (address)",
    "function createContact(string, string) public",
    "function createContact(string) public"
]
const contactFactory = new ethers.Contract(address, ethABI, provider)

export default contactFactory