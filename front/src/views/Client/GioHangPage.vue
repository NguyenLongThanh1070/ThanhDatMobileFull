<script setup>
import { ref } from 'vue'
// import { useCartStore } from '@/stores/CartStore'
import ProductsList from '@/components/ProductsList.vue'

// const store = useCartStore()
let total = ref(0)
// let checkout = ref(false)
// let cart = store.cart
</script>

<template>
    <div class="container mt-5 p-3 rounded cart">
        <div class="row no-gutters">
            <div class="col-md-8">
                <div class="product-details mr-2">
                    <div class="d-flex flex-row align-items-center">
                        <RouterLink href="/danh-muc-san-pham"
                            ><i class="fa fa-long-arrow-left"></i
                            ><span class="ml-2">Continue Shopping</span></RouterLink
                        >
                    </div>
                    <hr />
                    <h3 class="mb-0">Shopping cart</h3>
                    <ProductsList />
                </div>
            </div>
            <div class="col-md-4">
                <div class="payment-info">
                    <div class="d-flex justify-content-between align-items-center">
                        <span>Hóa đơn</span>
                    </div>
                    <form action="/thanh-toan" method="post">
                        <div>
                            <label class="credit-card-label">Địa chỉ</label>
                            <input
                                type="text"
                                class="form-control credit-inputs"
                                placeholder="Nhập địa chỉ"
                                name="address" />
                        </div>
                        <div>
                            <label class="credit-card-label">Số điện thoại</label>
                            <input
                                type="text"
                                class="form-control credit-inputs"
                                placeholder="Nhập số điện thoại"
                                name="phone" />
                        </div>
                        <hr class="line" />
                        <div class="d-flex justify-content-between information">
                            <span>Giá sản phẩm</span><span class="new-price"> đồng</span>
                        </div>
                        <div class="d-flex justify-content-between information">
                            <span>Phí vận chuyển</span><span class="new-price"> đồng</span>
                        </div>
                        <div class="d-flex justify-content-between information">
                            <span>Tổng cộng</span><span class="new-price">{{ total }} đồng</span>
                        </div>
                        <input type="hidden" name="price" value="<%=total %>" />
                        <input type="hidden" name="username" value="<%=username %>" />
                        <button class="btn btn-primary btn-block d-flex justify-content-between mt-3" type="submit">
                            <span>Thanh toán<i class="fa fa-long-arrow-right ml-1"></i></span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
