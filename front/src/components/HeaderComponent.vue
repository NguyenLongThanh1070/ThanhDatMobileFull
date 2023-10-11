<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { useDienThoaiStore } from '@/stores/DienThoaiStore'
import { ref } from 'vue'

const DienThoaiStore = useDienThoaiStore()
const store = useAuthStore()

let timkiem = ref('')
</script>
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
                                        <li>
                                            <router-link to="/danh-muc-san-pham">Sản phẩm</router-link>
                                        </li>
                                        <li>
                                            <form @submit.prevent="DienThoaiStore.timDienThoai(timkiem)">
                                                <div class="input-group rounded">
                                                    <input
                                                        type="search"
                                                        class="form-control rounded"
                                                        placeholder="Search"
                                                        aria-label="Search"
                                                        aria-describedby="search-addon"
                                                        v-model="timkiem" />
                                                    <button type="submit" class="btn btn-primary">
                                                        <i class="fas fa-search"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </li>
                                        <li v-if="store.user.username" @click="store.logout()">
                                            <a>{{ store.user.username }}, đăng xuất</a>
                                        </li>
                                        <li v-if="store.user.username">
                                            <router-link to="/gio-hang"
                                                ><i class="fa-solid fa-cart-shopping"></i
                                            ></router-link>
                                        </li>
                                        <li v-if="!store.user.username">
                                            <router-link to="/dang-ky">Đăng ký</router-link>
                                        </li>
                                        <li v-if="!store.user.username">
                                            <router-link to="/dang-nhap"
                                                ><i class="fa-solid fa-cart-shopping"></i
                                            ></router-link>
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

<style scoped>
a {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

a:hover {
    transform: scale(1.05);
}
</style>
