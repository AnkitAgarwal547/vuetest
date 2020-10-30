<template>
    <v-container fluid class="pa-0">
        <v-divider class="mt-5"></v-divider>

        <Slider />

        <SubBanners />

        <Services />

        <v-divider class="my-12"></v-divider>

        <OurProducts />

        <SmartSystem />

        <Testimonials />

        <NewArrival />

        <Posts />
    </v-container>
</template>

<script>
import Slider from "../components/home/Slider";
import SubBanners from "../components/home/SubBanners";
import Services from "../components/home/Services";
import OurProducts from "../components/home/OurProducts";
import SmartSystem from "../components/home/SmartSystem";
import Testimonials from "../components/home/Testimonials";
import NewArrival from "../components/home/NewArrival";
import Posts from "../components/home/Posts";

export default {
    name: "Home",

    components: {
        Slider,
        SubBanners,
        Services,
        OurProducts,
        SmartSystem,
        Testimonials,
        NewArrival,
        Posts
    },

    data: () => ({})
};
</script>
