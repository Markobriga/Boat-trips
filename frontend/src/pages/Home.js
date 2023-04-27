import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import { getPosts } from "../actions/postAction";
import BlogCard from "../components/blogCard";
import BlogHomeCard from "../components/blogHomeCard";

const Home = () => {

    const dispatch = useDispatch()

    const { loading, posts} = useSelector(state=>state.posts)

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])


    return (
        <div className="flex flex-col">
            <div className="relative">
                <img src={require("../images/makarska.jpg")}></img>
                <div className="absolute  text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl">
                        Boat Trips
                    </div>
                    <div className="sm:text-lg md:text-xl lg:text-2xl">
                        Unforgettable day trips and boat tours from Makarska Riviera
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-screen-xl flex w-full justify-center py-5">
                {loading ? <Loader /> :
                    <div >
                        <div className="text-2xl md:text-5xl">
                            Makarska Riviera boat trips blog 
                        </div>
                        <div className="text-md md:text-2xl">
                            what is new in our blog
                        </div>
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
                            {posts && posts.slice(0,3).map(post => (
                                <BlogHomeCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                    
                }
            </div>

        </div>
    )
}

export default Home;