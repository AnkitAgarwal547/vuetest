<template>
<div>
    <v-data-table
        :headers="headers"
        :items="box"
        class="elevation-1"
      >
      <template v-slot:item.select="{ item }">
        <v-simple-checkbox
          v-model="item.select"
          disabled>
        </v-simple-checkbox>
      </template>
    </v-data-table>
    </div>
 </template>



<script>
export default {
    name:"box",
    data () {
      return {
        box: [
          {
            type: 'single',
            freeshippinglimit: 150,
            predefineditems:[]
            
          },
          {
           type: 'medium',
            freeshippinglimit: 180,
            predefineditems:[]
          },
         {
           type: 'company',
            freeshippinglimit: 200,
            predefineditems:[]
         },
         
        ],
        headers: [
          {
            text: 'Boxtype',
            align: 'start',
            sortable: false,
            value: 'type',
          },
          { text: 'Free shipping limit', value: 'freeshippinglimit' },
          {text:'Selection', value:'select'}
        ],
      }
    },
  }
  </script>