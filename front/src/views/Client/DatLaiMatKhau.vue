<script setup>
import { ref, watch, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { RouterLink } from 'vue-router'

let Email = ref('')
let MatKhau = ref('')
let XacNhanMatKhau = ref('')
let matchPassword = ref(false)
let status = ref('')
const store = useAuthStore()
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
        <form @submit.prevent="store.resetPassword(Email, MatKhau)">
            <h2>Đặt lại mật khẩu</h2>
            <div class="form-group">
                <input class="form-control" type="email" v-model="Email" placeholder="Nhập email" required />
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
                <button class="btn btn-primary btn-block" type="submit">Đặt lại mật khẩu</button>
            </div>
            <RouterLink to="/dang-nhap" class="login-or-signin">Đăng nhập</RouterLink>
            <RouterLink to="/dang-ky" class="login-or-signin">Đăng ký</RouterLink>
        </form>
    </div>
</template>

<style>
@import '../../assets/css/formDangKy.css';
</style>
