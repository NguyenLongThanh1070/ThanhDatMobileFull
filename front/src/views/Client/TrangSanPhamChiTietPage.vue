<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDienThoaiStore } from '@/stores/DienThoaiStore'
import { useAuthStore } from '@/stores/AuthStore'
import { useGioHangStore } from '@/stores/GioHangStore'
import { useDanhGiaStore } from '@/stores/DanhGiaStore'
import moment from 'moment'

const DanhGiaStore = useDanhGiaStore()
const GioHangStore = useGioHangStore()
const AuthStore = useAuthStore()
const DienThoaiStore = useDienThoaiStore()
const route = useRoute()
DienThoaiStore.getDienThoai()
DienThoaiStore.getSingleDienThoai(route.params.PK_MaDienThoai)
DanhGiaStore.getDanhGia()

const SoLuong = ref(1)
const NoiDungDanhGia = ref('')

const filteredDienThoai = computed(() => {
    let DienThoai = DienThoaiStore.DienThoai
    DienThoai = DienThoai.filter((DienThoai) => DienThoai.PK_MaDienThoai < 3)
    return DienThoai
})

onMounted(() => {
    let DonGia = document.querySelector('.h5').innerHTML
    document.querySelector('.h5').innerHTML = numberWithCommas(DonGia)
    let nodeList = document.querySelectorAll('strong.text-dark')
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML = numberWithCommas(nodeList[i].innerHTML)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    }
})

watch(
    () => route.params.PK_MaDienThoai,
    (newVal) => {
        DienThoaiStore.getSingleDienThoai(newVal)
    }
)
</script>

