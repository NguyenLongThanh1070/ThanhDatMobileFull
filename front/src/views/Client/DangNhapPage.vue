<script setup>
import { ref, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { RouterLink } from 'vue-router'

const store = useAuthStore()
let TenDangNhap = ref('')
let MatKhau = ref('')
let status = ref('')

watchEffect(() => {
    status.value = store.status
})
</script>

<template>
    <div class="login">
        <form @submit.prevent="store.login(TenDangNhap, MatKhau)">
            <h2>Đăng nhập</h2>
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
                <button class="btn btn-primary btn-block" type="submit">Đăng nhập</button>
            </div>
            <div v-if="status" class="form-group">
                {{ store.status }}
            </div>
            <RouterLink to="/dang-ky" class="login-or-signin">Đăng ký</RouterLink>
            <RouterLink to="/quen-mat-khau" class="login-or-signin">Quên mật khẩu</RouterLink>
        </form>
    </div>
</template>
<style>
@import '../../assets/css/formDangKy.css';
</style>
