import axios from "axios";
const url ="http://localhost:8000/api/item";
export default class Item {
    constructor(item = {}) {
        this.itemid = item.itemid || null;
        this.name = item.name || "";
        this.price = item.price || "";
        this.quantity = item.quantity || "";
        this.rating=item.rating||0;
        this.images=item.images||[],
        this.imageFiles=item.imageFiles||[]
    }

    static get = () => {
           console.log('items client get');
          return axios.get(url)
    };
    
    static get2 = (itemid) => {axios.get(`${url}/${itemid}`)};

    static post(item) {
        return axios.post(url, item);
    }

    static put(item) {
        let id=item.itemid;
        return axios.put(`${url}/${id}`, item);
    }

    static delete(itemid) {
        return (
            confirm("Are you sure you want to delete this item?") &&
            axios.delete(`${url}/${itemid}`)
        );

    }
}