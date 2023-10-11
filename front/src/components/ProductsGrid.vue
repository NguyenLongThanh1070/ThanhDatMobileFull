<script setup>
import ProductsGridItem from '@/components/ProductsGridItem.vue'
import { defineProps } from 'vue'

const props = defineProps({
    products: Array,
})
</script>
<template>
    <div class="container">
        <div class="row">
            <ProductsGridItem
                v-for="(product, id) in props.products"
                :key="id"
                :PK_MaDienThoai="product.PK_MaDienThoai"
                :TenDienThoai="product.TenDienThoai"
                :DonGia="product.DonGia"
                :HinhAnh="product.HinhAnh" />
        </div>
    </div>
</template>

<style scoped></style>
