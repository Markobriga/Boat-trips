import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetails } from '../actions/postAction';
import { useParams } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import Loader from '../components/Loader';
import { format } from 'date-fns';

const PostDetails = () => {

    const dispatch = useDispatch()
    const { loading, post } = useSelector(state=>state.postDetails)
    const { id } = useParams();

    useEffect(()=>{
        dispatch(getPostDetails(id))
    },[dispatch])


    return (
        <div className=' flex flex-col justify-center'>
            {loading ? 
            <div className="items-center">
                <Loader />
            </div> :
            <> 
            <div className='w-full py-5 bg-gray-100'>
                <div className='flex justify-between items-baseline  max-w-screen-xl mx-auto px-2'>
                    <div className='text-4xl '>
                        {post.title}
                    </div>
                    <div>
                        {post.createdAt && format(new Date(post.createdAt), 'dd.MM.yyyy')}
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto w-full">
                <div className='py-2'>
                    { post.images &&
                        <ImageSlider images={post.images}/>
                    }
                </div>
                <div className='px-2 text-start w-full text-lg'>
                    {post.content}
                </div>
            </div>
            </>}
        </div>
    )
}

export default PostDetails