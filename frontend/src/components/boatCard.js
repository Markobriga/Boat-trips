import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const BoatCard = ({boat}) => {
    return (
        <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-start">
            <a href="#">
                <img className="rounded-t-lg object-cover aspect-video" src={boat.images[0].url} alt="" />
            </a>
            <div className="p-5">
                <a>
                    <h5 className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{boat.name}</h5>
                </a>
                <div className='flex'>
                    <ReactStars 
                        count={5}
                        value={boat.ratings}
                        edit={false}
                    />
                    <div className='text-xs pt-1'>({boat.numOfReviews})</div>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{boat.description.length > 250 ? `${boat.description.substring(0,250)}...` : boat.description}</p>

                <Link to={`/boat/${boat._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
            </div>
        </div>
    )
}

export default BoatCard