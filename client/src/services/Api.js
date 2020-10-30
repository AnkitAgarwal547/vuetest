import axios from 'axios'
export default ()=>{
 return axios.create(//why has retrn been used here?                                                
     {
         baseURL:'http://localhost:9000/'
     }
 )

}