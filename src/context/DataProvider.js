import { createContext, useState, useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import axios from "axios";


const DataContext = createContext({})


export const DataProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [appLoading, setAppLoading] = useState(true)
    const [allUsers, setAllUsers] = useState([])
    const [allAssets, setAllAssets] = useState([])
    const [allCollections, setAllCollections] = useState([])
    const [allLikes, setAllLikes] = useState([])
    const [allCartItems, setAllCartItems] = useState([])
    const [allMessages, setAllMessages] = useState([])
    const [ethValue, setEthValue] = useState(0)
    const [bnbValue, setBnbValue] = useState(0)
    const [auth, setAuth] = useState({
        user: '',
        pwd: '',
        roles: [],
        accessToken: ''
    })


    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist' || false)))

    const getAllAssets = async () => {
        try {
            const response = await axiosPrivate.get('/assets')
            const { assets } = response.data
            setAllAssets(assets)
        } catch (error) {
            console.log(error.response)
        }

    }
    const getAllCollections = async () => {
        try {
            const response = await axiosPrivate.get('/collections')
            const { collections } = response.data
            setAllCollections(collections)
        } catch (error) {
            console.log(error.response)
        }

    }
    const getAllUsers = async () => {
        try {

            const response = await axiosPrivate.get('/users')
            setAllUsers(response.data.users)
        } catch (error) {
            console.log(error.response)

        }
    }

    useEffect(() => {

        const getAllAssets = async () => {
            try {
                const response = await axiosPrivate.get('/assets')
                const { assets } = response.data
                setAllAssets(assets)
            } catch (error) {
                console.log(error.response)
            }

        }
        const getAllCollections = async () => {
            try {
                const response = await axiosPrivate.get('/collections')
                const { collections } = response.data
                setAllCollections(collections)
            } catch (error) {
                console.log(error.response)
            }

        }
        const getAllUsers = async () => {
            try {

                const response = await axiosPrivate.get('/users')
                setAllUsers(response.data.users)
            } catch (error) {
                console.log(error.response)

            }
        }

        const getAllLikes = async () => {
            try {
                const response = await axiosPrivate.get('/like')
                setAllLikes(response.data)
            } catch (error) {
                console.log(error.response);
            }
        }

        const getAllCartItems = async () => {
            try {
                const response = await axiosPrivate.get('/cart')
                setAllCartItems(response.data)
            } catch (error) {
                console.log(error.response);
            }
        }

        const getAllMessages = async () => {
            try {
                const response = await axiosPrivate.get('/message')

                setAllMessages(response.data)
                // console.log(response.data.cartItems)
                // setAllCartItems(response.data)
            } catch (error) {
                console.log(error.response);
            }
        }

        const getCalls = async () => {
            try {
                setAppLoading(true)
                getAllAssets()
                getAllCollections()
                getAllUsers()
                getAllLikes()
                getAllCartItems()
                getAllMessages()
            } catch (error) {
                console.error(error)
                setAppLoading(false)
            } finally {
                setAppLoading(false)
            }
        }

        getCalls()

        const getEthValue = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                    params: {
                        ids: 'ethereum',
                        vs_currencies: 'usd',
                    },
                })
                setEthValue(response.data?.ethereum?.usd)
            } catch (error) {
                console.log(error.response);
            }
        }
        const getBnbValue = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                    params: {
                        ids: 'binancecoin',
                        vs_currencies: 'usd',
                    },
                })
                setBnbValue(response.data?.binancecoin?.usd)
            } catch (error) {
                console.log(error.response);
            }
        }

        getEthValue()
        getBnbValue()

        const intervalId = setInterval(() => {
            getCalls();
            getBnbValue();
            getEthValue();
        }, 600000);

        const appLoader = () => {
            setAppLoading(true)
        }
        appLoader()

        setTimeout(() => setAppLoading(false), 6000)

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        setTimeout(() => setAppLoading(false), 3000)
    }, [])


    return (
        <DataContext.Provider value={{
            auth,
            setAuth,
            isLoading,
            setIsLoading,
            persist,
            setPersist,
            appLoading,
            setAppLoading,
            allCollections,
            setAllCollections,
            allAssets,
            setAllAssets,
            ethValue,
            bnbValue,
            allUsers,
            setAllUsers,
            allLikes,
            setAllLikes,
            allCartItems,
            setAllCartItems,
            allMessages,
            setAllMessages,
            getAllAssets,
            getAllCollections,
            getAllUsers
        }}>
            {children}
        </DataContext.Provider>
    )

}

export default DataContext