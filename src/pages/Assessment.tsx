import { useEffect, useState } from 'react';
import preview from "../media/preview.svg"
import { useSelector } from 'react-redux';
import api from "../http/index.js"
import Loader from '../components/Loader.js';


const Assessment = () => {


    const [form, setForm] = useState({
        base64: '',
    });
    
    const user = useSelector((state : any) => state.prodAuth.user);

    
    useEffect(() => {
    setForm(prevState => ({
        ...prevState,
        author: "663e3e89ac365c5e327c89f9"
        }));
    if (user.id) {
        setForm(prevState => ({
        ...prevState,
        author: user.id,
        }));
    }
    }, [user]);
    
    const [loading , setLoading] = useState(false)


    const handleSubmit = async (e : any) => {
        e.preventDefault()
        if(form.base64){
            setLoading(true);
            try{  
                const response = await api.post('/createHistogram', form , {
                     headers: {
                    'Content-Type': 'application/json'
                    }
                    })
                console.log(response.data)
                setForm({base64 : response.data.result})
            }catch(e){
                console.log(e)
            }finally{
                setLoading(false)
            }
        }
        else {
            alert("Please enter a prompt and generate an image")
        }
    }

    const reader = new FileReader()


    return (
        <div>
            <section className="text-gray-400 body-font overflow-hidden pb-[200px] lg:pb-0">
                <div className="container pt-24 mx-auto min-h-screen">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap md:justify-start justify-center">
                    <div className="relative  border-4 border-primary text-sm rounded-lg focus:ring-primary-dark focus:border-primary-dark lg:w-[500px] lg:h-[500px] h-[320px] w-[320px] flex justify-center items-center">
                        { form.base64 ? (
                        <img
                            src={form.base64}
                            alt="preview"
                            className="lg:w-full lg:h-full h-[250px] w-[250px] object-contain rounded-[4px]"
                        />
                        ) : (
                        <img
                            src={preview}   
                            alt="preview"
                            className="lg:w-9/12 lg:h-9/12 h-[250px] w-[250px] object-contain opacity-70 rounded-[4px]"
                        />
                        )}
                        {loading && (
                        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-[4px]">
                            <Loader/>
                        </div>
                        )}
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 justify-center items-center flex">
                        <h1 className="text-black text-3xl title-font font-medium mb-1">Upload your image</h1>
                        <div className="flex mb-4">
                        </div>
                        <form className=" max-w-3xl" onSubmit={handleSubmit}>
                        <div className="flex justify-center lg:justify-start">
                        <label className="flex text-black bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-dark rounded ml-5">
                            Upload
                        <input
                            type="file"
                            id="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    reader.onloadend = () => {
                                        if (reader.result) {
                                            const base64String = btoa(reader.result.toString());
                                            setForm({ ...form, base64: `data:image/jpeg;base64,${base64String}` });
                                        }
                                    };

                                    reader.readAsBinaryString(e.target.files[0]);
                                }
                            }}
                            required
                        />
                        </label>
                        <button 
                            type="submit"
                            className="flex text-black bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-dark rounded ml-5"
                        >
                            {loading ? 'Assessing...' : 'Assess'}
                        </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Assessment;