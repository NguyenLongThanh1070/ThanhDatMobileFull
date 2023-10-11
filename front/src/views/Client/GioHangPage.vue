<script setup>
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useGioHangStore } from '@/stores/GioHangStore'
import ProductsList from '@/components/ProductsList.vue'

const CartStore = useGioHangStore()
const AuthStore = useAuthStore()
let DiaChi = ref('')
let SoDienThoai = ref('')
CartStore.getGioHang(AuthStore.user.username)
let total = ref(0)

total = computed(() => {
    return CartStore.GioHang.reduce((accumulator, current) => {
        return accumulator + current.SoLuong * Number(current.DonGia)
    }, 0)
})

onMounted(() => {
    let GiaSanPham = document.querySelectorAll('.new-price')
    let ProductPrice = document.querySelectorAll('.mb-1.me-1')
    for (let i = 0; i < GiaSanPham.length; i++) {
        GiaSanPham[i].innerHTML = numberWithCommas(GiaSanPham[i].innerHTML)
    }
    for (let i = 0; i < ProductPrice.length; i++) {
        ProductPrice[i].innerHTML = numberWithCommas(ProductPrice[i].innerHTML)
    }
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    }
})
</script>

<template>
    <div class="container mt-5 p-3 rounded cart">
        <div class="row no-gutters">
            <div class="col-md-8">
                <div class="product-details mr-2">
                    <div class="d-flex flex-row align-items-center">
                        <RouterLink to="/danh-muc-san-pham"
                            ><i class="fa fa-long-arrow-left"></i><span class="ml-2">Tiếp tục mua sắm</span></RouterLink
                        >
                    </div>
                    <hr />
                    <h3 class="mb-0">Giỏ hàng</h3>
                    <ProductsList :products="CartStore.GioHang" />
                </div>
            </div>
            <div class="col-md-4">
                <div class="payment-info">
                    <div class="d-flex justify-content-between align-items-center">
                        <span>Hóa đơn</span>
                    </div>
                    <form @submit.prevent="CartStore.checkOut(AuthStore.user.username, DiaChi, SoDienThoai)">
                        <div>
                            <label class="credit-card-label">Địa chỉ</label>
                            <input
                                type="text"
                                class="form-control credit-inputs"
                                placeholder="Nhập địa chỉ"
                                v-model="DiaChi"
                                required />
                        </div>
                        <div>
                            <label class="credit-card-label">Số điện thoại</label>
                            <input
                                type="text"
                                class="form-control credit-inputs"
                                placeholder="Nhập số điện thoại"
                                v-model="SoDienThoai"
                                required />
                        </div>
                        <hr class="line" />
                        <div class="d-flex justify-content-between information">
                            <span>Giá sản phẩm</span><span class="new-price">{{ total }} </span>đồng
                        </div>
                        <div class="d-flex justify-content-between information">
                            <span>Phí vận chuyển</span><span class="new-price"> 0 </span>đồng
                        </div>
                        <div class="d-flex justify-content-between information">
                            <span>Tổng cộng</span><span class="new-price">{{ total }} </span>đồng
                        </div>
                        <button class="btn btn-primary btn-block d-flex justify-content-between mt-3" type="submit">
                            <span>Thanh toán<i class="fa fa-long-arrow-right ml-1"></i></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../../assets/css/giohang.css';
</style>
