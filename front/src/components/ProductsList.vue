<script setup>
import ProductsListItem from './ProductsListItem.vue'
import { defineProps } from 'vue'

const props = defineProps({
    products: Array,
})
</script>

<template>
    <section style="background-color: #eee">
        <div class="container py-5">
            <ProductsListItem
                v-for="product in props.products"
                :key="product.PK_MaDienThoai"
                :PK_MaGioHang="product.PK_MaGioHang"
                :TenDienThoai="product.TenDienThoai"
                :DonGia="product.DonGia"
                :HinhAnh="product.HinhAnh"
                :SoLuong="product.SoLuong" />
        </div>
    </section>
</template>

<style>
@media (max-width: 767.98px) {
    .border-sm-start-none {
        border-left: none !important;
    }
}
</style>
