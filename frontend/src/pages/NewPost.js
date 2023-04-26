import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, newPost } from '../actions/postAction';
import { NEW_POST_RESET } from '../constants/postConstants';

const NewPost = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(state=>state.auth)

    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([])

    const { error, success } = useSelector(state => state.newPost);

    useEffect(()=>{
        if (error) {
            console.log(error)
            dispatch(clearErrors())
        }

        if (success) {
            dispatch({ type: NEW_POST_RESET })
        }
    },[dispatch, error, success])

    const handleChange = (index, e) => {
        e.preventDefault()
        setTags(existingTags => {
            return [
                ...existingTags.slice(0,index),
                e.target.value,
                ...existingTags.slice(index+1)
            ]
        })
    }

    const handleDelete = (index,e) => {
        e.preventDefault()
        setTags(existingTags => {
            return [
                ...existingTags.slice(0,index),
                ...existingTags.slice(index+1)
            ]
        })
    }

    const handleAdd = (e) => {
        e.preventDefault()
        setTags([...tags, ''])
    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        //setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.set('title', title)
        formData.set('content', content)
        formData.set('author', user.name)
        formData.set('tags', tags)

        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(newPost(formData))
    }

    return (
        <div className="mx-auto max-w-screen-xl flex w-full">
            <Sidebar />
            <div className='w-full'>
                <div className="text-start py-3 px-3 font-medium text-xl">
                    New Post
                </div>
                <form className="space-y-2 mb-5 px-3 md:space-y-4" action="#">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Title</label>
                        <input type="title" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={title} onChange={(e)=>setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Content</label>
                        <textarea type="content" name="content" id="content" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-48 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={content} onChange={(e)=>setContent(e.target.value)}/>
                    </div>
                    <div className="flex flex-col items-start">
                        <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start">Tags</label>
                        {tags.map((tag, index)=> 
                            <div key={index} className="flex items-baseline">
                                <input type="tags" name="tags" id="tags" className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={ tag || ''} onChange={(e)=>handleChange(index, e)}/>
                                <button onClick={(e)=>handleDelete(index,e)} className="text-red-500">
                                    Delete
                                </button>
                            </div>
                        )}
                        <button onClick={handleAdd} className="px-2.5">Add new</button>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start" htmlFor="file_input">Upload images</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" multiple onChange={onChange}/>
                        <div className="flex mr-1">
                            {images.map(img => (
                                <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52"/>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleSubmit} type="submit" className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add post</button>
                </form>
            </div>
        </div>
    )
}
export default NewPost