import { useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import api from '../http';
import Loader from '../components/Loader';
import FileSaver from 'file-saver'



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

    async function downloadResult(id : string | undefined, result : any | undefined){
        FileSaver.saveAs(result , `download-${id}.jpg`)
    }

    async function downloadOriginal(id : string | undefined, orignal : any | undefined){
        FileSaver.saveAs(orignal , `download-${id}.jpg`)
    }

    return (
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -mx-4 -mb-10 text-center">
      <div className="sm:w-1/2 mb-10 px-4">
        <div className="rounded-lg overflow-hidden border-2 flex justify-center">
          {loading ? <div className='flex items-center justify-center'><Loader /></div> :
            <img src={postInfo.original} className='object-cover object-center h-[400px] w-[400px]'></img>}
        </div>
        <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Original Image</h2>
        <p className="leading-relaxed text-base">Image uploaded by user</p>
        <button className="flex mx-auto mt-6 text-white bg-primary border-0 py-2 px-5 focus:outline-none hover:bg-primary-dark rounded " onClick={() => downloadOriginal(id, postInfo.original)}>Dowload</button>
      </div>
      <div className="sm:w-1/2 mb-10 px-4">
      <div className="rounded-lg overflow-hidden border-2 flex justify-center">
          {loading ? <div className='flex items-center justify-center'><Loader /></div> :
            <img src={postInfo.result} className='object-cover object-center h-[400px] w-[400px]'></img>}
        </div>
        <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Result of the assessment</h2>
        <p className="leading-relaxed text-base">Result of the assessment of image exposure (histigram)</p>
        <button className="flex mx-auto mt-6 text-white bg-primary border-0 py-2 px-5 focus:outline-none hover:bg-primary-dark rounded " onClick={() => downloadResult(id, postInfo.result)}>Download</button>
      </div>
    </div>
  </div>
</section>
    );
};

export default Post;
