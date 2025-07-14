# Base Sepolia Token Payment Flow

This project demonstrates how to deploy an ERC20 token contract on the Base Sepolia Testnet, connect a web application to the network, and implement a payment flow using JavaScript and ethers.js. Below are detailed instructions and explanations for each component.

---

## 1. Deploying `contract.sol` on Base Sepolia Testnet

### Step 1: Open Remix IDE
- Go to [Remix IDE](https://remix.ethereum.org/).

### Step 2: Add the Contract
- Create a new file named `contract.sol` in Remix.
- Copy and paste the following code:

```solidity
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Permit {
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}
}
```

### Step 3: Compile the Contract
- In Remix, go to the **Solidity Compiler** tab.
- Select the correct compiler version (0.8.27 or compatible).
- Click **Compile contract.sol**.

### Step 4: Connect to Base Sepolia Testnet
- In the **Deploy & Run Transactions** tab, select **Injected Provider - MetaMask**.
- Make sure your MetaMask is set to the **Base Sepolia Testnet**. If not, add the network with the following details:
  - **Network Name:** Base Sepolia Testnet
  - **RPC URL:** https://sepolia.base.org
  - **Chain ID:** 84532
  - **Currency Symbol:** ETH
  - **Block Explorer:** https://sepolia.basescan.org

### Step 5: Deploy the Contract
- Select the `MyToken` contract.
- Click **Deploy**.
- Confirm the transaction in MetaMask.
- After deployment, copy the contract address for use in your app.

---

## 2. Understanding `connection.js`

This file manages the connection between your web application and the user's wallet (e.g., MetaMask) on the Base Sepolia Testnet.

### Key Features:
- **Network Configuration:** Defines the Base Sepolia network parameters.
- **Auto-Connect:** Checks if the user is already connected and updates the UI accordingly.
- **Add/Switch Network:** Adds Base Sepolia to MetaMask and switches the user to it if needed.
- **Connect/Disconnect Wallet:** Handles wallet connection and disconnection, updating the app state.

### Usage:
- Use the `connectWallet` function to prompt the user to connect their wallet and switch to the correct network.
- Use the `disconnectWallet` function to disconnect the wallet.
- The file expects you to implement `setWalletAddress`, `setIsConnected`, and `setIsConnecting` in your app's state management (e.g., React state or similar).

---

## 3. Understanding `payment-flow.js`

This file implements the payment flow using ethers.js, allowing users to pay an entry fee (in your ERC20 token) to a specified treasury address.

### Key Features:
- **Contract Interaction:** Uses ethers.js to interact with the deployed ERC20 contract.
- **Payment Function:** The `payEntryFeeBase` function transfers 1 token from the user's wallet to the treasury address.
- **Error Handling:** Handles errors such as MetaMask not being installed or transaction failures.

### Usage:
1. **Install ethers.js** in your project if not already installed:
   ```bash
   npm install ethers
   ```
2. **Import and Call the Function:**
   ```javascript
   import { payEntryFeeBase } from './payment-flow.js';

   async function handlePayment() {
     const txHash = await payEntryFeeBase();
     if (txHash) {
       // Payment successful, proceed with your logic
       alert('Payment successful!');
       // e.g., unlock content, update user status, etc.
     } else {
       alert('Payment failed.');
     }
   }
   ```
3. **After Successful Payment:**
   - You can perform any post-payment actions, such as granting access, updating the UI, or storing the transaction hash for reference.

---

## 4. Integrating Into Your App

- **Connect Wallet:** Use the functions from `connection.js` to connect the user's wallet and ensure they are on the Base Sepolia Testnet.
- **Trigger Payment:** Call `payEntryFeeBase()` when you want the user to make a payment.
- **Handle Success:** On successful payment, execute your desired logic (e.g., unlock features, show confirmation, etc.).

---

## 5. Notes
- Ensure the user has enough testnet tokens (MTK and ETH for gas) on Base Sepolia.
- You can get testnet ETH from Base Sepolia faucets.
- The contract address and treasury address in `payment-flow.js` should match your deployed contract and intended recipient.

---

## 6. Resources
- [Remix IDE](https://remix.ethereum.org/)
- [Base Sepolia Faucet](https://sepoliafaucet.com/)
- [Base Sepolia Block Explorer](https://sepolia.basescan.org/)
- [Ethers.js Documentation](https://docs.ethers.org/)