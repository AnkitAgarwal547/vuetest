<template>

<!-- <v-dialog v-model="dialog2" max-width="50%" persistent> -->
<v-container max-width="50%" color="pink">
<v-card>
    <v-card-title>Modify Box Items</v-card-title>
    <v-row align="center" class="mx-0" dense>
        <v-col>  <v-card-text>Box Type: {{selectedtype}}</v-card-text></v-col>
        <v-col>  <v-card-text>Free Shipping Limit: {{freeshippinglimit}}</v-card-text></v-col>
        <v-col>  <v-card-text>Total Price: {{totalprice}}</v-card-text></v-col>
     </v-row>
  <v-toolbar flat></v-toolbar>
        <v-data-table
            dense
            :headers="headers"
            :items="selectedboxitems"
            :items-per-page="5"
            class="border-top">
                           
            <template v-slot:item.modify ="{item }"> 
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
        <v-btn @click="saveBoxType">Save Box</v-btn>
          <v-btn @click="addItemToBoxType">Add Item</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
           
</v-card>

<v-dialog v-model="dialog" max-width="50%" persistent>
<v-card>
    <v-card-title>Select Item</v-card-title>
     <v-data-table
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
import BoxType from "../../models/BoxType";
import Item from "../../models/Item";

export default {
    name: "ModifyBoxType",
    data() {
        return {
            headers:
             [
                { text: "Itemid", value: "itemid" },
                { text: "Quantity", value: "quantity" },
                { text: "Modify", value: "modify" }
            ],
            valid:false,
            disabled:false,
            dialog:false,
            box: new BoxType(),
           selectedboxtype:new BoxType(),
            totalprice:0,
            freeshippinglimit:0,
            selectedboxitems:[],
            headersitems: [
                { text: "Itemid", value: "itemid" },
                { text: "Quantity", value: "quantity" },
                { text: "Modify", value: "modify" }
            ],
            items:[],
            item:new Item(),
            selecteditem:[],
            errorMessage: "",
            index:-1,
            selectedtype:'single',
        };
    },

    methods: {
          getBox() {  
          console.log('hello get boxtype');
          BoxType.get2(this.selectedtype)
              .then(res => {
                    console.log('get box type client 1',  'res.data', res);
                if(res)
             {
            this.selectedboxitems=res.data.predefineditems;
            this.selectedboxtype.type=res.data.type;
            this.selectedboxtype.freeshippinglimit=res.data.freeshippinglimit;
            this.selectedboxtype.totalprice=res.data.totalprice;
            this.selectedboxtype.predefineditems=this.selectedboxitems;
            console.log('get box type client',this.selectedboxitems, ' selectedboxtype', this.selectedboxtype);
            this.selectedtype=this.selectedboxtype.type;
            this.freeshippinglimit=this.selectedboxtype.freeshippinglimit;
            this.totalprice=this.selectedboxtype.totalprice;
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

       saveBoxType() {
            {
                this.disabled=true;
                console.log('hello save boxtype', this.selectedboxitems, this.totalprice);
                this.selectedboxtype.predefineditems=this.selectedboxitems;
                this.selectedboxtype.totalprice=this.totalprice;
               console.log('save boxtype selectedbox', this.selectedboxtype);
                BoxType.put(this.selectedtype, this.selectedboxtype)
                    .then(res => {
                    console.log('hello then', res);

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

        //  remove(item) {
        //    console.log('hi-remove',this.selectedtype, item.itemid)
        //     BoxCart.delete(this.selectedtype, item.itemid)//item.itemid)
        //         .then(res => {
        //             let index = this.items.findIndex(
        //                 p => p.itemid === res.data.itemid
        //             );
        //             this.items.splice(index, 1);
        //         })
        //         .catch(err => {
        //             this.errorMessage = err.response.data;
        //             this.snackbar = true;
        //             setTimeout(() => {
        //                 this.snackbar = false;
        //                 this.errorMessage = "";
        //             }, 5000);
        //         });
        // },

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

    addItemToBoxType(){

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
            console.log('item qty and itemid', this.item.quantity, this.item.itemid);
            this.index=this.selectedboxitems.findIndex(item=>item.itemid===this.item.itemid);
            console.log('ok selected item2', this.selecteditem, 'index', this.index);
            if(this.index<0)
            {
                this.selectedboxitems.push({itemid:this.item.itemid, quantity:1});
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

