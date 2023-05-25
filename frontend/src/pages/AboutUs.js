import React from "react"
import {SocialIcon} from 'react-social-icons';

const AboutUs = () => {

    return (
        <div className=" mx-auto max-w-screen-xl flex flex-col md:flex-row w-full py-10 text-left">
            <div className="md:w-3/5 flex flex-col bg-white p-5 rounded-md md:mr-12">
                <div className=" font-medium text-3xl pb-5">
                    About Us
                </div>
                <div className="text-lg">
                    Boat Trips is a site founded by University students, whose idea was to improve and the way our guests navigate through their ideal vacation. We make booking your boat and other trips easy. Our goal is to modernize the way you navigate our beautiful Adriatic coast and Islands and see all the things they offer. Our site includes daily boat trips and fish picnics to our majestic islands. If privacy and exclusivity is what you desire our site offers exclusive speedboat tours with the destination suited to your liking. Our proffessional team wil make sure that your tour is the best it can be, and our aim is for you to make your best memories and have a story that you will remember.
                </div>
                <div className="font-medium text-2xl py-5">
                    About Trips
                </div>
                <div className="">
                    <img className="sm:w-1/3 float-left ml-0 m-2 object-cover aspect-square" src={require("../images/aboutus1.jpg")}></img>
                    <p className="text-lg lg:pl-2">Welcome to our website, where we specialize in providing unforgettable boat trips for adventure seekers. Our passion for the sea has led us to create an experience like no other, where we take you on a journey through some of the most beautiful and picturesque places on the Makarska Riviera.</p>
                </div>
                <div className="font-medium text-2xl py-5">
                    Homemade fresh food
                </div>
                <div className="">
                    <img className="sm:w-1/3 float-right mr-0 m-2 object-cover aspect-square" src={require("../images/aboutus2.jpg")}></img>
                    <div className="text-lg text-justify lg:pr-2">Our boats offer 3 different meals that cater to every need. For fish lovers and those who want to eat like a local, we offer Croatian fish that is prepared a traditional way with a side of salad. Our meat option usually consists of grilled chicken breast with a side of salad. There is also a vegan option which offers a selection of grilled vegetables.</div>
                </div>
            </div>
            <div className="md:w-2/5 pt-10 md:pt-0">
                <div className="flex flex-col items-center bg-white p-5 rounded-md mb-10">
                    <div className="font-medium text-3xl pb-3">Boat Trips</div>
                    <div className="pb-3">Follow us on social networks</div>
                    <div className='flex '>
                        <div className='pr-3'><SocialIcon style={{height:30, width:30}} network="facebook" fgColor="#ffffff"/></div>
                        <div className='pr-3'><SocialIcon style={{height:30, width:30}} network="instagram" fgColor="#ffffff"/></div>
                        <div className=''><SocialIcon style={{height:30, width:30}} network="tiktok" fgColor="#ffffff"/></div>
                    </div>
                </div>
                <div className="flex flex-col bg-white p-5 rounded-md">
                    <div className="font-medium text-xl pb-3">CONTACT</div>
                    <div className="text-left font-medium">Mobile number</div>
                    <div className="text-left pb-5">+385 91 000 0000</div>
                    <div className="text-left font-medium">Mail</div>
                    <div className="text-left">boattrips@mail.com</div>
                </div>
                
            </div>
        </div>
    )
}

export default AboutUs