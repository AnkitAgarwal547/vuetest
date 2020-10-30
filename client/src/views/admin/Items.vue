  <template>
 <v-card tile outlined>
        <v-toolbar flat>
            <v-toolbar-title>Items</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="mr-5" @click="open(1)">
                new item</v-btn
            >
        </v-toolbar>

        <v-data-table
            dense
            fixed-header
            :headers="headers"
            :items="items"
            :items-per-page="5"
            sort-by="itemid"
            class="border-top"
        >
               
            <template v-slot:item.action="{item }"> 
                      <v-tooltip bottom>
                        <template v-slot:activator="{on}">
                        <v-icon
                            class="mr-2"
                            color="yellow darken-3"
                            v-on="on"
                            @click="open(2, item)"
                            >mdi-pencil-outline
                        </v-icon>
                    </template>
                    <span>Update</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon color="red" v-on="on" @click="remove(item)"
                            >mdi-delete-outline</v-icon
                        >
                    </template>
                    <span>Delete</span>
                </v-tooltip>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="50%" persistent>
            <v-form v-model="valid" ref="form1" @submit.prevent="save">
                <v-card>
                    <v-card-title>{{ title }}</v-card-title>

                    <v-container>
                        <v-row no-gutters justify="space-around">
                            <v-col cols="5">
                                <v-text-field
                                    v-model="item.itemid"
                                    class="b-tile"
                                    label="itemid"
                                    outlined
                                    dense
                                    clearable
                                    :rules="itemidRules"
                                    :success="itemidSuccess"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="5">
                                <v-text-field
                                    v-model="item.name"
                                    class="b-tile"
                                    label="name"
                                    outlined
                                    dense
                                    clearable
                                    :rules="nameRules"
                                    :success="nameSuccess"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="5">
                                <v-text-field
                                    v-model.number="item.price"
                                    
                                    class="b-tile"
                                    label="price"
                                    outlined
                                    dense
                                    clearable
                                    :rules="priceRules"
                                    :success="priceSuccess"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="5">
                                <v-text-field
                                    v-model.number="item.quantity"
                                    
                                    class="b-tile"
                                    label="quantity"
                                    outlined
                                    dense
                                    clearable
                                    :rules="quantityRules"
                                    :success="quantitySuccess"
                                ></v-text-field>
                            </v-col>

                             <v-col cols="5">
                                <v-text-field
                                    v-model.number="item.rating"
                                    
                                    class="b-tile"
                                    label="rating"
                                    outlined
                                    dense
                                    clearable
                                    :rules="ratingRules"
                                    :success="ratingSuccess"
                                ></v-text-field>
                            </v-col>

                             



                            <v-col cols="12">
                                <v-alert
                                    v-if="errorMessage"
                                    type="error"
                                    class="mx-2"
                                    >{{ errorMessage }}</v-alert
                                >
                            </v-col>
                        </v-row>
                    </v-container>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="dialog = false">cancel</v-btn>
                        <v-btn
                            :disabled="disabled"
                            type="submit"
                            color="success"
                            width="90"
                            @click="save"
                            >save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </v-card>
</template>

<script>
import Item from "../../models/Item";

export default {
    name: "Items",
    data() {
        return {
            headers: [
                { text: "Itemid", value: "itemid" },
                { text: "Name", value: "name" },
                { text: "Price", value: "price" },
                { text: "Quantity", value: "quantity" },
                { text: "Rating", value: "rating" },
                { text: "Actions", value: "action" }
            ],
            items: [],
            item: new Item(),
            mode: 0,
            dialog: false,
            valid: false,
            step: 1,
            itemidSuccess: false,
            itemidRules: [
                v => {
                    if (v) {
                        this.itemidSuccess = true;
                        return true;
                    } else {
                        return "Itemid is required";
                    }
                },
                v =>
                    (v || "").length >= 1 ||
                    "Itemid must be at least 1 characters long",
                v =>
                    (v || "").length <= 10 ||
                    "Itemid must be less than 10 characters"
            ],

            nameSuccess: false,
            nameRules: [
                v => {
                    if (v) {
                        this.nameSuccess = true;
                        return true;
                    } else {
                        return "Name is required";
                    }
                },
                v =>
                    (v || "").length >= 3 ||
                    "Name must be at least 3 characters long",
                v =>
                    (v || "").length <= 20 ||
                    "Name must be less than 20 characters"
            ],
            
            priceSuccess: false,
            priceRules: [
                v => {
                    if (v + "") {
                        this.priceSuccess = true;
                        return true;
                    } else {
                        return "Price is required";
                    }
                },
                v => v > 0 || "Price must be greater 0"
            ],
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
             ratingSuccess: false,
             ratingRules: [
                v => {
                    if (v + "") {
                        this.ratingSuccess = true;
                        return true;
                    } else {
                        return "Quantity is required";
                    }
                },

                v=>v>0||"Rating must be greater than 0",
                v=>v<=5||"Rating must be less than or equal to 5"
            
            ],
            errorMessage: "",
            snackbar: false,
            disabled: false
        };
    },

    computed: {
        title() {
            return this.mode === 1 ? "New Item" : "Update Item";
        }
    },

    methods: {
        getItems() {
            
            Item.get()
                .then(res => {this.items = res.data;})
                .catch(err => console.error(err.response.data));
        },

        open(mode, item) {
            this.item = new Item(item);
            this.step = 1;
            if (mode === 1) {
                this.disabled=false;
                this.itemidSuccess = false;
                this.nameSuccess = false;
                this.priceSuccess = false;
                this.quantitySuccess = false;
            }
            else if(mode==2)
            {
                this.disabled=false;
            }
            this.mode = mode;
            this.dialog = true;
            setTimeout(() => this.$refs.form1.resetValidation(), 300);
        },

        save() {
            this.disabled = true;
            if (this.mode === 1) {
                Item.post(this.item)
                    .then(res => {
                        this.items.push(res.data);
                        this.dialog = false;
                        this.disabled = false;
                    })
                    .catch(err => {
                        this.errorMessage = err.response.data;
                        setTimeout(() => (this.errorMessage = ""), 5000);
                        this.disabled = false;
                    });
            } else {
                Item.put(this.item)
                    .then(res => {
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

         remove(item) {
            Item.delete(item.itemid)
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

//    watch: {
//         valid(val) {
//             if (val) {
//                 this.disabled = false;
//             } else {
//                 this.disabled = true;
//             }
//         },
//     },
    },
    mounted() {
        this.getItems();
    }
 }

</script>




