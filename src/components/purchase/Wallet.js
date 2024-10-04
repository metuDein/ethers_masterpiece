import { useState } from 'react';
import { ethers } from 'ethers';

const Wallet = () => {
    const [balance, setBalance] = useState('');
    const [senderPrivateKey, setSenderPrivateKey] = useState('');
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [txHash, setTxHash] = useState('');

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

    // Function to send ETH from one address to another
    const sendTransaction = async () => {
        try {
            // Connect to the Ethereum network using the sender's private key
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = new ethers.Wallet(senderPrivateKey, provider);

            // Create the transaction
            const tx = {
                to: recipientAddress, // Recipient's address
                value: ethers.utils.parseEther(amount), // Amount to send (in Ether)
                gasLimit: 21000, // Gas limit for a simple ETH transfer
            };

            // Send the transaction and wait for the transaction to be mined
            const transaction = await signer.sendTransaction(tx);
            setTxHash(transaction.hash); // Store the transaction hash
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        <div className="wallet-component min-h-screen p-[100px]">
            <div>
                <h3>Check Balance</h3>
                <input
                    type="text"
                    placeholder="Enter wallet address"
                    onBlur={(e) => getBalance(e.target.value)}
                />
                <p>Balance: {balance} ETH</p>
            </div>

            <div>
                <h3>Transfer ETH</h3>
                <input
                    type="text"
                    placeholder="Sender's private key"
                    value={senderPrivateKey}
                    onChange={(e) => setSenderPrivateKey(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Recipient's address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Amount to send"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={sendTransaction}>Send ETH</button>
                <p>Transaction Hash: {txHash}</p>
            </div>
        </div>
    );
};

export default Wallet;
