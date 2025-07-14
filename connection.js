// Base Sepolia Network Configuration
const BASE_SEPOLIA = {
  chainId: "0x14A34", // 84532 in hex
  chainName: "Base Sepolia Testnet",
  nativeCurrency: {
    name: "Base",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"],
}

// Auto-Connect on Refresh
const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            if (accounts.length > 0) {
                setWalletAddress(accounts[0])
                setIsConnected(true)
            }
        } catch (error) {
            console.error("Error checking connection:", error)
        }
    }
}

// Adding Network in wallet
const addLiskSepoliaNetwork = async () => {
    try {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [BASE_SEPOLIA],
        })
        return true
    } catch (error) {
        console.error("Error adding network:", error)
        return false
    }
}

// Switching to Network
const switchToLiskSepolia = async () => {
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: BASE_SEPOLIA.chainId }],
        })
        return true
    } catch (error) {
        if (error.code === 4902) {
            // Network not added, try to add it
            return await addLiskSepoliaNetwork()
        }
        console.error("Error switching network:", error)
        return false
    }
}

// Connect Button Handler
const connectWallet = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask or another Web3 wallet!")
        return
    }

    setIsConnecting(true)

    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
            // Switch to Lisk Sepolia
            const networkSwitched = await switchToLiskSepolia()

            if (networkSwitched) {
                setWalletAddress(accounts[0])
                setIsConnected(true)
            } else {
                alert("Please switch to Lisk Sepolia network to continue")
            }
        }
    } catch (error) {
        console.error("Error connecting wallet:", error)
        alert("Failed to connect wallet. Please try again.")
    } finally {
        setIsConnecting(false)
    }
}

const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
}