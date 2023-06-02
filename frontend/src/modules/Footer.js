import React  from 'react';
import { HomeIcon, EnvelopeIcon, PhoneIcon, DevicePhoneMobileIcon} from '@heroicons/react/24/outline'
import {SocialIcon} from 'react-social-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-700 px-4 lg:px-6 py-6 text-white">
            <div className="mx-auto max-w-screen-xl flex flex-wrap justify-between items-center">
                <div className="flex md:justify-between flex-col lg:flex-row ">
                    <div className='flex-1'>
                        <div className="mb-6 md:mb-0 flex-1 text-start">
                            <a href="#" className="flex items-center">
                                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Boat Trips</span>
                            </a>
                            <div className='pt-5 pr-10'>Book your boat trip from Makarska Riviera to most popular islands with the best value for money and price guarantee.</div>
                        </div>
                    </div>
                    <div className="flex-1 flex lg:justify-center">
                        <div className="text-start">
                            <div className="text-2xl font-semibold pt-8 lg:pt-0">Address</div>
                            <div className='flex pt-5'>
                                <HomeIcon className='h-6 w-6'/>
                                <div className='pl-2'>Obala kralja Tomislava, Makarska</div>
                            </div>
                            <div className='flex pt-2'>
                                <PhoneIcon className='h-6 w-6'/>
                                <div className='pl-2'>+385 91 000 0000</div>
                            </div>
                            <div className='flex pt-2'>
                                <EnvelopeIcon className='h-6 w-6'/>
                                <div className='pl-2'>boattrips@mail.com</div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='flex-1 flex lg:justify-end'> 
                        <div className='text-start'>
                            <div className="text-2xl font-semibold pt-8 lg:pt-0">Follow us</div>
                            <div className='flex'>
                                <div className='pt-5 pr-3'><SocialIcon network="facebook" fgColor="#ffffff"/></div>
                                <div className='pt-5 pr-3'><SocialIcon network="instagram" fgColor="#ffffff"/></div>
                                <div className='pt-5'><SocialIcon network="tiktok" fgColor="#ffffff"/></div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;