import { ethers, BrowserProvider, Contract } from "ethers";

// Base chain configuration
const BASE_TOKEN_ADDRESS = "0xd54c9692D3D656811Ee8EcA78aeD786d837D32a9"; // This is the Contract address.
const BASE_TREASURY_ADDRESS = "0xd2Ec9380728f85383b7Af3A731F181607BD2d6Ab"; // You want payment to this address.

const ABI = [
    "function transfer(address to, uint256 amount) public returns (bool)",
    "function decimals() view returns (uint8)",
];

export async function payEntryFeeBase() {
    try {
        if (!window.ethereum) {
            throw new Error("MetaMask not installed");
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(BASE_TOKEN_ADDRESS, ABI, signer);

        const decimals = await contract.decimals();
        const amount = ethers.parseUnits("1", decimals);

        const tx = await contract.transfer(BASE_TREASURY_ADDRESS, amount);
        await tx.wait();
        console.log("Entry fee paid successfully on Base chain:", tx);

        return tx.hash;
    } catch (error) {
        console.error("Error paying entry fee on Base chain:", error);
        return false;
    }
}