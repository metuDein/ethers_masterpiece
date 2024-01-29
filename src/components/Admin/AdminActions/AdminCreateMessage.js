import { Fragment, useState, } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import useDataContext from '../../../hooks/useDataContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { axiosPrivate } from '../../../api/axios'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const AdminCreateMessage = () => {

    const { allUsers, isLoading, setIsLoading, } = useDataContext()
    const [receiver, setReceiver] = useState('')
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')

    const sendMessage = async (e) => {

        e.preventDefault()

        setIsLoading(true)
        try {
            const response = await axiosPrivate.post('/message', JSON.stringify({ sender: 'Ethers Masterpiece Admin', email: 'admin@ethersmasterpiece.com', receiver: receiver, subject, description }))
            console.log(response.data)
            alert('✅ message sent.')

        } catch (error) {
            console.log(error)
            setIsLoading(false)
            return alert('message not sent.')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6 relative'>
            <h2 className="mx-auto dark:text-white text-4xl font-bold w-full text-center max-w-4xl">Reply / send a message to a user </h2>
            <section className="mx-auto flex flex-col md:flex-col items-center max-w-4xl my-12 widescreen:section-min-height tallscreen:section-min-height px-3">

                <form className="flex flex-col mx-auto bg-transparent max-w-[500px] w-full justify-center items-center" onSubmit={sendMessage}>



                    <label
                        htmlFor="username"
                        className="mb-1 text-xl text-left self-start text-black dark:text-white">
                        Username (Optional): </label>

                    <Menu as="div" className="relative inline-block text-left dark:bg-black self-start w-full mt-3">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-[15px] font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Select a default collection
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 z-10 mt-2 font-medium origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full">
                                <div className="py-1">

                                    {
                                        allUsers?.length
                                            ? (allUsers.map((item, i) => (
                                                <Menu.Item key={i}>
                                                    {({ active }) => (
                                                        <article
                                                            onClick={() => setReceiver(item?.username)}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {item?.username}
                                                        </article>
                                                    )}
                                                </Menu.Item>
                                            )))
                                            : (<h2 className='text-3xl font-bold dark:text-white'> No collections yet. </h2>)
                                    }


                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
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

export default AdminCreateMessage