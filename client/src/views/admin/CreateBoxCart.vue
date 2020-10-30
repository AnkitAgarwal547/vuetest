<template>
 <v-container max-width="50%">
  <v-card>
      <v-card-title>Select Box Type</v-card-title>
     <v-data-table
            v-model="selectedbox"
            :headers="boxheaders" 
            :items="boxes"
            :single-expand="singleExpand"
            :expand.sync="expanded"
            :items-per-page="5"
            :single-select = true
            item-key = "type"
            show-select
            show-expand
            class="border-top"
        >
          <!-- <template v-slot:top> 
                      <v-toolbar flat>
                        <v-toolbar-title>Expandable Table</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-switch
                        v-model="singleExpand"
                        label="Single Expand"
                        class = "mt-2"
                        > </v-switch>
                      </v-toolbar>
          </template> -->

          <template v-slot:expanded-item="{ headers,item}">
              <td :colspan="headers.length">
                <v-simple-table 
                  dense
                  fixed-header 
                >
                <template v-slot:default>
                  <thead>
                   <tr>
                   <th class="text-left">
                  Item Name                   </th>
                   <th class="text-left">
                  Quantity
                  </th>
                  <th class="text-left">
                  Price
                  </th>
                 </tr>
                  </thead>
                    <tbody >
                    <tr
                    v-for="item1 in item.predefineditems"
                    :key="item1.itemid"
                    >
                     <td>{{ item1.name }}</td>
                    <td>{{ item1.quantity }}</td>
                    <td>{{item1.price}}</td> 
        </tr>
      </tbody>
    </template>
  </v-simple-table>             
        
             </td>
          </template>
      </v-data-table>
    
       <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn
           :disabled="disabled"
           type="submit"
           color="success"
          
           @click="addToBoxCart"
           >Add To Box Cart</v-btn>

         <!-- <v-btn
           :disabled="disabled"
           type="submit"
           color="success"
                    @click="modify"
           >Modify Box Cart</v-btn> -->


           <v-btn text @click="dialog=false" backgroundcolor="warning">Cancel   
           </v-btn>

           <router-link to="/modifyboxcart" class="blue--text mx-1"
           >Modify Box Cart </router-link>
        </v-card-actions>
    </v-card>
    </v-container>
</template>

<script>
import BoxType from "../../models/BoxType";
import BoxCart from "../../models/BoxCart"

export default {
    name: "CreateBoxCart",
    data() {
        return {
            boxheaders:[
               { text: "Type", value: "type" },//to check meaning
               { text:  "Name", value:"name"},
               { text: "Free shipping limit", value: "freeshippinglimit" },
               { text: "Total Price", value: "totalprice" },
               { text: "", value: "data-table-expand" },//to check meaning
               // { text: "Image", value: "images" },
               // { text: "Actions", value: "actions" }
                ],
            expanded:[],
            singleExpand:true,
            boxes: [],
            selectedbox:[],
            box: new BoxType(),
            selectedboxtype:'',
            boxcart:new BoxCart(),
            item:{},
            dialog:false,
            valid: false,
            snackbar: false,
            disabled: false,
            userid:"Us202",
            errorMessage:''
        };
    },

    methods: {
        getBoxes() {
          console.log('hello get all boxes');
          this.dialog1 = true; 
            BoxType.get()
                .then(res => {this.boxes = res.data;
                console.log('hi', res.data);
                })
        },

        addToBoxCart(){
            this.disabled=true;
            console.log('selected box', this.selectedbox[0], this.userid);
            this.boxcart.userid=this.userid;
            console.log(this.boxcart.userid)
            this.boxcart.type=this.selectedbox[0].type;
            this.boxcart.name=this.selectedbox[0].name;
            this.boxcart.freeshippinglimit=this.selectedbox[0].freeshippinglimit;
            this.boxcart.items=this.selectedbox[0].predefineditems;
            console.log('add to boxcart before total price',this.boxcart);
            this.boxcart.totalprice=this.calculateTotalPrice();
            console.log('add to boxcart after total price',this.boxcart);
            this.saveBoxCart();
        },

        calculateTotalPrice()
        {
        const that=this;
        this.totalprice=0;
        console.warn('boxcart print in total price',this.boxcart);
        this.boxcart.items.forEach(item => 
        {    
            console.log('item', item);   
            this.$axios.get(`http://localhost:8000/api/item/${item.itemid}`).then(res=>{
                    console.log('response', res);
                    this.totalprice+=res.data.price*item.quantity;
                    console.log('price, quantity, totalprice', res.data.price, item.quantity, this.totalprice);
                    }) 
        });
           this.boxcart.totalprice=this.totalprice;
            console.log('boxcart calculate total price',this.boxcart.items,'totalprice', this.totalprice );
            return that.totalprice;
         },
       
        saveBoxCart() {
            {
               console.log('save boxcart client', this.boxcart, this.boxcart.userid);
               BoxCart.post(this.boxcart)
                    .then(res => {
                            console.log('hello then re.data', res.data);
                        this.dialog = false;
                        this.disabled = false;
                    })
                    .catch(err => {
                        this.errorMessage = err.response.data;
                        console.log('error', this.errorMessage);
                        setTimeout(() => (this.errorMessage = ""), 5000);
                        this.disabled = false;
                    });
            }
        },

cancel(){
    console.log('cancel');
}

},
   /* watch: {
        valid(val) {
            if (val) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        },*/

    mounted() {
        this.getBoxes();
    }
}
</script>




