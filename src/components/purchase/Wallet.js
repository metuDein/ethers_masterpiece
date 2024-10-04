import { useState } from 'react';
import { ethers } from 'ethers';

const Wallet = () => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [balance, setBalance] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [txHash, setTxHash] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to connect MetaMask wallet
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setCurrentAccount(accounts[0]);
                getBalance(accounts[0]);
            } catch (error) {
                console.error("Error connecting wallet:", error);
                setErrorMessage("Failed to connect wallet");
            }
        } else {
            setErrorMessage("MetaMask is not installed. Please install it to connect your wallet.");
        }
    };

    // Function to get the wallet balance
    const getBalance = async (address) => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(address);
            setBalance(ethers.utils.formatEther(balance)); // Convert balance from Wei to Ether
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    // Function to send ETH from the connected wallet to another address
    const sendTransaction = async () => {
        if (!recipientAddress || !amount) {
            setErrorMessage("Please enter a valid recipient address and amount.");
            return;
        }

        console.log(typeof (amount))

        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner(); // Use MetaMask signer to send transactions

            // Create the transaction
            const tx = {
                to: recipientAddress, // Recipient's address
                value: ethers.utils.parseEther(amount), // Amount to send (in Ether)
            };

            // Send the transaction and wait for it to be mined
            const transaction = await signer.sendTransaction(tx);
            setTxHash(transaction.hash); // Store the transaction hash
        } catch (error) {
            console.error("Transaction failed:", error);
            setErrorMessage("Transaction failed.");
        }
    };

    return (
        <div className="wallet-component">
            <div>
                <h3>Connect Wallet</h3>
                <button
                    onClick={connectWallet}
                    className="bg-blue-500 text-white p-3 rounded-lg"
                >
                    {currentAccount ? `Connected: ${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}` : "Connect Wallet"}
                </button>
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>

            {currentAccount && (
                <div>
                    <h3>Your Balance: {balance} ETH</h3>

                    <div>
                        <h3>Transfer ETH</h3>
                        <input
                            type="text"
                            placeholder="Recipient's address"
                            value={recipientAddress}
                            onChange={(e) => setRecipientAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Amount in ETH"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <button onClick={sendTransaction} className="bg-green-500 text-white p-2 rounded-lg">
                            Send ETH
                        </button>
                        {txHash && (
                            <p className="text-green-500 mt-2">
                                Transaction successful! Hash: {txHash}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;
