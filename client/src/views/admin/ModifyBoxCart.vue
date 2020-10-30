<template>

<!-- <v-dialog v-model="dialog2" max-width="50%" persistent> -->
<v-container max-width="50%" color="pink">
<v-card>
    <v-card-title>Modify Box Cart</v-card-title>
    <v-row align="center" class="mx-0" dense>
        <v-col>  <v-card-text><b>Box Type:</b>{{selectedtype}}</v-card-text></v-col>
        <v-col>  <v-card-text><b>Box Name: </b>{{selectedname}}</v-card-text></v-col>
        <v-col>  <v-card-text><b>Free Shipping Limit:</b> {{freeshippinglimit}}</v-card-text></v-col>
        <v-col>  <v-card-text><b>Total Price:</b> {{totalprice}}</v-card-text></v-col>
     </v-row>
  <v-toolbar flat></v-toolbar>
        <v-data-table
            dense
            :headers="headers"
            :items="selectedboxitems"
            :items-per-page="5"
            class="border-top">
                           
            <template v-slot:item.select ="{item }"> 
                      <v-tooltip bottom>
                        <template v-slot:activator="{on}">
                        <v-icon
                            class="mr-2"
                            color="yellow darken-3"
                            v-on="on"
                            @click="item.quantity=changeitemqty(1, item.quantity, item)"
                            >mdi-arrow-up-bold
                        </v-icon>
                    </template>
                    <span>Increase</span>
                </v-tooltip>

                <v-tooltip bottom>
                        <template v-slot:activator="{on}">
                        <v-icon
                            class="mr-2"
                            color="yellow darken-3"
                            v-on="on"
                            @click="item.quantity=changeitemqty(2, item.quantity, item)"
                            >mdi-arrow-down-bold
                        </v-icon>
                    </template>
                    <span>Decrease</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon color="red" v-on="on" @click="deleteItem(item)"
                            >mdi-delete-outline</v-icon
                        >
                    </template>
                    <span>Delete</span>
                </v-tooltip>
            </template>
        </v-data-table>
        <v-btn @click="saveBoxCart">Save Box</v-btn>
          <v-btn @click="addItemToCart">Add Item</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
           
</v-card>

<v-dialog v-model="dialog" max-width="50%" persistent>
<v-card>
    <v-card-title>Select Item</v-card-title>
     <v-data-table dense
            v-model="selecteditem"
            :headers="headersitems" 
            :items="items"
            :items-per-page="5"
            :single-select = true
            item-key = "itemid"
            show-select
            class="border-top"
        >
      </v-data-table>
    <v-card-actions>
           <v-btn text @click="dialog=false">Cancel
           </v-btn>
           <v-btn 
               :disabled="disabled" 
               type="submit"
                color="success" 
                width="90"
                @click="OKSelectItem"
           >OK  
           </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import BoxCart from "../../models/BoxCart";
import Item from "../../models/Item";

