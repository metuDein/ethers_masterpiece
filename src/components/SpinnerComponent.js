import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const SpinnerComponent = () => {
    return (

        <section className="w-full bg-white dark:bg-slate-900 flex justify-center items-center min-h-screen">
            <FontAwesomeIcon icon={faSpinner} className="text-gray-700 dark:text-gray-300 mx-auto text-5xl" spinPulse />
        </section>


    )
}

export default SpinnerComponent