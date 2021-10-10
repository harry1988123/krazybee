import  axios  from "axios";
const getData = (ApiEndPoint) => {
    console.log(ApiEndPoint);
    axios.get(ApiEndPoint) 
    .then((data)=>{ 
        return data;
    })
} 

export default getData;