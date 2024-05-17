import { useNavigate } from 'react-router-dom';
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import before from '../media/before.png'
import after from '../media/after.png'




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
                <button onClick={()=>navigate("/signup")}
                className="text-black lg:text-[1.438rem] leading-relaxed bg-primary border-0 py-2 px-4  focus:outline-none hover:bg-primary-dark rounded text-[1.05rem] lg:w-[8.86rem] lg:h-[3.063rem] flex items-center">
                Try for free
                </button>
                </div>
                </div>
                </div>   
                    <ImgComparisonSlider value={50} className="flex h-[680px] lg:justify-end justify-center w-fill md:mt-20 mt-0 items-center border-primary border-4 rounded-[2rem]">
                    <img slot="first" src={before} className='w-[600px]'/>
                    <img slot="second" src={after} className='w-[600px]'/>
                    </ImgComparisonSlider>
            </div>
        </section>
    )
};

export default Home;