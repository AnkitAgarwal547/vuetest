import axios from "axios";
const url="http://localhost:8000";
export default class Category {
    constructor(category = {}) {
        this._id = category._id || null;
        this.name = category.name || "";
    }

    static get = (type) => axios.get(url+'/'+type);
    static post = ({ name, parent }) => {
        console.log(parent);
        if (parent) return axios.post(url, { name, parent });
        else return axios.post(url, { name });
    };

    static put = ({ _id, name, parent }) => {
        if (parent) return axios.put(`${url}/${_id}`, { name, parent });
        else return axios.put(`${url}/${_id}`, { name });
    };

    static delete = _id => axios.delete(`${url}/${_id}`);
}
