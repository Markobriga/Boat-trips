import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../components/Loader";
import { getPosts } from "../actions/postAction";
import BlogHomeCard from "../components/blogHomeCard";
import { getNextTrips } from "../actions/tripAction";
import TripCard from "../components/tripCard";
import TripHomeCard from "../components/tripHomeCard";

const Home = () => {

    const dispatch = useDispatch()

    const { loading, posts} = useSelector(state=>state.posts)
    const { loading: loadingTrips, trips } = useSelector(state => state.trips)
    const [ popularIndex, setPopularIndex ] = useState([])

    useEffect(()=>{
        dispatch(getPosts())
        dispatch(getNextTrips([1,200],[1,200],[], new Date(), false))
    },[dispatch])

    useEffect(()=>{
        if(!loadingTrips && trips) {
            let temp=trips.map((trip,index)=> ({
                percentage: trip.numberOfReservations / trip.boat.maxNumberOfReservations,
                index: index
            }))
            findPopularTrips(temp)
        }
    },[trips])

    const findPopularTrips = (temp) => {
        temp.sort((a, b) => a.percentage - b.percentage)
        let result = temp.filter(trip => trip.percentage < 1)
        let indexes = result.map(a => a.index)
        setPopularIndex(indexes.slice(0,3))
    }

    return (
        <div className="flex flex-col">
            <div className="relative">
                <img src={require("../images/makarska.jpg")}></img>
                <div className="absolute  text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-semibold">
                        Boat Trips
                    </div>
                    <div className="sm:text-lg md:text-xl lg:text-2xl">
                        Unforgettable day trips and boat tours from Makarska Riviera
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-screen-xl flex w-full justify-center py-5">
                {!loading && !loadingTrips && 
                    <div>
                        <div className="text-2xl md:text-5xl font-semibold">
                            Makarska Riviera boat trips 
                        </div>
                        <div className="text-md md:text-2xl">
                            the most exciting trips
                        </div>
                        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
                            {trips && trips.map((trip,index) => {
                                if(popularIndex.includes(index)) {
                                    return <TripHomeCard trip={trip} key={trip._id} />
                                }
                                
                            })}
                        </div>
                    </div>
                }
            </div>
            <div className="mx-auto max-w-screen-xl flex w-full justify-center py-5 px-2 pb-10">
                {(loading || loadingTrips) ? <Loader /> :
                    <div >
                        <div className="text-2xl md:text-5xl font-semibold">
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