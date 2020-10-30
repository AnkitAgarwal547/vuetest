<template>
    <section>
        <v-container>
            <v-row justify="center">
                <v-col cols="9">
                    <v-card-title class="display-3 primary--text main-title">
                        <v-col class="text-center pa-0">
                            Our Products
                        </v-col>
                    </v-card-title>
                    <v-card-text class="text-center my-5">
                        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit,
                        Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore
                        Magna Aliqua. Ut Enim Ad Minim Veniam
                    </v-card-text>
                </v-col>
            </v-row>

            <v-row>
                <v-col
                    v-for="product in products"
                    :key="product.id"
                    cols="3"
                    style="position: relative"
                >
                    <v-card tile flat @click="myFunc(product.id)">
                        <div class="icon-holder">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn dark color="primary" icon v-on="on">
                                        <v-icon class="pointer"
                                            >mdi-eye-outline</v-icon
                                        >
                                    </v-btn>
                                </template>

                                <span>quick view</span>
                            </v-tooltip>

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn dark color="primary" icon v-on="on">
                                        <v-icon class="pointer"
                                            >mdi-heart-outline</v-icon
                                        >
                                    </v-btn>
                                </template>

                                <span>make favorite</span>
                            </v-tooltip>

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn dark color="primary" icon v-on="on" v-on:click="addItemToCart(product)">
                                        <v-icon class="pointer"
                                            >mdi-cart-outline</v-icon
                                        >
                                    </v-btn>
                                </template>

                                <span>add to cart</span>
                            </v-tooltip>
                        </div>
                        {{product.imageFiles}}
                        <v-img
                            src="product.imageFiles[0]"
                            height="400"
                            class="pointer"
                            alt="product.title"
                        ></v-img>
                    </v-card>
                     <v-rating
                        v-model="product.rating"
                        color="orange"
                        class="my-2"
                        half-increments
                        readonly
                    ></v-rating> 
                    <div class="pl-2" v-text="product.title"></div>
                    <div class="price">£{{ product.price.toFixed(2) }}</div>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-btn color="primary" large class="mt-5" tile
                    >load more products</v-btn
                >
            </v-row>
        </v-container>
    </section>
</template>

<script>
import img4 from "../../assets/products/4.jpg";
import img5 from "@/assets/products/5.jpg";
import img6 from "@/assets/products/6.jpg";
import img7 from "@/assets/products/7.jpg";
import img8 from "@/assets/products/8.jpg";
import img9 from "@/assets/products/9.jpg";
import img10 from "@/assets/products/10.jpg";
import img11 from "@/assets/products/11.jpg";
import img12 from "@/assets/products/12.jpg";
import img13 from "@/assets/products/13.jpg";
// import img14 from "@/assets/products/14.jpg";
// import img15 from "@/assets/products/15.jpg";
// import img16 from "@/assets/products/16.jpg";
// import img17 from "@/assets/products/17.jpg";
// import img18 from "@/assets/products/18.jpg";
// import img19 from "@/assets/products/19.jpg";
// import img20 from "@/assets/products/20.jpg";
// import img21 from "@/assets/products/21.jpg";

import Item from "../../models/Item";
import BoxCart from "../../models/BoxCart";

export default {
    name: "OurProducts",

    data: () => ({

        products:[],
        items: [],
        item: new Item(),
        userid:'Us202',
        selectedboxcart:new BoxCart(),
        index:0

        
    }),

    methods: {
        myFunc(id) {
            this.$router.push(`/products/${id}`);
        },

        getItems(){
            Item.get()
                .then(res => { this.items = res.data; 
                 this.copyItemsToProducts();})
                .catch(err => console.error(err.response.data));
             
        },

        copyItemsToProducts()
        {
                console.log('items copy', this.items)
                this.items.forEach((element) => {
                    this.products.push({id:element.itemid, title:element.name, price:element.price, rating:element.rating, imageFiles:element.imageFiles[0], images:element.images[0]})
               
            });
            console.log('images', img4, img5, img6, img7, img8, img9, img10, img11, img12, img13);
            console.log('products', this.products);
        },

        addItemToCart(product){
            console.log('ok selected item1', product);
            if(product.id)
            {
                this.index=this.selectedboxcart.items.findIndex(item=>item.itemid===product.id);
                console.log('index', this.index);
                if(this.index<0)
                    {
                        if((this.selectedboxcart.totalprice+product.price)>this.selectedboxcart.freeshippinglimit)
                        {
                            alert('product cant be added. total price exceeding freeshipping limit')
                        }
                        else
                        {
                            this.selectedboxcart.totalprice+=product.price;
                            this.selectedboxcart.items.push({itemid:product.id, name:product.title, price:product.price, quantity:1});
                            console.log('add item to cart after push', this.selectedboxcart.items);
                        }
                    }
                else
                    {
                        if((this.selectedboxcart.totalprice+product.price)>this.selectedboxcart.freeshippinglimit)
                        {
                            alert('product cant be added. total price exceeding freeshipping limit')
                        }
                        else
                        {
                         this.selectedboxcart.items[this.index].quantity+=1;
                         this.selectedboxcart.totalprice+=product.price;
                         console.log('item already exists', 'quantity', this.selectedboxcart.items[this.index].quantity);
                        }
                    }
            }
            console.log('add item to cart', this.selectedboxcart);
            this.saveBoxCart();
    },


        getBoxCart(){     
          console.log('hello get boxcart', this.userid);
          BoxCart.get(this.userid)
              .then(res => {
                    console.log('get box cart client 1',  'res.data', res.data);
                
                    if(res)    
                        {
                             this.selectedboxcart.userid=res.data.userid;
                             this.selectedboxcart.type=res.data.type;
                             this.selectedboxcart.name=res.data.name;
                             this.selectedboxcart.freeshippinglimit=res.data.freeshippinglimit;
                             this.selectedboxcart.totalprice=res.data.totalprice;
                             this.selectedboxcart.items=res.data.items;
                         }
                })
        },


        saveBoxCart() {
            {
                console.log('hello save boxcart', this.selectedboxcart);
                BoxCart.put(this.selectedboxcart)
                    .then(res => {
                    console.log('result', res);
                    })
                    .catch(err => {
                        this.errorMessage = err.response.data;
                        setTimeout(() => (this.errorMessage = ""), 5000);
                    });
            }
        },
    },
    mounted() {
        this.getItems();
        this.getBoxCart();

        console.warn(img4);

    }
};
</script>

<style scoped>
.main-title {
    font-weight: 900;
    word-break: normal;
}

.price {
    padding-left: 8px;
    color: #0e1932;
    font-size: 22px;
    font-weight: bold;
}

.pointer {
    cursor: pointer;
}

.icon-holder {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 5;
}
</style>
