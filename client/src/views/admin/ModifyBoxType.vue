<template>

<!-- <v-dialog v-model="dialog2" max-width="50%" persistent> -->
<v-container max-width="50%" color="pink">
<v-card>
    <v-card-title>Modify Box Items</v-card-title>
    <v-row align="center" class="mx-0" dense>
        <v-col>  <v-card-text><b>Box Type:</b> {{selectedtype}}</v-card-text></v-col>
        <v-col>  <v-card-text><b>Box Name:</b> {{selectedname}}</v-card-text></v-col>
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
            dense
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
                { text: "Itemid", value: "itemid" },//to check meaning
                { text: "Name", value: "name" },
                { text: "Price", value: "price" },
                { text: "Quantity", value: "quantity" },
               // { text: "Image", value: "images" },
                { text: "Modify", value: "modify" }
            ],
            
           // userid:'Us202',   
            //boxes: [],
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
                { text: "Name", value: "name" },
                { text: "Price", value: "price" },
                { text: "Quantity", value: "quantity" },
                { text: "Modify", value: "modify" }
            ],
            items:[],
           item:new Item(),
           // item:[],
            selecteditem:[],
           // quantitySuccess: false,
            // quantityRules: [
            //     v => {
            //         if (v + "") {
            //             this.quantitySuccess = true;
            //             return true;
            //         } else {
            //             return "Quantity is required";
            //         }
            //     },
            //    // v => v >= 0 || "Quantity must be 0 to 5",
            //  //   v => v <= 5 || "Quantity must be less then 5"
            // ],
            errorMessage: "",
            //snackbar: false,
           // disabled: false, 
            index:-1,
            selectedtype:'medium',
            selectedname:''
        };
    },

    methods: {
          getBox() {  
          console.log('hello get boxtype');
          BoxType.get2(this.selectedtype)
              .then(res => {
                    console.log('get box type client 1',  'res.data', res);
                //this.box = res.data;
                if(res)
              //  return res.data;
             {
                // this.selectedbox={userid:'Us201', type:'single', freeshippinglimit:150, totalprice:61 };
            //  this.selectedboxcart=res.data;
            //this.selectedboxitems=this.selectedboxcart.items;
            this.selectedboxitems=res.data.predefineditems;
           // this.selectedboxtype.userid=res.data.userid;
            this.selectedboxtype.type=res.data.type;
            this.selectedboxtype.name=res.data.name;
            this.selectedboxtype.freeshippinglimit=res.data.freeshippinglimit;
            this.selectedboxtype.totalprice=res.data.totalprice;
             this.selectedboxtype.predefineditems=this.selectedboxitems;
            //this.selectedboxitems.items=this.selectedboxitems;

              
              //this.selectedboxitems=[{itemid:"2", quantity:3}, {itemid:"1", quantity:5}, {itemid:"3", quantity:2}];
              console.log('get box type client',this.selectedboxitems, ' selectedboxtype', this.selectedboxtype);
             // this.selectedbox.items=this.selectedboxitems;
              this.selectedtype=this.selectedboxtype.type;
              this.selectedname=this.selectedboxtype.name;
              this.freeshippinglimit=this.selectedboxtype.freeshippinglimit;
              this.totalprice=this.selectedboxtype.totalprice;
             }
               // console.log('hi', this.selectedbox, this.selectedboxitems, res.data);
                })

          },

          changeitemqty(mode, quantity, item){
          // console.log('mode', mode,'quantity',quantity);
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
           //this.index=-1;
        },

      calculateTotalPrice()
      {
        let that=this;
        this.totalprice=0;
        console.log('selecedboxitems', this.selectedboxitems);
        this.selectedboxitems.forEach(item => 
        {       
               // Item.get2(item.itemid).then(res=>{        
                this.$axios.get(`http://localhost:8000/api/item/${item.itemid}`).then(res=>{
                console.log('response = ' + res);
                console.log('result', res);
                that.totalprice+=res.data.price*item.quantity;
                console.log(res.data.price, item.quantity, that.totalprice);
            })
                  //  return that.totalprice; 
        });
            // console.log('selected box items',this.selectedboxitems,'totalprice', that.totalprice );

         },

        //  modifyItem(type){
        //    console.log('hello from modify1', type);
        //    this.selectedtype=type;
        //    this.selectedbox=this.getBox(type);
        //     this.dialog1=false;
        //     this.dialog2=true; 
        //   this.selectedboxitems=this.selectedbox.predefineditems;//boxtype.predefineditems;
        //   console.log('hello from modify2', this.selectedtype, this.selectedbox, this.selectedboxitems);
        // },


//to check what it does, this method saves final box cart in the box cart collection
        saveBoxType() {
            {
                this.disabled=true;
                console.log('hello save boxtype', this.selectedboxitems, this.totalprice);
                this.selectedboxtype.predefineditems=this.selectedboxitems;
                this.selectedboxtype.totalprice=this.totalprice;
               // BoxCart.put(this.selectedbox.userid, this.selectedbox)
               console.log('save boxtype selectedbox', this.selectedboxtype);
                BoxType.put(this.selectedtype, this.selectedboxtype)
                    .then(res => {
                    console.log('hello then', res);
                      //console.log(res.config.data);
                        // let index = this.items.findIndex(
                        //     p => p.item.itemid === res.data.itemid
                        // );
                        // this.items.splice(index, 1, res.data);
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
 
 //we can also use following method for deleting a record
 //deleteItem:function(item) {this.items.splice(this.items.indexOf(item),1)}
         
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


            //Item.get()
              //  .then(res => {console.log('boxcart get items',res.data);
                //this.items = res.data;})//res.data)) console.log('hi',res.data)
                //.catch(err => console.error(err.response.data));
        },

    addItemToBoxType(){

        this.getItems();
        this.dialog=true;
        this.disabled=false;
        },

    OKSelectItem(){
        // index2=-1;
        console.log('ok selected item1', this.selecteditem);
        if(this.selecteditem[0].itemid!=null)
        {
            this.item.itemid=this.selecteditem[0].itemid;
            this.item.name=this.selecteditem[0].name;
            this.item.price=this.selecteditem[0].price;
            this.item.quantity=this.selecteditem[0].quantity;
            console.log('item qty and itemid', this.item.quantity, this.item.itemid);

            //this.index=this.selectedboxitems.indexOf({itemid:this.item.itemid, quantity:this.item.quantity});
            this.index=this.selectedboxitems.findIndex(item=>item.itemid===this.item.itemid);
                       console.log('ok selected item2', this.selecteditem, 'index', this.index);
            if(this.index<0)
            {
                this.selectedboxitems.push({itemid:this.item.itemid, name: this.item.name, price:this.item.price, quantity:1});
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
                //this.selectedboxitems[index2].quantity+=1;
            }
        }
       
        console.log('add item to cart', this.selectedboxitems);
    },
    

 
//   modifyBoxItem(){
//       this.getBox()

      
  //}
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
    //     //this.getCategories();
      this.getBox();   
     }
}
</script>

