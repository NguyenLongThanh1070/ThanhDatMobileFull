<script setup>
import { ref, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { RouterLink } from 'vue-router'
let Email = ref('')
let status = ref('')
const store = useAuthStore()

watchEffect(() => {
    status.value = store.status
})
</script>
<template>
    <div class="login">
        <form @submit.prevent="store.retrieval(Email)">
            <h2>Lấy lại mật khẩu</h2>
            <div class="form-group">
                <input class="form-control" type="email" v-model="Email" placeholder="Nhập email" required />
            </div>
            <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit">Lấy lại mật khẩu</button>
            </div>
            <div class="form-group">
                <h1>{{ status }}</h1>
            </div>
            <RouterLink to="/dang-nhap" class="login-or-signin">Đăng nhập</RouterLink>
            <RouterLink to="/dang-ky" class="login-or-signin">Đăng ký</RouterLink>
        </form>
    </div>
</template>

<style>
@import '../../assets/css/formDangKy.css';
</style>
