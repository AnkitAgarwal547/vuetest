<template>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img
        height="250"
        src="../../assets/office.jpg"
      ></v-img>
      <v-card-title>Box Type Selection</v-card-title>
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
        <div class="my-4 subtitle-1">
          <v-avatar 
            color ="indigo"
            size="18"
            class="pa-4"
          >
<span class="white--text headline">S</span>
</v-avatar>
         <b> Single Box  </b>  (FreeShipment limit $150)
        </div>
           <div class="my-4 subtitle-1">
              <v-avatar 
                color ="indigo"
                size="24"
                  class="pa-4" >
          <span class="white--text headline">M</span>
          </v-avatar>
          <b> Medium Box </b>   (FreeShipment limit $180)
           </div>

        
           <div class="my-4 subtitle-1">
             <v-avatar 
color ="indigo"
size="30"
class="pa-4"
>
<span class="white--text headline">C</span>
</v-avatar>
         <b> Company Box </b>   (FreeShipment limit $180)
        </div>
        </v-row>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title>Current availability</v-card-title>
      <v-card-text>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-3 white--text"
          column
        >
          <v-chip>Single Box</v-chip>
          <v-chip>Medium Box</v-chip>
          <v-chip>Company Box</v-chip>
        </v-chip-group>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="customizebox"
        >
          Customize Box Selection: {{selection + 1}}
        </v-btn>
      </v-card-actions>
    </v-card>
</template>
 
<script>
  export default{
  data: () => ({
    loading: false,
    selection: 1,
  }),
  methods: {
    customizebox () {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
//import BoxType from "../../models/BoxType";
 
</script>