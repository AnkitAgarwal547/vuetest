<template>
        <v-dialog v-model="dialog" max-width="50%" persistent>
            <v-form v-model="valid" ref="form" @submit.prevent="save">
                <v-card>
                    <v-card-title>{{ title }}</v-card-title>

                    <v-container>
                        <v-row no-gutters justify="space-around">
                            <v-col cols="5">
                                <v-text-field
                                    v-model="box.type"
                                    class="b-tile"
                                    label="Box Type"
                                    outlined
                                    dense
                                    clearable
                                    :rules="typeRules"
                                    :success="typeSuccess"
                                ></v-text-field>
                            </v-col>

                             <v-col cols="5">
                                <v-text-field
                                    v-model="box.name"
                                    class="b-tile"
                                    label="Box Name"
                                    outlined
                                    dense
                                    clearable
                                    :rules="nameRules"
                                    :success="nameSuccess"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="5">
                                <v-text-field
                                    v-model="box.freeshippinglimit"
                                    class="b-tile"
                                    label="Free Shipping Limit"
                                    outlined
                                    dense
                                   clearable
                                    :rules="freeshippinglimitRules"
                                    :success="freeshippinglimitSuccess"
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
</template>

<script>
import BoxType from "../../models/BoxType";

export default {
    name: "CreateNewBox",
    data() {
        return {
            box: new BoxType(),
            item:{},
            dialog: true,
            mode: 1,
            valid: false,
            step:1,
            typeSuccess: false,
            typeRules: [
                v => {
                    if (v) {
                        this.typeSuccess = true;
                        return true;
                    } else {
                        return "Type is required";
                    }
                },
                v =>
                    (v || "").length >= 1 ||
                    "Type must be at least 1 characters long",
                v =>
                    (v || "").length <= 10 ||
                    "Type must be less than 10 characters"
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
                    (v || "").length >= 1 ||
                    "Name must be at least 1 characters long",
                v =>
                    (v || "").length <= 20 ||
                    "Name must be less than 20 characters"
            ],

            freeshippinglimitSuccess: false,
            freeshippinglimitRules: [
                v => {
                    if (v + "") {
                        this.freeshippinglimitSuccess= true;
                        return true;
                    } else {
                        return "Free shipping limit is required";
                    }
                },
                v => v > 50 || "Free shipping limit must be greater 50"
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
               // v => v >= 0 || "Quantity must be 0 to 5",
             //   v => v <= 5 || "Quantity must be less then 5"
            ],
            errorMessage: "",
            snackbar: false,
            disabled: false
        };
    },

    computed: {
        title() {
            return this.mode === 1 ? "New Box (Type)" : "Update Box (Type)";
        }
    },

    methods: { 
        open(mode, box) {
            this.box = new BoxType(box);
            this.step = 1;
            if (mode === 1) {
                this.typeSuccess = false;
                this.nameSuccess=false;
                this.freeshippinglimitSuccess = false;
               // this.priceSuccess = false;
            }
            if (mode === 2) {
               /* this.product.images = this.product.images.map(
                    image =>
                        "https://evening-headland-21583.herokuapp.com/" + image
                );*/
            }
            this.mode = mode;
            this.dialog = true;
            setTimeout(() => this.$refs.form1.resetValidation(), 300);//what is this?
        },

        save() {
            this.disabled = true;
            console.log('save mode 1', this.box);
            if (this.mode === 1) {
                BoxType.post(this.box)
                    .then(res => {
                        this.boxes.push(res.data);
                        this.dialog = true;
                        this.disabled = false;
                    })
                    .catch(err => {
                        this.errorMessage = err.response.data;
                        setTimeout(() => (this.errorMessage = ""), 5000);
                        this.disabled = false;
                    });
            } /*else {//to check what it does
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
                    });*/
            }
        },
}
</script>




