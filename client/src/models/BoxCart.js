import axios from "axios";
const url = "http://localhost:8000/api/boxcart";

export default class BoxCart {
    constructor(boxcart = {}) {
        this.userid = boxcart.userid || "";
        this.type=boxcart.type||null;
        this.name=boxcart.name||null,
        this.freeshippinglimit = boxcart.freeshippinglimit || null;
        this.totalprice=boxcart.totalprice||"";
        this.items = boxcart.items || [];   
    }

    static get = (userid) => {
        console.log('get boxcart client 22', userid)
        return axios.get(`${url}/${userid}`);}

    static post(boxcart) {
        console.log(' client post boxcart', boxcart );
        return axios.post(url, boxcart);
    }

    static put(boxcart) {
    console.log('put boxcart client',boxcart.userid, boxcart)
       return axios.put(`${url}/${boxcart.userid}`, boxcart);
    }

    static delete(userid) {
        return (
            confirm("Are you sure you want to delete this boxcart?") &&
            axios.delete(`${url}/${userid}`)
        );

    }
}