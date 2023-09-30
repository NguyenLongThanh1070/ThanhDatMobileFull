<script setup></script>
<template>
    <header>
        <!-- header inner -->
        <div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                        <div class="full">
                            <div class="center-desk">
                                <div class="logo">
                                    <router-link to="/"
                                        ><img src="../../public/images/logo.png" alt="Logo"
                                    /></router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                        <div class="menu-area">
                            <div class="limit-box">
                                <nav class="main-menu">
                                    <ul class="menu-area-main">
                                        <li class="active">
                                            <router-link to="/">Trang chủ</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/danh-muc-san-pham">Sản phẩm</router-link>
                                        </li>
                                        <li>
                                            <router-link to="/lien-he">Liên hệ</router-link>
                                        </li>
                                        <li v-if="username">
                                            <a href="/dangxuat">{{ username }}, đăng xuất</a>
                                        </li>
                                        <li v-if="username">
                                            <router-link to="/gio-hang"
                                                ><i class="fa-solid fa-cart-shopping"></i
                                            ></router-link>
                                        </li>
                                        <li v-if="!username">
                                            <router-link to="/dang-ky">Đăng ký</router-link>
                                        </li>
                                        <li v-if="!username">
                                            <router-link to="/dang-nhap"
                                                ><i class="fa-solid fa-cart-shopping"></i
                                            ></router-link>
                                        </li>
                                        <li class="last">
                                            <form action="/tim-kiem" method="get">
                                                <div class="input-group rounded">
                                                    <input
                                                        type="search"
                                                        class="form-control rounded"
                                                        placeholder="Search"
                                                        aria-label="Search"
                                                        aria-describedby="search-addon"
                                                        name="search" />
                                                    <button type="submit" class="btn btn-primary">
                                                        <i class="fas fa-search"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 offset-md-6">
                        <div class="location_icon_bottum">
                            <ul>
                                <li><img src="../../public/icon/call.png" />037869xxxx</li>
                                <li><img src="../../public/icon/email.png" />nguyenlongthanhIT@gmail.com</li>
                                <li><img src="../../public/icon/loc.png" />Ha Noi</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end header inner -->
    </header>
</template>
