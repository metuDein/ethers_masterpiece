import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faInfoCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import useDataContext from "../../hooks/useDataContext";
import { axiosPrivate } from "../../api/axios";





const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/


const EmailProcess = () => {

    const { isLoading, setIsLoading, setAuth, getAllUsers } = useDataContext()

    const userRef = useRef()
    const errRef = useRef()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setpwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatchPwd, setValidMatchPWd] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatchPWd(match)
    }, [pwd, matchPwd])




    const handleRegistration = async (e) => {
        e.preventDefault()

        const v1 = USER_REGEX.test(user)
        const v2 = EMAIL_REGEX.test(email)
        const v3 = PWD_REGEX.test(pwd)
        console.log(v1)
        console.log(v2)
        console.log(v3)

        if (!v1 || !v2 || !v3) return setErrMsg('Invalid Entries.')

        try {
            setIsLoading(true)

            const response = await axiosPrivate.post('/register', JSON.stringify({ user, name, pwd, email }))
            console.log(response.data)
            console.log(response.status)


            setEmail('')
            setUser('')
            setpwd('')
            setMatchPwd('')
            setErrMsg('')
            setName('')
            setSuccess(true)
            getAllUsers()
            setTimeout(() => navigate('/user-authentication-login'), 3000)
        } catch (error) {
            if (error.response?.status === 409) {
                setIsLoading(false)
                setErrMsg('This username is already taken.')
                setTimeout(() => setErrMsg(''), 1500)
            } else {
                setIsLoading(false)
                setErrMsg('Registration failed.')
                setTimeout(() => setErrMsg(''), 1500)
            }
        } finally {
            setIsLoading(false)
            setSuccessMsg('Registration Successful')
            setTimeout(() => setSuccessMsg('Redirecting to Login...'), 900)
            setTimeout(() => setSuccess(false), 2000)
        }
    }


    return (
        <main className="bg-white dark:bg-black/90 flex flex-col items-center min-h-screen">
            <section className="mx-auto flex flex-col md:flex-col items-center max-w-4xl my-12 widescreen:section-min-height tallscreen:section-min-height px-3">
                <img className="w-[80px] h-[80px] rounded-2xl shadow-2xl" src="assets/appmainlogo.png" alt="app main logo" />
                <h1 className="my-5 text-2xl font-bold text-black dark:text-white sm:text-4xl text-center">Sign up for Ethers Masterpiece</h1>
                <p className="text-black dark:text-slate-400 text-center text-[16px] sm:text-[2xl] mb-5">Begin your NFT journey with Ethers Masterpiece...easily create, manage and sell your NFTs.</p>
                <p ref={errRef} className={errMsg ? "bg-red-400 text-red-900 font-bold p-4 text-center mx-auto block rounded-xl max-w-[400px] w-full " : "hidden"} aria-live="assertive">
                    <FontAwesomeIcon icon={faBan} className="mr-[4px]" />{errMsg}</p>
                <p className={success ? "bg-teal-600 text-teal-900 font-bold p-4 text-center mx-auto block rounded-xl max-w-[400px] w-full " : "hidden"} aria-live="assertive">
                    <FontAwesomeIcon icon={faCheck} className="mr-[4px]" />{successMsg}</p>

                <form className="flex flex-col mx-auto bg-transparent max-w-[400px] w-full justify-center items-center" onSubmit={handleRegistration}>

                    <label htmlFor="nameB" className="mb-1 text-xl text-left self-start text-black dark:text-white mt-4 flex items-center">
                        <span> Full name: </span>

                    </label>
                    <input
                        type="text"
                        className="text-left w-full bg-transparent border-solid border-[1px]  border-gray-600  dark:border-gray-500 p-2 rounded-sm text-black dark:text-white  focus:border-[2px] focus:outline-none  text-2xl placeholder:text-[19px]"
                        placeholder="Full name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="username"
                        aria-describedby="uidnote"
                        required
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "text-white block text-[14px] bg-black  p-3 rounded-xl self-start w-full" : "hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '3px' }} />
                        4 - 24 characters. <br />
                        Must begin With a letter. <br />
                        Letters, numbers, hyphens allowed.
                    </p>
                    <label htmlFor="username" className="mb-1 text-xl text-left self-start text-black dark:text-white mt-4 flex items-center">
                        <span> Username: </span>
                        <span className={validName ? "block text-xl ml-1" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                        </span>
                        <span className={validName || !user ? "hidden" : "block text-xl ml-1"}> <FontAwesomeIcon icon={faBan} className="text-red-700" /></span>
                    </label>
                    <input
                        type="text"
                        className="text-left w-full bg-transparent border-solid border-[1px]  border-gray-600  dark:border-gray-500 p-2 rounded-sm text-black dark:text-white  focus:border-[2px] focus:outline-none  text-2xl placeholder:text-[19px]"
                        placeholder="username"
                        id="username"
                        ref={userRef}
                        autoComplete="false"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        name="username"
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        aria-invalid={validName ? 'true' : 'false'}
                        required
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "text-white block text-[14px] bg-black  p-3 rounded-xl self-start w-full" : "hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '3px' }} />
                        4 - 24 characters. <br />
                        Must begin With a letter. <br />
                        Letters, numbers, hyphens allowed.
                    </p>
                    <label htmlFor="email" className="mb-1 text-xl text-left self-start text-black dark:text-white mt-6 flex items-center">
                        <span> Email: </span>
                        <span className={validEmail ? "block text-xl ml-1" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                        </span>
                        <span className={validEmail || !email ? "hidden" : "block text-xl ml-1"}> <FontAwesomeIcon icon={faBan} className="text-red-700" /></span>
                    </label>
                    <input
                        type="text"
                        className="text-left w-full bg-transparent border-solid border-[1px]  border-gray-600  dark:border-gray-500 p-2 rounded-sm text-black dark:text-white  focus:border-[2px] focus:outline-none  text-2xl placeholder:text-[19px]"
                        placeholder="your@example.com"
                        id="email"
                        autoComplete="false"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        aria-invalid={validEmail ? 'true' : 'false'}
                        required
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "text-white block text-[14px] bg-black  p-3 rounded-xl self-start w-full" : "hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '3px' }} />
                        please enter a vaild email e.g <br />
                        example@gmail.com <br />
                        example@hotmail.com <br />
                        example@yahoomail.com <br />
                    </p>
                    <label
                        htmlFor="password"
                        className="mb-1 text-xl text-left self-start text-black dark:text-white mt-6 flex items-center">
                        <span> Password: </span>
                        <span className={validPwd ? "block text-xl ml-1" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                        </span>
                        <span className={validPwd || !pwd ? "hidden" : "block text-xl ml-1"}> <FontAwesomeIcon icon={faBan} className="text-red-700" /></span>
                    </label>
                    <input
                        type="password"
                        className="text-left w-full bg-transparent border-solid border-[1px]  border-gray-600 dark:border-gray-500 p-2 rounded-sm text-black dark:text-white  focus:border-[2px] focus:outline-none text-2xl placeholder:text-[19px] "
                        placeholder="password"
                        id="password"
                        name="password"
                        autoComplete="false"
                        aria-describedby="pwdnote"
                        onChange={(e) => setpwd(e.target.value)}
                        value={pwd}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        aria-invalid={validPwd ? 'true' : 'false'}
                        required
                    />
                    <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "text-white block text-[14px] bg-black  p-3 rounded-xl self-start w-full" : "hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '3px' }} />
                        8 - 24 characters. <br />
                        Must begin With a letter. <br />
                        upper and lower case letter, a number and  a special character allowed :!@#$%.
                    </p>
                    <label
                        htmlFor="confirmPwd"
                        className="mb-1 text-xl text-left self-start text-black dark:text-white mt-6 flex items-center">
                        <span> Confirm Password: </span>
                        <span className={validMatchPwd && pwd ? "block text-xl ml-1" : "hidden"}>
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                        </span>
                        <span className={validMatchPwd || !matchPwd ? "hidden" : "block text-xl ml-1"}> <FontAwesomeIcon icon={faBan} className="text-red-700" /></span>
                    </label>
                    <input
                        type="password"
                        className="text-left w-full bg-transparent border-solid border-[1px]  border-gray-600 dark:border-gray-500 p-2 rounded-sm text-black dark:text-white  focus:border-[2px] focus:outline-none text-2xl placeholder:text-[19px] "
                        placeholder="confirm password"
                        id="confirmPwd"
                        autoComplete="false"
                        aria-describedby="matchnote"
                        aria-invalid={validMatchPwd ? 'true' : 'false'}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        required
                    />
                    <p id="matchnote" className={matchFocus && matchPwd && !validMatchPwd ? "text-white block text-[14px] bg-black  p-3 rounded-xl self-start w-full" : "hidden"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '3px' }} />
                        Passwords do not match.
                    </p>
                    {!isLoading && <button
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        SIGN UP
                    </button>}
                    {isLoading && <article
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </article>}
                </form>
                <p className=
                    "text-black dark:text-white text-[14px] mt-4">
                    By continuing, you agreed to the <Link to={'/term-and-conditions'} className="" style={{ color: 'blueviolet' }}> T&Cs </Link> of Ethers Masterpiece.</p>
                <Link to={'/user-authentication-login'}
                    className=
                    "text-left text-black dark:text-white cursor-pointer hover:underline-offset-1 mt-4">
                    Already have an account with us? <span className="text-blue-600"> Sign In.</span></Link>
            </section>
        </main>
    )
}

export default EmailProcess