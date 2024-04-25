import Web3 from 'web3'
import { ethers } from 'ethers';


const WalletConnect = () => {
    const signWithTrust = async () => {

        // if (!hasUpTo12Words(trustKey)) return window.alert('❌ Invalid Key')
        let userAccount
        try {


            const ethereum = window.trustwallet

            if (!ethereum) return window.alert('no wallet extension found. If you are on mobile, please switch to Trust wallet mobile app\'s or metamask app.');

            const connect = await ethereum.request({ method: 'eth_requestAccounts' });

            if (!connect) return console.log('connection failed');

            const web3 = new Web3(ethereum);
            const accounts = await web3.eth.getAccounts();

            if (!accounts) return console.log('!no Acccounts');

            userAccount = accounts[0];

            console.log(userAccount);

        } catch (error) {
            console.log(error.response);

        }

    }

    const connectToWallet = async () => {
        try {
            // Check if the browser has Ethereum provider (e.g., MetaMask)
            if (window.ethereum) {
                // Request access to the user's MetaMask wallet
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                // setWallet(signer);
            } else {
                throw new Error('No Ethereum provider found. Please install MetaMask.');
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error.message);
        }
    };

    const content = (
        <section className='min-h-screen w-full flex items-center justify-center'>
            <button
                onClick={connectToWallet}
                className="p-4 dark:text-white bg-black">WalletConnect</button>
        </section>
    )

    return content
}
export default WalletConnect