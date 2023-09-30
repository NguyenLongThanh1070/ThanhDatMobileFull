<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { RouterLink } from 'vue-router'
let email = ref('')

const store = useAuthStore()
</script>
<template>
    <div class="login">
        <form @submit.prevent="store.retrieval(email)">
            <h2>Lấy lại mật khẩu</h2>
            <div class="form-group">
                <input class="form-control" type="email" name="email" placeholder="Nhập email" />
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit">Lấy lại mật khẩu</button>
            </div>
            <RouterLink to="/dang-nhap" class="login-or-signin">Đăng nhập</RouterLink>
            <RouterLink to="/dang-ky" class="login-or-signin">Đăng ký</RouterLink>
        </form>
    </div>
</template>

<style>
@import '../../assets/css/formDangKy.css';
</style>
