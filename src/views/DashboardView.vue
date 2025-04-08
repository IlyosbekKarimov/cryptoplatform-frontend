<template>
    <Navbar />
    <MainSection />
    <Footer />
</template>

<script>
import Navbar from '../components/Navbar.vue';
import MainSection from '../components/MainSection.vue';
import Footer from '../components/Footer.vue';

export default {
    components: {
        Navbar,
        MainSection,
        Footer,
    }
}
</script>