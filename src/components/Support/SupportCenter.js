import { useRef, useState } from 'react'
import useDataContext from '../../hooks/useDataContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faBan, faCheck } from '@fortawesome/free-solid-svg-icons'
import { axiosPrivate } from '../../api/axios'



const SupportCenter = () => {
    const { isLoading, setIsLoading, auth, allUsers } = useDataContext()
    const user = allUsers.find(uid => uid?.username === auth?.user)
    const receiver = allUsers.find(uid => uid?.roles?.Admin)
    console.log(receiver);

    const errRef = useRef()

    const [email, setEmail] = useState('' || user?.email)
    const [username, setUsername] = useState('' || user?.username)
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')

    const [success, setSuccess] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const sendMessage = async (e) => {

        e.preventDefault()

        setIsLoading(true)
        try {
            const response = await axiosPrivate.post('/message', JSON.stringify({ sender: user?.username, email, receiver: receiver?.username, subject, description }))
            console.log(response.data)
            alert('✅ message sent.')

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <main className="bg-white dark:bg-black/90 flex flex-col items-center min-h-screen">
            <section className="mx-auto flex flex-col md:flex-col items-center max-w-4xl my-12 widescreen:section-min-height tallscreen:section-min-height px-3">
                <img className="w-[80px] h-[80px] rounded-2xl shadow-2xl" src="assets/appmainlogo.png" alt="app main logo" />
                <h1 className="my-5 text-2xl font-bold text-black dark:text-white sm:text-4xl text-center">Reach Us</h1>
                <p className="text-black dark:text-slate-400 text-center text-[16px] sm:text-[2xl] mb-5"> Make a complaint or reach the support.</p>
                <p ref={errRef} className={errMsg ? "bg-red-400 text-red-900 font-bold p-4 text-center mx-auto block rounded-xl max-w-[400px] w-full " : "hidden"} aria-live="assertive">
                    <FontAwesomeIcon icon={faBan} className="mr-[4px]" />{errMsg}</p>
                <p className={success ? "bg-teal-600 text-teal-900 font-bold p-4 text-center mx-auto block rounded-xl max-w-[400px] w-full " : "hidden"} aria-live="assertive">
                    <FontAwesomeIcon icon={faCheck} className="mr-[4px]" />{successMsg}</p>
                <form className="flex flex-col mx-auto bg-transparent max-w-[500px] w-full justify-center items-center" onSubmit={sendMessage}>

                    <label htmlFor="email" className="mb-1 text-xl text-left self-start text-black dark:text-white">Email: </label>
                    <input
                        type="email"
                        className="text-left w-full bg-transparent border-solid border-[1px]  border-gray-600  dark:border-gray-500 p-2 rounded-sm text-black dark:text-white  focus:border-[2px] focus:outline-none  text-2xl placeholder:text-[19px]"
                        placeholder="Your email"
                        id="email"
                        autoComplete="false"
                        name="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />

                    <label
                        htmlFor="username"
                        className="mb-1 text-xl text-left self-start text-black dark:text-white">
                        Username (Optional): </label>

                    <input
                        type="username"
                        className="text-left w-full bg-transparent border-solid border-[1px]  border-gray-600 dark:border-gray-500 p-2 rounded-sm text-black dark:text-white  focus:border-[2px] focus:outline-none text-2xl placeholder:text-[19px] "
                        placeholder="username"
                        id="username"
                        name="username"
                        autoComplete="false"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <label
                        htmlFor="subject"
                        className="mb-1 text-xl text-left self-start text-black dark:text-white">
                        Subject: </label>

                    <input
                        type="subject"
                        className="text-left w-full bg-transparent border-solid border-[1px]  border-gray-600 dark:border-gray-500 p-2 rounded-sm text-black dark:text-white  focus:border-[2px] focus:outline-none text-2xl placeholder:text-[19px] "
                        placeholder="Subject"
                        id="subject"
                        name="subject"
                        autoComplete="false"
                        required
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
                    />
                    <label htmlFor="description" className="self-start text-black dark:text-white text-xl">Description: </label>

                    <textarea
                        id="description"
                        placeholder="What would like to tell us or briefly describe your compliant."
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        required
                        rows={10}
                        cols={20}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />


                    {!isLoading && <button
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        Submit
                    </button>}
                    {isLoading && <article
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </article>}


                </form>
                <p className=
                    "text-black dark:text-white text-[14px] mt-4">
                    By continuing, you agreed to the <Link to={'/term-and-conditions'} className="" style={{ color: 'blueviolet' }}> T&Cs </Link> of Ethers Masterpiece.
                </p>

            </section>
        </main>
    )
}

export default SupportCenter