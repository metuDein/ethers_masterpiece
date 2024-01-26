import { useState, useRef, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import useDataContext from "../../hooks/useDataContext";
import { axiosPrivate } from "../../api/axios";


const EmailLogin = () => {

    const { setAuth, setIsLoading, isLoading, persist, setPersist } = useDataContext()
    const userRef = useRef()
    const errRef = useRef()

    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from.pathname || '/';

    const [user, setUser] = useState('')
    const [pwd, setpwd] = useState('')

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await axiosPrivate.post('/auth', JSON.stringify({ user, pwd }))
            const { data } = response
            console.log(JSON.stringify(data));
            const roles = data?.roles
            const accessToken = data?.accessToken
            await setAuth({ user, pwd, roles, accessToken })
            setUser('')
            setpwd('')
            setIsLoading(false)
            setSuccess(true)
            setTimeout(() => navigate(from, { replace: true }), 3000)
        } catch (error) {
            if (error.response?.status === 403) {
                setIsLoading(false)
                setErrMsg('Incorrect password.')
                setTimeout(() => setErrMsg(''), 1500)
            } else if (error.response.status === 401) {
                setIsLoading(false)
                setErrMsg('username and password missing.')
                setTimeout(() => setErrMsg(''), 1500)
            } else if (error.response.status === 404) {
                setIsLoading(false)
                setErrMsg('username is not registered.')
                setTimeout(() => setErrMsg(''), 1500)
            } else {
                setIsLoading(false)
                setErrMsg('Login failed.')
                setTimeout(() => setErrMsg(''), 1500)
            }
        } finally {
            setIsLoading(false)
            setSuccessMsg('Login Successful')
            setTimeout(() => setSuccessMsg('Redirecting...'), 900)
            setTimeout(() => setSuccess(false), 2000)

        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev)
    }

    useEffect(() => {
        localStorage.setItem('persist', persist)
    }, [persist])

    return (
        <main className="bg-white dark:bg-black/90 flex flex-col items-center min-h-screen">
            <section className="mx-auto flex flex-col md:flex-col items-center max-w-4xl my-12 widescreen:section-min-height tallscreen:section-min-height px-3">
                <img className="w-[80px] h-[80px] rounded-2xl shadow-2xl" src="assets/appmainlogo.png" alt="app main logo" />
                <h1 className="my-5 text-2xl font-bold text-black dark:text-white sm:text-4xl text-center">Login to Ethers Masterpiece</h1>
                <p className="text-black dark:text-slate-400 text-center text-[16px] sm:text-[2xl] mb-5">Please login to continue.</p>
                <p ref={errRef} className={errMsg ? "bg-red-400 text-red-900 font-bold p-4 text-center mx-auto block rounded-xl max-w-[400px] w-full " : "hidden"} aria-live="assertive">
                    <FontAwesomeIcon icon={faBan} className="mr-[4px]" />{errMsg}</p>
                <p className={success ? "bg-teal-600 text-teal-900 font-bold p-4 text-center mx-auto block rounded-xl max-w-[400px] w-full " : "hidden"} aria-live="assertive">
                    <FontAwesomeIcon icon={faCheck} className="mr-[4px]" />{successMsg}</p>
                <form className="flex flex-col mx-auto bg-transparent max-w-[400px] w-full justify-center items-center" onSubmit={handleLogin}>

                    <label htmlFor="username" className="mb-1 text-xl text-left self-start text-black dark:text-white">Username: </label>
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
                        required
                    />

                    <label
                        htmlFor="password"
                        className="mb-1 text-xl text-left self-start text-black dark:text-white">
                        Password: </label>

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
                        required
                    />


                    {!isLoading && <button
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        SIGN IN
                    </button>}
                    {isLoading && <article
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </article>}
                    <div className="self-start">
                        <input
                            type="checkbox"
                            id="persist"
                            name="persist"
                            onChange={togglePersist}
                            checked={persist}
                        />
                        <label htmlFor="persist" className="ml-3 dark:text-white text-black text-xl">
                            Remember Me?
                        </label>
                    </div>

                </form>
                <p className=
                    "text-black dark:text-white text-[14px] mt-4">
                    By continuing, you agreed to the <Link to={'/term-and-conditions'} className="" style={{ color: 'blueviolet' }}> T&Cs </Link> of Ethers Masterpiece.
                </p>
                <Link to={'/user-authentication-register'}
                    className=
                    "text-left text-black dark:text-white cursor-pointer hover:underline-offset-1 mt-4">
                    Don't have an account with us? <span className="text-blue-600"> Sign Up.</span></Link>
            </section>
        </main>
    )
}

export default EmailLogin