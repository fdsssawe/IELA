import Card from "./Card";
import { useNavigate } from "react-router-dom";

const RenderCards = ({ data, title} : {data : any , title : string }) => {

    const navigate = useNavigate()
    if (data?.length > 0) {
      return (
        data.map((post : any) => {
          return (
          <Card key={post._id} {...post} onClick={()=>navigate(`/post/${post._id}`)}/>
          )
        }
        )
      );
    }
  
    return (
      <h2 className="lg:mt-5 font-semibold text-black md:text-xl uppercase">{title}</h2>
    );
  };

export default RenderCards