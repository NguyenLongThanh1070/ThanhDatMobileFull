<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { RouterLink } from 'vue-router'

const store = useAuthStore()
let TenKhachHang = ref('')
let DiaChi = ref('')
let SoDienThoai = ref('')
let Email = ref('')
let TenDangNhap = ref('')
let MatKhau = ref('')
let XacNhanMatKhau = ref('')
let matchPassword = ref(false)
let status = ref('')

const checkMatchPassword = () => {
    matchPassword.value = MatKhau.value === XacNhanMatKhau.value
}

checkMatchPassword()

watch([MatKhau, XacNhanMatKhau], () => {
    checkMatchPassword()
})
watchEffect(() => {
    status.value = store.status
})
</script>

<template>
    <div class="login">
        <form @submit.prevent="store.register(TenKhachHang, DiaChi, SoDienThoai, Email, TenDangNhap, MatKhau)">
            <h2>Đăng ký</h2>
            <div class="form-group">
                <input class="form-control" type="text" v-model="TenKhachHang" placeholder="Nhập họ tên" required />
            </div>
            <div class="form-group">
                <input class="form-control" type="text" v-model="DiaChi" placeholder="Nhập địa chỉ" required />
            </div>
            <div class="form-group">
                <input
                    class="form-control"
                    type="text"
                    v-model="SoDienThoai"
                    placeholder="Nhập số diện thoại"
                    required />
            </div>
            <div class="form-group">
                <input class="form-control" type="email" v-model="Email" placeholder="Nhập email" required />
            </div>
            <div class="form-group">
                <input
                    class="form-control"
                    type="text"
                    v-model="TenDangNhap"
                    placeholder="Nhập tên đăng nhập"
                    required />
            </div>
            <div class="form-group">
                <input class="form-control" type="password" v-model="MatKhau" placeholder="Nhập mật khẩu" required />
            </div>
            <div class="form-group">
                <input
                    class="form-control"
                    type="password"
                    v-model="XacNhanMatKhau"
                    placeholder="Xác nhận mật khẩu"
                    required />
            </div>
            <div v-if="!matchPassword" class="form-group">
                <p style="color: red">Mật khẩu và mật khẩu xác nhận không khớp!</p>
            </div>
            <div class="form-group" v-if="status">
                <h1>{{ status }}</h1>
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit">Đăng ký</button>
            </div>
            <RouterLink to="/dang-nhap" class="login-or-signin">Đăng nhập</RouterLink>
            <RouterLink to="/quen-mat-khau" class="login-or-signin">Quên mật khẩu</RouterLink>
        </form>
    </div>
</template>

<style scoped>
@import '../../assets/css/formDangKy.css';
</style>
