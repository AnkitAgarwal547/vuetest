<template>

<!-- <v-dialog v-model="dialog2" max-width="50%" persistent> -->
<v-container max-width="50%" color="pink">
<v-card>
    <v-card-title>Modify Box Items</v-card-title>
    <v-row align="left" class="mx-0">
  <v-col>  <v-card-text>Box Type: {{selectedtype}}</v-card-text></v-col>
  <v-col>    <v-card-text>Free Shipping Limit: {{freeshippinglimit}}</v-card-text></v-col>
     </v-row>
  <v-toolbar flat></v-toolbar>
        <v-data-table
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
                            @click="item.quantity=changeqty(1, item.quantity)"
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
                            @click="item.quantity=changeqty(2, item.quantity)"
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
        <v-btn @click="dialog2=false">Exit</v-btn>
</v-card>
</v-container>
</template>

<script>
import BoxType from "../../models/BoxType";
//import createnewbox from './CreateNewBox';

export default {
    name: "BoxTypes",
    data() {
        return {
            headers:
             [
                { text: "Itemid", value: "itemid" },//to check meaning
                 // { text: "Name", value: "name" },
                 // { text: "Price", value: "price" },
                { text: "Quantity", value: "quantity" },
               // { text: "Image", value: "images" },
                { text: "Modify", value: "modify" }
            ],
                
            boxes: [],
            box: new BoxType(),
            selectedbox:new BoxType(),
            freeshippinglimit:150,
            selectedtype:'single',
            selectedboxitems:[{itemid:"2", quantity:4}, {itemid:"4", quantity:4}],
           // categories: [],
                //item:{},
                dialog2:false,
               // dialog: false,
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
               // v => v >= 0 || "Quantity must be 0 to 5",
             //   v => v <= 5 || "Quantity must be less then 5"
            ],
            errorMessage: "",
            snackbar: false,
            disabled: false, 
            index:-1
        };
    },

    methods: {
        // getBoxes() {
        //   console.log('hello get all boxes');
        //   this.dialog1 = true; 
        //     BoxType.get()
        //         .then(res => {this.boxes = res.data;
        //         console.log('hi', res.data);
        //         })
        // },
          getBox() {  
          console.log('hello get box', this.selectedtype);
           BoxType.get2(this.selectedtype)
                .then(res => {
                //this.box = res.data;
                if(res)
              //  return res.data;
              this.selectedbox=res.data;
              this.selectedboxitems=this.selectedbox.predefineditems;
               // console.log('hi', this.selectedbox, this.selectedboxitems, res.data);
                })

},
         modifyItem(type){
           console.log('hello from modify1', type);
           this.selectedtype=type;
           this.selectedbox=this.getBox(type);
            this.dialog1=false;
            this.dialog2=true; 
          this.selectedboxitems=this.selectedbox.predefineditems;//boxtype.predefineditems;
          console.log('hello from modify2', this.selectedtype, this.selectedbox, this.selectedboxitems);
        },

       changeqty(mode, quantity){
          // console.log('mode', mode,'quantity',quantity);
                        if(mode==1)
                         quantity+=1;
                        else
                          quantity-=1;
                        return quantity;
}, 
        save() {
            // this.disabled = true;
            // console.log('save mode 1', this.box);
            // if (this.mode === 1) {
            //     BoxType.post(this.box)
            //         .then(res => {
            //             this.boxes.push(res.data);
            //             this.dialog = true;
            //             this.disabled = false;
            //         })
            //         .catch(err => {
            //             this.errorMessage = err.response.data;
            //             setTimeout(() => (this.errorMessage = ""), 5000);
            //             this.disabled = false;
            //         });
            // } else 
            {//to check what it does
           // console.log('hello item', this.item);
                BoxType.put(this.selectedbox.type, this.selectedbox)
                    .then(res => {
                  console.log('hello then', res);
                      //console.log(res.config.data);
                        let index = this.items.findIndex(
                            p => p.item.itemid === res.data.itemid
                        );
                        this.items.splice(index, 1, res.data);
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
         remove(item) {
           console.log('hi-remove',this.selectedtype, item.itemid)
            BoxType.delete(this.selectedtype, item.itemid)//item.itemid)
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
    

  deleteItem(item) {

           console.log('hi-remove', item)
           this.index=this.selectedboxitems.indexOf(item);
           console.log('index', this.index);
           this.selectedboxitems=this.selectedboxitems.splice(this.index,1);
           //this.index=-1;

  },
  modifyBoxItem(){
      this.getBox()

      
  }
    },

                
    

    // mounted() {
    //     //this.getCategories();
    //     this.getBox();   
    // }
}
</script>




 