<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    :single-select="singleSelect"
    item-key="itemid"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch
        v-model="singleSelect"
        label="Single select"
        class="pa-3"
      ></v-switch>
    </template>
  </v-data-table>
</template>

<script>

import Item from "../../models/Item";
  export default {
    data () {
      return {
        singleSelect: false,
        selected: [],
        headers:  [
                { text: "Itemid", value: "itemid" },//to check meaning
                { text: "Name", value: "name" },
                { text: "Price", value: "price" },
                { text: "Quantity", value: "quantity" },
               // { text: "Image", value: "images" },
                { text: "Actions", value: "action" }
            ],
            items: [],
            item: new Item(),
      }
    },

      methods: {
        getItems() {
            Item.get()
                .then(res => {this.items = res.data;})//res.data)) console.log('hi',res.data)
                .catch(err => console.error(err.response.data));
        }
    },
  }
</script>