import { useNavigate } from 'react-router-dom';


const Card = ({ _id, original, createdAt } : { _id:string , original: string, createdAt: string}) => {
    

    const navigate = useNavigate()
    
    return(
        <div className="rounded-xl group relative h-fit mb-3" >
            <img
            loading='lazy'
            onClick={()=>navigate(`/post/${_id}`)}
            className="w-full h-auto object-cover rounded-xl"
            src={original}
            />
            <div className="lg:group-hover:flex justify-center max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
            <p className="text-white text-sm overflow-y-auto prompt">{createdAt}</p>
            </div>
        </div>
)
};

export default Card;
