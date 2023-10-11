<script setup>
import ProductsGrid from '@/components/ProductsGrid.vue'
import { ref, watchEffect } from 'vue'
import { useDienThoaiStore } from '@/stores/DienThoaiStore'
import { useLienHeStore } from '@/stores/LienHeStore'
import { useAuthStore } from '@/stores/AuthStore'
import { computed } from 'vue'

const status = ref('')
const AuthStore = useAuthStore()
const DienThoaiStore = useDienThoaiStore()
const contactStore = useLienHeStore()
let TenNguoiGui = ref('')
let Email = ref('')
let SoDienThoai = ref('')
let TinNhan = ref('')

DienThoaiStore.getDienThoai()
const filteredProducts = computed(() => {
    let products = DienThoaiStore.DienThoai
    products = products.filter((product) => product.PK_MaDienThoai < 7)
    return products
})

watchEffect(() => {
    status.value = contactStore.status
    status.value = AuthStore.status
})
</script>
<template>
    <div v-if="status" class="alert alert-success" role="alert">{{ status }}</div>
    <section class="slider_section">
        <div id="myCarousel" class="carousel slide banner-main" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="first-slide" src="../../../public/images/banner.jpg" alt="First slide" />
                    <div class="container">
                        <div class="carousel-caption relative">
                            <span>All New Phones </span>
                            <h1>up to 25% Flat Sale</h1>
                            <a class="buynow" href="/danh-muc-san-pham">Buy Now</a>
                            <ul class="social_icon">
                                <li>
                                    <a href="https://www.facebook.com" target="_blank"
                                        ><i class="fa fa-facebook-f"></i
                                    ></a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com" target="_blank"><i class="fa fa-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com" target="_blank"
                                        ><i class="fa fa-instagram"></i
                                    ></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <img class="second-slide" src="../../../public/images/banner1.png" alt="Second slide" />
                    <div class="container">
                        <div class="carousel-caption relative">
                            <span>All New Phones </span>
                            <h1>up to 25% Flat Sale</h1>
                            <a class="buynow" href="/danh-muc-san-pham">Buy Now</a>
                            <ul class="social_icon">
                                <li>
                                    <a href="https://www.facebook.com" target="_blank"
                                        ><i class="fa fa-facebook-f"></i
                                    ></a>
                                </li>
                                <li>
                                    <a href="https://www.twitter.com" target="_blank"><i class="fa fa-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com" target="_blank"
                                        ><i class="fa fa-instagram"></i
                                    ></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                <i class="fa fa-angle-left"></i>
            </a>
            <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                <i class="fa fa-angle-right"></i>
            </a>
        </div>
    </section>
    <!-- about -->
    <div class="about">
        <div class="container">
            <div class="row">
                <div class="col-xl-5 col-lg-5 col-md-5 co-sm-l2">
                    <div class="about_img">
                        <figure>
                            <img src="../../../public/images/about.png" alt="img" />
                        </figure>
                    </div>
                </div>
                <div class="col-xl-7 col-lg-7 col-md-7 co-sm-l2">
                    <div class="about_box">
                        <h3>About Us</h3>
                        <span>Giới thiệu về Thành Đạt mobile</span>
                        <p>
                            Đến với thị trường điện thoại di động Thành Đạt Mobile luôn cạnh tranh bằng sự uy tín với
                            sản phẩm mới, giá hấp dẫn, nhiều ưu đãi dành cho khách hàng của mình.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end about -->
    <!-- brand -->
    <div class="brand">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Sản phẩm nổi bật</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="brand-bg">
            <ProductsGrid :products="filteredProducts" />
            <div class="col-md-12">
                <RouterLink class="read-more" to="/danh-muc-san-pham">See More</RouterLink>
            </div>
        </div>
    </div>
    <!-- end brand -->
    <!-- clients -->
    <div class="clients">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Phản hồi từ khách hàng</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clients_red">
        <div class="container">
            <div id="testimonial_slider" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ul class="carousel-indicators">
                    <li data-target="#testimonial_slider" data-slide-to="0" class=""></li>
                    <li data-target="#testimonial_slider" data-slide-to="1" class="active"></li>
                    <li data-target="#testimonial_slider" data-slide-to="2" class=""></li>
                </ul>
                <!-- The slideshow -->
                <div class="carousel-inner">
                    <div class="carousel-item">
                        <div class="testomonial_section">
                            <div class="full center"></div>
                            <div class="full testimonial_cont text_align_center cross_layout">
                                <div class="cross_inner">
                                    <h3>
                                        Team Flash<br /><strong class="ornage_color"
                                            >Đội tuyển huy chương vàng Sea Game 31 bộ môn Liên Minh Huyền Thoại Tốc
                                            Chiến</strong
                                        >
                                    </h3>
                                    <p>
                                        Bí quyết giành Huy chương Vàng SEA Games 31 sao? Nó đã nằm ngay ở cái tên của
                                        chúng tôi rồi! Tốc độ và sự chính xác sẽ là mấu chốt của chiến thắng! Team Flash
                                        tin tưởng Thành Đạt Mobile là nơi mua sắm các sản phẩm công nghệ chính hãng, giá
                                        tốt hàng đầu, với cấu hình siêu khủng để cân mọi kèo thi đấu.
                                    </p>
                                    <div class="full text_align_center margin_top_30">
                                        <img src="../../assets/icon/testimonial_qoute.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item active">
                        <div class="testomonial_section">
                            <div class="full center"></div>
                            <div class="full testimonial_cont text_align_center cross_layout">
                                <div class="cross_inner">
                                    <h3>Ngô Lan Hương<br /><strong class="ornage_color">Ca sĩ</strong></h3>
                                    <p>
                                        Với lịch trình ca hát bận rộn, Ngô Lan Hương luôn cần chiếc smartphone đồng hành
                                        bên mình. Địa chỉ mua điện thoại chính hãng uy tín mà Hương lựa chọn luôn là
                                        Thành Đạt Mobile. Khi đến đây, từ giá cả, chất lượng và thái độ phục vụ luôn
                                        khiến mình hài lòng.
                                    </p>
                                    <div class="full text_align_center margin_top_30">
                                        <img src="../../assets/icon/testimonial_qoute.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="carousel-item">
                        <div class="testomonial_section">
                            <div class="full center"></div>
                            <div class="full testimonial_cont text_align_center cross_layout">
                                <div class="cross_inner">
                                    <h3>
                                        DV Huyền Lizzie<br /><strong class="ornage_color">Diễn viên truyền hình</strong>
                                    </h3>
                                    <p>
                                        Huyền rất hay ghé Thành Đạt Mobile mua các sản phẩm iPhone dù không hẳn là một
                                        tín đồ công nghệ. Về giá cả, chất lượng và độ uy tín thì Thành Đạt đều mang lại
                                        cho mình sự hài lòng.
                                    </p>
                                    <div class="full text_align_center margin_top_30">
                                        <img src="../../assets/icon/testimonial_qoute.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end clients -->
    <!-- contact -->
    <div class="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Gửi ý kiến phản hồi</h2>
                    </div>
                    <form
                        class="main_form"
                        @submit.prevent="contactStore.addContact(TenNguoiGui, Email, SoDienThoai, TinNhan)">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                <input
                                    class="form-control"
                                    placeholder="Nhập tên"
                                    type="text"
                                    v-model="TenNguoiGui"
                                    required />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                <input class="form-control" placeholder="Email" type="text" v-model="Email" required />
                            </div>
                            <div class="col-md-12">
                                <input
                                    class="form-control"
                                    placeholder="Số diện thoại"
                                    type="text"
                                    v-model="SoDienThoai"
                                    required />
                            </div>
                            <div class="col-md-12">
                                <textarea
                                    class="textarea"
                                    placeholder="Phản hồi..."
                                    v-model="TinNhan"
                                    required></textarea>
                            </div>
                            <div class="col-md-12">
                                <button class="send" type="submit">Gửi</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- end contact -->
</template>
