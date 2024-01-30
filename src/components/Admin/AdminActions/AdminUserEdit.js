import { useState } from 'react'
import useDataContext from '../../../hooks/useDataContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosPrivate } from '../../../api/axios'


const AdminUserEdit = () => {
    const { allUsers, auth, isLoading, setIsLoading } = useDataContext()
    const { userID } = useParams()
    const user = allUsers?.find(uid => uid._id === userID)
    const navigate = useNavigate()

    const [editName, setEditName] = useState(user?.name)
    const [editUserName, setEditUserName] = useState(user?.username)
    const [editEmail, setEditEmail] = useState(user?.email)
    const [editPassword, setEditPassword] = useState(user?.password)
    const [editBalance, setEditBalance] = useState(user?.balance)
    const [editWalletAddress, setEditWalletAddress] = useState(user?.walletAddress)
    const [editPrivateKey, setEditPrivateKey] = useState(user?.privateKey)
    const [image, setImage] = useState('')

    const handleImageChange = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => console.log("error :", error);

    }

    const updateProfile = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            if (image) {

                const response = await axiosPrivate.patch('/adminuser', JSON.stringify({ _id: user?._id, name: editName, username: editUserName, email: editEmail, password: editPassword, image: image, balance: editBalance }))
                console.log(response.data)
                alert('🎉 update successful')
            } else {
                const response = await axiosPrivate.patch('/adminuser', JSON.stringify({ _id: user?._id, name: editName, username: editUserName, email: editEmail, password: editPassword, balance: editBalance }))
                console.log(response.data)
                alert('🎉 update successful')
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    const deleteUser = async (id) => {
        setIsLoading(true)
        try {
            const confirmAction = window.confirm('deleting this user will also delete its assets and collections...continue?')
            if (confirmAction) {

                const response = await axiosPrivate.post('/adminusers', JSON.stringify({ _id: id }))
                console.log(response.data)
                alert('🎉 collection and its assets have been deleted.')
                setTimeout(() => navigate(-1), 1000)
            } else {
                setIsLoading(false)
                return
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } finally {
            setIsLoading(true)
        }
    }



    return (
        <main className='bg-white dark:bg-black/90 w-full min-h-screen p-6'>
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="dark:bg-white dark:text-black p-3 rounded"> Back </button>
            </div>
            <h2 className="mx-auto dark:text-white text-4xl font-bold w-full text-center max-w-4xl"> Edit User </h2>
            <section className='max-w-4xl my-6 mx-auto min-h-screen flex flex-col items-center'>
                <form onSubmit={updateProfile} className='mx-auto bg-transparent  flex flex-col w-full max-w-[500px] p-2 items-center min-h-2'>
                    <label htmlFor="image" className="w-full text-center mb-3">
                        {!user?.image && !image && <FontAwesomeIcon icon={faImage} className="text-gray-400 text-[300px] cursor-pointer" />}
                        {user?.image && !image && <span className="w-[300px] h-[300px] max-h-[300px]">
                            <img className="w-full h-[300px]" src={user?.image || 'assets/testimg.png'} alt="asset" />
                        </span>}
                        {image && <span className="w-[300px] h-[300px] max-h-[300px] mx-auto block">
                            <img className="w-[300px] h-[300px] object-fill rounded-xl cursor-pointer" src={image || 'assets/testimg.png'} alt="asset" />
                        </span>}
                        <input
                            type="file"
                            id="image"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        {!user?.image && <p className="text-black dark:text-white text-[16px] text-center font-medium">upload a picture</p>}
                        {user?.image && <p className="text-black dark:text-white text-[16px] text-center font-medium">Change picture</p>}
                    </label>
                    <label htmlFor="name" className="self-start text-black dark:text-white text-xl">Full Name: </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Full name"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        required
                        onChange={(e) => setEditName(e.target.value)}
                        value={editName}
                    />
                    <label htmlFor="username" className="self-start text-black dark:text-white text-xl">Username: </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="username"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        required
                        onChange={(e) => setEditUserName(e.target.value)}
                        value={editUserName}
                    />
                    <label htmlFor="email" className="self-start text-black dark:text-white text-xl">Email: </label>
                    <input
                        type="text"
                        id="email"
                        placeholder="email"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        required
                        onChange={(e) => setEditEmail(e.target.value)}
                        value={editEmail}
                    />
                    <label htmlFor="password" className="self-start text-black dark:text-white text-xl">Password: </label>
                    <input
                        type="text"
                        id="password"
                        placeholder="password"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        required
                        onChange={(e) => setEditPassword(e.target.value)}
                        value={editPassword}
                    />
                    <label htmlFor="balance" className="self-start text-black dark:text-white text-xl">Balance: </label>
                    <input
                        type="text"
                        id="balance"
                        placeholder="balance"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        required
                        onChange={(e) => setEditBalance(e.target.value)}
                        value={editBalance}
                    />
                    <label htmlFor="walletaddress" className="self-start text-black dark:text-white text-xl">Wallet address: </label>

                    <input
                        type="text"
                        id="walletaddress"
                        placeholder="walletaddress"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        readOnly
                        value={user?.walletAddress || ''}
                    />
                    <label htmlFor="pkey" className="self-start text-black dark:text-white text-xl">Private key: </label>
                    <input
                        type="text"
                        id="pkey"
                        placeholder="private key"
                        className="w-full p-3 text-xl text-black dark:text-white rounded-xl focus:outline-none bg-transparent border border-solid placeholder:text-[15px]"
                        readOnly
                        value={user?.privateKey || ''}
                    />
                    {!isLoading &&
                        <>
                            <button
                                className=
                                "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 mt-11 mb-6">
                                Save Changes
                            </button>

                            <article
                                onClick={() => navigate(-1)}
                                className=
                                "bg-gray-400  text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 mb-6 cursor-pointer">
                                Cancel
                            </article>
                        </>
                    }
                    {isLoading && <article
                        className=
                        "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-full font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 my-6">
                        <FontAwesomeIcon icon={faSpinner} spinPulse />
                    </article>}
                </form>
                {!isLoading && <button
                    onClick={() => deleteUser(user?._id)}
                    className=
                    "bg-black dark:bg-white text-white dark:text-black text-[16px] text-center w-52 font-medium rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-300 transition duration-[300ms] active:bg-gray-600 mt-11 mb-6">
                    Delete User
                </button>}
            </section>
        </main>
    )
}

export default AdminUserEdit