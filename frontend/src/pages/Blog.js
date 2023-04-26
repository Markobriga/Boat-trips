import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/postAction';
import Loader from '../components/Loader';
import BlogCard from '../components/blogCard';

const Blog = () => {

    const dispatch = useDispatch()

    const { loading, posts} = useSelector(state=>state.posts)

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])

    return (
        <div className="mx-auto max-w-screen-xl py-10 flex flex-col justify-center items-center">
            {loading ? <Loader /> : (
                <div>
                    {posts && posts.map(post => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Blog