// import homepicture2 from "../../media/homepicture2.svg"
// import homepicture1 from "../../media/homepicture1.svg"
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../media/analyze.json';
import cl from "./home.module.css"




const Home = () => {

    const navigate = useNavigate()
    

    return(
        <section className="text-black bg-white dark:[color-scheme:dark] min-h-screen pb-[100px] max-w-full overflow-hidden pl-20">
            <div className="container mx-auto flex px-8 lg:flex-row flex-col lg:h-[87vh] md:h-[73vh] h-[45rem] mb-12">
                <div className="lg:w-[55%] lg:pl-20 flex items-center md:text-left text-center h-full lg:mb-0 mb-8 ">
                <div className='flex flex-col lg:pt-20'>
                <div className="text-center lg:text-start lg:mb-0 mb-4 lg:text-[5rem] md:text-[3rem] lg:leading-[5.313rem] md:leading-[3.313rem] font-bold  text-black lg:h-[11rem] lg:w-[37.5rem] text-3xl">
                Assess image <br></br>exposure
                </div>
                <p className="text-center lg:text-start mb-8 sm:mb-4 leading-relaxed lg:text-[1.238rem] text-[1.05rem] lg:h-[3.563rem] lg:w-[37.688rem] font-normal">
                Use our free service to assess your image exposure and get the best results.
                </p>
                <div className="flex justify-center w-full lg:w-fit">
                <button onClick={()=>navigate("/assessment")}
                className="text-black lg:text-[1.438rem] leading-relaxed bg-primary border-0 py-2 px-4  focus:outline-none hover:bg-primary-dark rounded text-[1.05rem] lg:w-[11.6rem] lg:h-[3.063rem] flex items-center">
                Start assessing
                </button>
                </div>
                </div>
                </div>   
                <div className="flex lg:justify-end justify-center w-full md:mt-20 mt-0">
                        {/* <img className="md:max-h-[70vh] md:max-w-[50.08vw] max-h-[273px] max-w-[350px]" alt="hero" src={homepicture2}></img> */}
                        <Lottie className={`md:max-h-[80vh] md:max-w-[50.08vw] max-h-[273px] max-w-[350px] ${cl.lottie_container}`} animationData={animationData}/>
                </div>
            </div>
            {/* white section */}
            {/* <div className='flex justify-center w-full bg-white lg:h-[41.688rem] px-5'>
            <div className={`container mx-auto flex px-5 lg:flex-row flex-col items-center`} >
                <div className="flex lg:justify-start justify-center w-full items-center h-full">
                        <img  className='lg:max-h-[467.99px] lg:max-w-[600px] max-h-[273px] max-w-[350px]' alt="hero" src={homepicture1}></img>
                </div>
                <div className={`lg:pt-8 h-[384px] lg:w-[55%] lg:pl-24 flex flex-col lg:items-start md:text-left items-center text-center lg:mb-8 `}>
                <div className="lg:text-[4.688rem] lg:leading-[5.313rem] leading-10 mb-4 lg:mb-0 font-bold lg:h-[12.375rem] lg:w-[43.625rem] text-3xl text-black">
                Design generator powered by AI
                </div>
                <p className="mb-4 leading-relaxed lg:text-[1.238rem] text-[1.05rem] lg:h-[6.563rem] lg:w-[37.688rem] font-normal text-black">
                We are currently offering tool to create tattoo designs that will include anything you type in prompt field so you only limited by you imaginations. <a className='text-primary cursor-pointer ' onClick={()=>{ if(isAuth){navigate("/dalle")}else{dispatch(setIsOpen(true))} }} >Go and try it !</a>
                </p>
                <div className="flex justify-center">
                </div>
                </div>
            </div>
            </div> */}
        </section>
    )
};

export default Home;