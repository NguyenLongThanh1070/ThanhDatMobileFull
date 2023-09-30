<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const product = ref(null)
const route = useRoute()

onMounted(async () => {
    const PK_MaDienThoai = route.params.PK_MaDienThoai
    const url = `http://localhost:3000/api/v1/dienthoai/${PK_MaDienThoai}`
    const response = await axios.get(url)
    product.value = response.data.product
})
</script>

<template>
    <div class="container my-5" v-if="product">
        <div class="row">
            <div class="col-md-5">
                <div class="main-img">
                    <img class="img-fluid" src="product.HinhAnh" alt="ProductS" />
                </div>
            </div>
            <div class="col-md-7">
                <div class="main-description px-2">
                    <div class="product-title text-bold my-3">{{ product.TenDienThoai }}</div>

                    <div class="price-area my-4">
                        <p class="new-price text-bold mb-1">{{ product.DonGia }} đồng</p>
                    </div>
                    <form action="/add_to_cart" method="post">
                        <div class="submit">
                            <input type="hidden" name="id" value="product.PK_MaDienThoai" />
                            <input type="hidden" name="images" value="product.HinhAnh" />
                            <input type="hidden" name="name" value="product.TenDienThoai" />
                            <input type="hidden" name="price" value="product.DonGia" />
                            <input type="hidden" name="username" value="" />
                            <div class="buttons d-flex my-5">
                                <div class="block">
                                    <button class="shadow btn custom-btn" type="submit">Thêm vào giỏ</button>
                                </div>
                                <div class="block quantity">
                                    <input type="number" class="form-control" value="1" name="quantity" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="buttons d-flex my-5">
                        <div class="block">
                            <a href="/dangnhap"><button class="shadow btn custom-btn">Thêm vào giỏ</button></a>
                        </div>
                        <div class="block quantity">
                            <input type="number" class="form-control" value="1" name="quantity" />
                        </div>
                    </div>
                </div>
                <div class="product-details my-4">
                    <p class="details-title text-color mb-1">Chi tiết sản phẩm</p>
                    <p class="description">
                        Độ phân giải: {{ product.DoPhanGiai }}<br />
                        Thời lượng pin: {{ product.ThoiLuongPin }}<br />
                        RAM: {{ product.Ram }}<br />
                        Camera trước: {{ product.CameraTruoc }}<br />
                        Camera sau: {{ product.CameraSau }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="brand">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Sản phẩm tương tự</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="brand-bg">
            <div class="container">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 margin">
                        <div class="brand_box">
                            <a href="/trangsanphamchitiet/<%=products[i].id %>">
                                <img src="<%=products[i].images %>" alt="ảnh lỗi" />
                                <h3>
                                    <strong class="red"></strong>
                                </h3>
                                <span></span>
                                <i><img src="/images/star.png" /></i>
                                <i><img src="/images/star.png" /></i>
                                <i><img src="/images/star.png" /></i>
                                <i><img src="/images/star.png" /></i>
                                <i><img src="/images/star.png" /></i>
                            </a>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <a class="read-more" href="/danhmucsanpham">See More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
