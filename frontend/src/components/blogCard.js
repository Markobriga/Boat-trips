import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
    return (
        <div>
            <Link to={`/blog/${post._id}`} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img className="object-cover w-full rounded-t-lg h-80 md:h-auto md:w-80 md:rounded-none md:rounded-l-lg" src={post.images[0].url}  alt="" />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl text-start font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                    <p className=" text-start mb-3 font-normal text-gray-700 dark:text-gray-400">{post.content.length > 150 ? `${post.content.substring(0,150)}...` : post.content}</p>
                    <div className='flex mt-2'>
                        {post.tags.map((tag, index) =>(
                            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</div>
                        ))}
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default BlogCard;