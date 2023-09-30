<script setup>
import { defineProps, onMounted } from 'vue'
const props = defineProps({
    PK_MaDienThoai: String,
    HinhAnh: String,
    TenDienThoai: String,
    SoLuong: Number,
    DonGia: Number,
    TenDangNhap: String,
})
</script>

<template>
    <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
        <div class="d-flex flex-row">
            <img class="rounded" :src="require(`../assets/images/${props.HinhAnh}`)" width="40" />
            <div class="ml-2">
                <span class="font-weight-bold d-block"><%=product.name %></span>
            </div>
        </div>
        <div class="d-flex flex-row align-items-center">
            <span class="d-block"><%=product.quantity %></span>
            <span class="d-block ml-5 font-weight-bold new-price"><%=product.price %></span>
            <form action="/remove_from_cart" method="post">
                <input type="hidden" name="cartID" value="<%=product.cartID %>" />
                <button type="submit" class="btn btn-primary">
                    <i class="fa fa-trash-o text-black-50"></i>
                </button>
            </form>
        </div>
    </div>
</template>
