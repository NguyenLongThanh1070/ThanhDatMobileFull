<script setup>
import { RouterView } from 'vue-router'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'
// import HeaderAdmin from '@/components/HeaderAdmin.vue'
// import FooterAdmin from './components/FooterAdmin.vue'
</script>
<template>
    <Header />
    <RouterView />
    <Footer />
</template>
