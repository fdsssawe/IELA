import Loader from '../components/Loader.js';
import api from "../http/index.js"
import { useEffect , useState} from 'react';
import {useParams} from 'react-router-dom'
import RenderCards from '../components/RenderCards.js';


const Account = () => {

    interface IUser {
      email : string,
      _id : string
    }

    const {id} = useParams()
    const [isLoading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [user , setUser] = useState<IUser>({email : "" , _id : ""})

    const fetchPosts = async () => {
        setLoading(true);
    
        try {
            const response = await api.get(`/user/${id}`)
          if (response) {
            const result = await response;
            setAllPosts(result.data.posts.reverse());
            setUser(result.data.profileOwner)
          }
        } catch (err) {
          alert(err);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchPosts();
        console.log(allPosts)
    },[]);
    


    return (
        <div className=' flex-col items-center lg:pt-46 md:pt-20  bg-white min-h-screen pb-[150px]'>
        <section className="max-w-7xl mx-auto">
        <div className='flex justify-center mb-6'>
        <svg className='md:max-w-[120px] md:max-h-[120px] max-w-[80px] max-h-[80px] md:mt-0 mt-2' width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#F9A826"/>
        <path d="M48.0625 23.1407C41.1406 23.8755 35.1719 28.9096 33.2031 35.6947C31.2969 42.3078 33.6562 49.859 38.9375 54.002C39.5938 54.5179 40.1406 54.9869 40.1406 55.0338C40.1562 55.0807 39.7812 55.284 39.3438 55.4872C37.8906 56.1438 35.75 57.5196 34.25 58.7391C30.1719 62.0378 27.1562 66.6967 25.8438 71.7308C25.4531 73.2317 25 76.2803 25 77.3903V78H27.4688H29.9375L30.1406 76.1708C30.625 71.4338 32.375 67.5722 35.5469 64.2578C41.2031 58.3326 49.5938 56.4565 57.2969 59.3957C62.8125 61.5063 67.2031 66.1964 69.0469 71.9653C69.5469 73.4974 69.9844 76.0614 70 77.3277V78H72.5H75V77.1714C75 75.952 74.5781 73.2786 74.1406 71.6214C72.3125 64.7581 67.2812 58.614 61.0625 55.6748C60.3906 55.3465 59.8594 55.0651 59.8594 55.0182C59.8594 54.9713 60.2812 54.6273 60.8125 54.2365C62.7969 52.7669 65.0156 49.8746 66.0625 47.4358C70.6562 36.6171 63.5469 24.407 51.9062 23.1407C50.1406 22.9531 49.8594 22.9531 48.0625 23.1407ZM51.8438 28.1279C58.3594 29.191 62.8594 34.7567 62.4531 41.2604C62.1094 46.6697 58.5781 51.0316 53.3281 52.548C51.7188 53.0171 48.4375 53.0483 46.875 52.6262C39.8125 50.672 35.9062 43.4179 38.2031 36.4608C40.0625 30.8326 46.0312 27.1899 51.8438 28.1279Z" fill="#111827"/>
        </svg>
        </div>
          <div>
            <h1 className=" text-black md:text-[32px] text-[25px] flex justify-center">{user?.email}</h1>
            <div>
            {!isLoading ? <div className="mt-10">
                  <div className={`${allPosts.length > 0 ? "lg:columns-4 md:columns-3 columns-2 gap-y-40 px-2 w-full" : "flex w-full justify-center"}`}>
                      <RenderCards data={allPosts} title={"No images assessed yet"}/>
                  </div>
                </div>
                :
                  <div className='w-full h-full flex justify-center mt-20'><Loader></Loader></div>
                }
            </div>
          </div>
    
        </section>
        </div>
      );
};

export default Account;