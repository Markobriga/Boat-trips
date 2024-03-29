import React ,{useState} from 'react';
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userAction';
import DropdownHeader from '../components/dropdownHeader';


const Header = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const dispatch = useDispatch();

    const {user, loading} = useSelector(state=>state.auth);

    const logoutHandler = () => {
        setMobileMenuOpen(false)
        dispatch(logout());
        
    }

    return (
        <header>
            <nav className="bg-gray-700 border-gray-200 px-4 lg:px-6 py-6 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="#" className="flex items-center">
                        <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">Boat Trips</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        {user ? (
                            <div className='flex items-center'>
                                <DropdownHeader user={user} />
                                <Link to="/" onClick={logoutHandler} className="hidden sm:flex text-gray-500 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Logout</Link>
                            </div>
                        ) : !loading && (
                            <div>
                                <Link to="/login" className="text-white dark:text-white  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 hover:text-gray-400 ">Log in</Link>
                                <Link to="/register" className="text-gray-500 bg-white hover:bg-gray-300 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Sign up</Link>
                            </div>
                        )}
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg lg:hidden hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false" onClick={() => setMobileMenuOpen(true)}>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        
                        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                            <div className="fixed inset-0 z-10" />
                            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                </a>
                                <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-white"
                                onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />        
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                <Link
                                    to="/"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-700 "
                                    >
                                    Home
                                    </Link>
                                    <Link
                                    to="trips"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-700 "
                                    >
                                    Trips
                                    </Link>
                                    <Link
                                    to="/boats"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-700 "
                                    >
                                    Boats
                                    </Link>
                                    <Link
                                    to="/blog"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-700 "
                                    >
                                    Blog
                                    </Link>
                                    <Link
                                    to="aboutus"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-700 "
                                    >
                                    About us
                                    </Link> 
                                </div>
                                <div className="py-6">
                                    {user ? (<Link
                                    to="/"
                                    onClick={logoutHandler}
                                    className="-mx-3 block sm:hidden rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-700 "
                                    >
                                    Logout
                                    </Link>) : !loading && (
                                    <div>
                                        <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-700 "
                                        >
                                        Log in
                                        </Link>
                                        <Link
                                        to="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-gray-700 "
                                        >
                                        Sign up
                                        </Link>
                                    </div>
                                    )}
                                </div>
                                </div>
                            </div>
                            </Dialog.Panel>
                        </Dialog>

                    </div>

                    

                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 text-lg text-white">
                            <li>
                                <Link to="/" className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Home</Link>
                            </li>
                            <li>
                                <Link to="/trips" className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Trips</Link>
                            </li>
                            <li>
                                <Link to="/boats" className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Boats</Link>
                            </li>
                            <li>
                                <Link to="/blog" className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Blog</Link>
                            </li>
                            <li>
                                <Link to="/aboutus" className="block py-2 pr-4 pl-3  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-400 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">About us</Link>
                            </li> 
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;