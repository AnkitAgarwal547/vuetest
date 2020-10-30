import axios from "axios";
const url = "http://localhost:8000/api/boxtype";

export default class BoxType {
    constructor(boxtype = {}) {
        this.type = boxtype.type || "";
        this.freeshippinglimit = boxtype.freeshippinglimit || null;
        this.predefineditems=boxtype.predefineditems||[];
        
    }

    static get = () => axios.get(url);
    static get2 = (type) => axios.get(`${url}/${type}`);

    static post(boxtype) {
        return axios.post(url, boxtype);
    }

    static put(type, boxtype) {
       return axios.put(`${url}/${type}`, boxtype);
    }

    static delete(type) {
        return (
            confirm("Are you sure you want to delete this boxtype?") &&
            axios.delete(`${url}/${type}`)
        );

    }
    static delete2(type, itemid) {
        return (
            confirm("Are you sure you want to delete this boxtype?") &&
            axios.delete(`${url}/${type}/${itemid}`)
        );

    }
}