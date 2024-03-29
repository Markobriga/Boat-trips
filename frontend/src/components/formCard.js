import React from "react";

const FormCard = ({ children, currentStep}) => {
    return (
        <div className="max-w-screen-xl w-full flex flex-col">
            { currentStep <2 && (
            <ol className="flex items-center justify-center text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                <li className={currentStep > 0 ? "flex  items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-48 after:h-1 after:border-b after:border-gray-600  after:hidden sm:after:inline-block  after:mx-10 dark:after:border-gray-700" : "flex  items-center sm:after:content-[''] after:w-48 after:h-1 after:border-b after:border-gray-400  after:hidden sm:after:inline-block  after:mx-10 dark:after:border-gray-700"}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {currentStep > 0 && <svg aria-hidden="true" className="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
                        Personal <span className="hidden sm:inline-flex sm:ml-2">Info</span>
                    </span>
                </li>
                
                <li className="flex items-center">
                    Checkout
                </li>
            </ol>
            )}
            <div className="w-full">{children}</div>
        </div>
    )
}

export default FormCard