import { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import api from '../http';
import Loader from '../components/Loader';




const Post = () => {
    
    const {id} = useParams()
    const [postInfo , setPostInfo] = useState({
        _id : '',
        author : '',
        original : '',
        result : ''
    })
    const [loading , setLoading] = useState(false)

    const fetchPostInfo = async () => {
        setLoading(true)
        try { 
            const response = await api.get(`/post/${id}`)
            setPostInfo(response.data)
        }
        catch (e) {
            console.log(e)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchPostInfo() 
    },[id])


    return (
        <section className="text-white bg-gray-900 dark:[color-scheme:dark] min-h-screen pb-[150px]">
            <div className='flex w-full justify-center lg:pt-24 md:pt-12'>
                <div className='lg:grid lg:h-[32rem] lg:w-[62.438rem] lg:rounded-[2.5rem] mb-4 lg:grid-rows-1 lg:grid-cols-2 flex flex-col '>
                    {loading ? <div className='flex items-center justify-center'><Loader /></div> :
                        <div className='flex justify-center lg:justify-start mt-12 md:mt-0 mb-2 md:mb-0'><img src={postInfo.original} className='lg:rounded-l-[2.5rem] md:rounded-l-[1.5rem] lg:h-[31.75rem] md:h-[35rem]'></img></div>}
                    <div className='lg:border-green-500 lg:border-2 lg:rounded-r-[2.5rem] lg:h-[31.75rem]'>
                        {loading ? <div className='flex items-center justify-center h-full'><Loader /></div> :
                            <div className='flex flex-col lg:h-full h-fit '>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <p className='flex justify-center text-white text-xl title-font font-medium mb-4 mt-6'>More from the author</p>
        </section>
    );
};

export default Post;
