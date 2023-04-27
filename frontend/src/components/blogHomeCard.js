import React from 'react';
import { Link } from 'react-router-dom';

const BlogHomeCard = ({ post }) => {
    return(
        <div className='flex-flex-col text-start px-2'>
            <img className="object-cover w-full h-80 " src={post.images[0].url}  alt="" />
            <h5 className="mt-2 text-2xl text-start font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
            <p className=" text-start font-normal text-gray-700 dark:text-gray-400">{post.content.length > 150 ? `${post.content.substring(0,150)}...` : post.content}</p>
            <div className='flex pt-2'>
                {post.tags.map((tag, index) =>(
                    <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</div>
                ))}
            </div>
            <Link className='text-start font-medium text-primary-700' to={`/blog/${post._id}`}>
                Read more
            </Link>
        </div>
    )
}

export default BlogHomeCard