export default {
    name: "ModifyBoxCart",
    data() {
        return {
            headers:
             [
                //{ text: "Itemid", value: "itemid" },
                { text: "Name", value: "name" },
                { text: "Price", value: "price" },
                { text: "Quantity", value: "quantity" },
                { text: "", value: "Select" }
            ],
            
            userid:'Us202',   
            boxes: [],
            valid:false,
            disabled:false,
            dialog:false,
            box: new BoxCart(),
            selectedboxcart:new BoxCart(),
            totalprice:0,
            freeshippinglimit:0,
            selectedboxitems:[],
            selectedtype:'',
            selectedname:'',
            headersitems: [
               // { text: "Itemid", value: "itemid" },
                { text: "Name", value: "name" },
                { text: "Price", value: "price" },
                { text: "Quantity", value: "quantity" },
               // { text: "", value: "select" }
            ],
            items:[],
            item:new Item(),
            selecteditem:[],
            quantitySuccess: false,
            quantityRules: [
                v => {
                    if (v + "") {
                        this.quantitySuccess = true;
                        return true;
                    } else {
                        return "Quantity is required";
                    }
                },
            ],
            errorMessage: "",
            snackbar: false, 
            index:-1
        };
    },

    methods: {
          getBox() {  
          console.log('hello get boxcart', this.userid);
          BoxCart.get(this.userid)
              .then(res => {
                    console.log('get box cart client 1',  'res.data', res);
                
                if(res)
              
             {
            this.selectedboxitems=res.data.items;
            this.selectedboxcart.userid=res.data.userid;
            this.selectedboxcart.type=res.data.type;
            this.selectedboxcart.name=res.data.name;
            this.selectedboxcart.freeshippinglimit=res.data.freeshippinglimit;
            this.selectedboxcart.totalprice=res.data.totalprice;
            this.selectedboxitems.items=this.selectedboxitems;

              console.log('get box cart client',this.selectedboxitems, ' selectedboxcart', this.selectedboxcart);
              this.selectedtype=this.selectedboxcart.type;
              this.selectedname=this.selectedboxcart.name;
              this.freeshippinglimit=this.selectedboxcart.freeshippinglimit;
              this.totalprice=this.selectedboxcart.totalprice;
             }
                })

          },

          changeitemqty(mode, quantity, item){
                        if(mode==1)
                         {
                         quantity+=1;
                         
                         this.calculateTotalPrice();
                         console.log('tprice, fsl', this.totalprice, this.freeshippinglimit)
                         if(this.totalprice>this.freeshippinglimit)
                            {console.log('tprice, fsl inside', this.totalprice, this.freeshippinglimit)
                             quantity-=1;
                             alert('Total price cannot be greater than free shipping limit');
                            }
                         }
                        else
                            {   
                                quantity-=1;
                                if(quantity==0)
                                {
                                    this.deleteItem(item);
                                }
                                this.calculateTotalPrice();
                            }                    
                        return quantity;
          }, 

       deleteItem(item) {
           console.log('hi-delete-item', item)
           this.index=this.selectedboxitems.indexOf(item);
           console.log('index', this.index);
           console.log('index before',this.index,  this.selectedboxitems);
           this.selectedboxitems.splice(this.index,1);
           console.log('index after', this.selectedboxitems);
           this.calculateTotalPrice();
        },

      calculateTotalPrice()
      {
        let that=this;
        this.totalprice=0;
        console.log('selecedboxitems', this.selectedboxitems);
        this.selectedboxitems.forEach(item => 
        {              
                this.$axios.get(`http://localhost:8000/api/item/${item.itemid}`).then(res=>{
                console.log('response = ' + res);
                console.log('result', res);
                that.totalprice+=res.data.price*item.quantity;
                console.log(res.data.price, item.quantity, that.totalprice);
            })
        });
            
         },

        saveBoxCart() {
            {
                console.log('hello save boxcart', this.selectedboxitems, this.totalprice);
                this.selectedboxcart.items=this.selectedboxitems;
                this.selectedboxcart.totalprice=this.totalprice;
                console.log('save boxcart selectedbox', this.selectedboxcart);
                BoxCart.put(this.selectedboxcart)
                    .then(res => {
                    console.log('result', res);
                        this.dialog = false;
                        this.disabled = false;
                    })
                    .catch(err => {
                        this.errorMessage = err.response.data;
                        setTimeout(() => (this.errorMessage = ""), 5000);
                        this.disabled = false;
                    });
            }
        },

         remove(item) {
           console.log('hi-remove',this.selectedtype, item.itemid)
            BoxCart.delete(this.selectedtype, item.itemid)
                .then(res => {
                    let index = this.items.findIndex(
                        p => p.itemid === res.data.itemid
                    );
                    this.items.splice(index, 1);
                })
                .catch(err => {
                    this.errorMessage = err.response.data;
                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                        this.errorMessage = "";
                    }, 5000);
                });
        },

    cancel(){
           if(!alert('Are you sure you want to exit?'))
              this.dialog=true;
    },

    getItems() {

          this.$axios
          .get("http://localhost:8000/api/item")
          .then(res=>{this.items=res.data;
          console.log('get items', this.items);})
          .catch(err => console.error(err.response.data))
        },

    addItemToCart(){

        this.getItems();
        this.dialog=true;
        this.disabled=false;
        },

    OKSelectItem(){
        console.log('ok selected item1', this.selecteditem);
        if(this.selecteditem[0].itemid!=null)
        {
            this.item.itemid=this.selecteditem[0].itemid;
            this.item.quantity=this.selecteditem[0].quantity;
            this.item.name=this.selecteditem[0].name;
            this.item.price=this.selecteditem[0].price;
            console.log('item qty and itemid', this.item.quantity, this.item.itemid);
            this.index=this.selectedboxitems.findIndex(item=>item.itemid===this.item.itemid);
                       console.log('ok selected item2', this.selecteditem, 'index', this.index);
            if(this.index<0)
            {
                this.selectedboxitems.push({itemid:this.item.itemid, name:this.item.name, price:this.item.price, quantity:1});
                   console.log('add item to cart after push', this.selectedboxitems);
                this.calculateTotalPrice();
                if(this.totalprice>this.freeshippinglimit)
                {
                  this.deleteItem(this.item);  
                }
            }
            else
            {
                alert('item already existing');
            }
        }
       
        console.log('add item to cart', this.selectedboxitems);
    },
    
    },

     watch: {
        valid(val) {
            if (val) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        } ,
     },            
    

    mounted() {
      this.getBox();   
     }
}
</script>




 