<template>
 <v-container max-width="50%">
  <v-card>
      <v-card-title>Select Box Type</v-card-title>
     <v-data-table
            v-model="selectedbox"
            :headers="headers" 
            :items="boxes"
            :items-per-page="5"
            :single-select = true
            item-key = "type"
            show-select
            class="border-top"
        >
          <!-- <template v-slot:item.action="{ item }"> 
                      <v-tooltip bottom>
                        <v-simple-checkbox
                          v-model="item.action"
                        >z
                        </v-simple-checkbox>
                  
                        <span>Select</span>
                      </v-tooltip> -->
          <!-- </template> -->
      </v-data-table>
       <!-- <v-btn @click="modifyItem(item)">Close</v-btn>-->
       <v-card-actions>
           <v-btn color="purple" @click="modifyBox">Modify Items   
           </v-btn>

           <v-btn color="purple" @click="cancel">Cancel   
           </v-btn>
        </v-card-actions>
    </v-card>
    </v-container>
</template>

<script>
import BoxType from "../../models/BoxType";
import modifyboxitem from "./ModifyBoxItem";

export default {
    name: "SelectedBox",
    data() {
        return {
            headers:[
               { text: "Type", value: "type" },//to check meaning
               { text: "Free shipping limit", value: "freeshippinglimit" },
               // { text: "Image", value: "images" },
               // { text: "Actions", value: "actions" }
                ],
            boxes: [],
            selectedbox:[],
            box: new BoxType(),
            selectedboxtype:'',
            item:{},
            dialog1:false,
            //valid: false,
            //snackbar: false,
            //disabled: false
        };
    },

    methods: {
        getBoxes() {
          console.log('hello get all boxes');
          this.dialog1 = true; 
            BoxType.get()
                .then(res => {this.boxes = res.data;
                console.log('hi', res.data);
                })//res.data)) console.log('hi',res.data)
               // .catch(err => console.error(err.response.data));
        },
modifyBox(){
console.log('selected box', this.selectedbox);
    modifyboxitem.modifyBoxItem();
},
cancel(){
    console.log('cancel');
}

    
    // modifyBoxItem(){
    //     modifyboxitem.mounted();
    // },
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