<template>
    <section class="py-5">
        <div class="container">
            <div class="row gx-5">
                <aside class="col-lg-6">
                    <div class="border rounded-4 mb-3 d-flex justify-content-center">
                        <img
                            style="max-width: 100%; max-height: 100vh; margin: auto"
                            class="rounded-4 fit"
                            :src="require(`../../assets/images/${DienThoaiStore.SingleDienThoai.HinhAnh}`)"
                            loading="lazy" />
                    </div>
                    <!-- thumbs-wrap.// -->
                    <!-- gallery-wrap .end// -->
                </aside>
                <main class="col-lg-6">
                    <div class="ps-lg-3">
                        <h4 class="title text-dark">
                            {{ DienThoaiStore.SingleDienThoai.TenDienThoai }}
                        </h4>
                        <div class="d-flex flex-row my-3">
                            <div class="text-warning mb-1 me-2">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fas fa-star-half-alt"></i>
                                <span class="ms-1"> 4.5 </span>
                            </div>
                            <span class="text-muted"><i class="fas fa-shopping-basket fa-sm mx-1"></i>154 đã mua</span>
                            <span class="text-success ms-2">Còn hàng</span>
                        </div>

                        <div class="mb-3">
                            <span class="h5">{{ DienThoaiStore.SingleDienThoai.DonGia }}</span> đồng
                        </div>

                        <p>
                            Hiện đại và chất lượng cao, lấy cảm hứng từ xu hướng công nghệ mới nhất và không giống với
                            những thiết kế truyền thống. Được sản xuất với các vật liệu cao cấp, chiếc điện thoại của
                            chúng tôi có thiết kế màu đen và bạc thanh lịch và đi kèm với nhiều tính năng tiên tiến sẽ
                            nâng cao trải nghiệm di động của bạn.
                        </p>

                        <hr />

                        <div class="row mb-4">
                            <!-- col.// -->
                            <div class="col-md-4 col-6 mb-3">
                                <label class="mb-2 d-block">Số lượng</label>
                                <div class="input-group mb-3" style="width: 170px">
                                    <button
                                        class="btn btn-white border border-secondary px-3"
                                        type="button"
                                        id="button-addon1"
                                        data-mdb-ripple-color="dark"
                                        @click="SoLuong > 1 ? SoLuong-- : SoLuong">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <input
                                        type="text"
                                        class="form-control text-center border border-secondary"
                                        v-model="SoLuong"
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1" />
                                    <button
                                        class="btn btn-white border border-secondary px-3"
                                        type="button"
                                        id="button-addon2"
                                        data-mdb-ripple-color="dark"
                                        @click="SoLuong++">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <form
                            @submit.prevent="
                                GioHangStore.addGioHang(
                                    DienThoaiStore.SingleDienThoai.HinhAnh,
                                    DienThoaiStore.SingleDienThoai.TenDienThoai,
                                    SoLuong,
                                    DienThoaiStore.SingleDienThoai.DonGia,
                                    AuthStore.user.username,
                                    DienThoaiStore.SingleDienThoai.PK_MaDienThoai
                                )
                            ">
                            <div class="submit">
                                <div v-if="AuthStore.user.username" class="buttons d-flex my-5">
                                    <div class="block">
                                        <button class="shadow btn custom-btn" type="submit">Thêm vào giỏ</button>
                                    </div>
                                </div>
                                <div v-else class="buttons d-flex my-5">
                                    <div class="block">
                                        <RouterLink to="/dang-nhap"
                                            ><button class="shadow btn custom-btn">Thêm vào giỏ</button></RouterLink
                                        >
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    </section>
    <section class="bg-light border-top py-4">
        <div class="container">
            <div class="row gx-4">
                <div class="col-lg-8 mb-4">
                    <div class="border rounded-2 px-3 py-2 bg-white">
                        <!-- Pills navs -->
                        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li class="nav-item d-flex" role="presentation">
                                <a
                                    class="nav-link d-flex align-items-center justify-content-center w-100 active"
                                    id="ex1-tab-1"
                                    data-mdb-toggle="pill"
                                    href="#ex1-pills-1"
                                    role="tab"
                                    aria-controls="ex1-pills-1"
                                    aria-selected="true"
                                    >Specification</a
                                >
                            </li>
                            <li class="nav-item d-flex" role="presentation">
                                <a
                                    class="nav-link d-flex align-items-center justify-content-center w-100"
                                    id="ex1-tab-2"
                                    data-mdb-toggle="pill"
                                    href="#ex1-pills-2"
                                    role="tab"
                                    aria-controls="ex1-pills-2"
                                    aria-selected="false"
                                    >Warranty info</a
                                >
                            </li>
                            <li class="nav-item d-flex" role="presentation">
                                <a
                                    class="nav-link d-flex align-items-center justify-content-center w-100"
                                    id="ex1-tab-3"
                                    data-mdb-toggle="pill"
                                    href="#ex1-pills-3"
                                    role="tab"
                                    aria-controls="ex1-pills-3"
                                    aria-selected="false"
                                    >Shipping info</a
                                >
                            </li>
                            <li class="nav-item d-flex" role="presentation">
                                <a
                                    class="nav-link d-flex align-items-center justify-content-center w-100"
                                    id="ex1-tab-4"
                                    data-mdb-toggle="pill"
                                    href="#ex1-pills-4"
                                    role="tab"
                                    aria-controls="ex1-pills-4"
                                    aria-selected="false"
                                    >Seller profile</a
                                >
                            </li>
                        </ul>
                        <!-- Pills navs -->

                        <!-- Pills content -->
                        <div class="tab-content" id="ex1-content">
                            <div
                                class="tab-pane fade show active"
                                id="ex1-pills-1"
                                role="tabpanel"
                                aria-labelledby="ex1-tab-1">
                                <table class="table border mt-3 mb-2">
                                    <tr>
                                        <th class="py-2">Màn hình</th>
                                        <td class="py-2">{{ DienThoaiStore.SingleDienThoai.DoPhanGiai }}</td>
                                    </tr>
                                    <tr>
                                        <th class="py-2">Thời lượng pin</th>
                                        <td class="py-2">{{ DienThoaiStore.SingleDienThoai.Pin }}</td>
                                    </tr>
                                    <tr>
                                        <th class="py-2">RAM</th>
                                        <td class="py-2">{{ DienThoaiStore.SingleDienThoai.RAM }}</td>
                                    </tr>
                                    <tr>
                                        <th class="py-2">Camera trước</th>
                                        <td class="py-2">{{ DienThoaiStore.SingleDienThoai.CamTruoc }}</td>
                                    </tr>
                                    <tr>
                                        <th class="py-2">Camera sau</th>
                                        <td class="py-2">{{ DienThoaiStore.SingleDienThoai.CamSau }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <!-- Pills content -->
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="px-0 border rounded-2 shadow-0">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Sản phẩm tương tự</h5>
                                <div class="d-flex mb-3" v-for="(product, id) in filteredDienThoai" :key="id">
                                    <RouterLink :to="`/${product.PK_MaDienThoai}`" class="me-3">
                                        <img
                                            :src="require(`../../assets/images/${product.HinhAnh}`)"
                                            style="min-width: 96px; height: 96px"
                                            class="img-md img-thumbnail" />
                                    </RouterLink>
                                    <div class="info">
                                        <span>{{ product.TenDienThoai }}</span>
                                        <br />
                                        <strong class="text-dark"> {{ product.DonGia }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- comment -->
    <div class="container mt-5 mb-5">
        <div class="d-flex justify-content-center row">
            <div class="d-flex flex-column col-md-8">
                <div class="coment-bottom bg-white p-2 px-4">
                    <form
                        @submit.prevent="
                            DanhGiaStore.addDanhGia(
                                AuthStore.user.username,
                                NoiDungDanhGia,
                                route.params.PK_MaDienThoai
                            )
                        ">
                        <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                            <input
                                type="text"
                                class="form-control mr-3"
                                placeholder="Viết bình luận"
                                v-model="NoiDungDanhGia" />
                            <button class="btn btn-primary" type="submit">Bình luận</button>
                        </div>
                    </form>
                    <div class="commented-section mt-2" v-for="(DanhGia, id) in DanhGiaStore.DanhGia" :key="id">
                        <div class="d-flex flex-row align-items-center commented-user">
                            <h5 class="mr-2">{{ DanhGia.TenKhachHang }}</h5>
                            <span class="dot mb-1"></span
                            ><span class="mb-1 ml-2">{{ moment(DanhGia.ThoiGianDanhGia).format('DD-MM-YYYY') }}</span>
                        </div>
                        <div class="comment-text-sm">
                            <span>{{ DanhGia.NoiDungDanhGia }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import '../../assets/css/trangsanphamchitiet.css';
section.py-5 {
    margin-top: 100px;
}
.icon-hover:hover {
    border-color: #3b71ca !important;
    background-color: white !important;
    color: #3b71ca !important;
}

.icon-hover:hover i {
    color: #3b71ca !important;
}

body {
    background-color: #eee;
}

.bdge {
    height: 21px;
    background-color: orange;
    color: #fff;
    font-size: 11px;
    padding: 8px;
    border-radius: 4px;
    line-height: 3px;
}

.comments {
    text-decoration: underline;
    text-underline-position: under;
    cursor: pointer;
}

.dot {
    height: 7px;
    width: 7px;
    margin-top: 3px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
}

.hit-voting:hover {
    color: blue;
}

.hit-voting {
    cursor: pointer;
}
</style>
