import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function TrustWalletConnection() {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        async function init() {
            // Check if the user has Trust Wallet installed
            if (window.ethereum && window.ethereum.isTrust) {
                try {
                    // Request access to the user's Ethereum account
                    await window.ethereum.enable();
                    // Create an ethers provider using Trust Wallet's provider
                    const trustProvider = new ethers.providers.Web3Provider(window.ethereum);
                    setProvider(trustProvider);

                    // Get the current account
                    const signer = trustProvider.getSigner();
                    const address = await signer.getAddress();
                    setAccount(address);

                    // Listen for account changes
                    window.ethereum.on('accountsChanged', ([newAccount]) => {
                        setAccount(newAccount);
                    });
                } catch (error) {
                    console.error('Error connecting to Trust Wallet:', error);
                }
            } else {
                console.warn('Trust Wallet is not installed or not detected.');
            }
        }

        init();
    }, []);

    return (
        <section className='min-h-screen w-full'>
            <h1>Trust Wallet Connection</h1>
            {account ? (
                <p>Connected with account: {account}</p>
            ) : (
                <p>Connect with Trust Wallet to view your account.</p>
            )}
        </section>
    );
}

export default TrustWalletConnection;
