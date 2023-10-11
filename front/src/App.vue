<script setup>
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/AuthStore'

import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue'
import HeaderAdmin from './components/HeaderAdmin.vue'
import FooterAdmin from './components/FooterAdmin.vue'

const route = useRoute()
const store = useAuthStore()
</script>

<template>
    <template v-if="route.path.includes('admin') && store.user.role === 'Admin'">
        <HeaderAdmin />
        <RouterView />
        <FooterAdmin />
    </template>
    <template v-else>
        <Header />
        <RouterView />
        <Footer />
    </template>
</template>
