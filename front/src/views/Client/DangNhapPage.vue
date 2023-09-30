<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { RouterLink } from 'vue-router'

const store = useAuthStore()
let TenDangNhap = ref('')
let MatKhau = ref('')
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
            <div v-if="store.status" class="form-group">
                {{ store.status }}
            </div>
            <RouterLink to="/dang-ky" class="login-or-signin">Đăng ký</RouterLink>
            <RouterLink to="/quen-mat-khau" class="login-or-signin">Quên mật khẩu</RouterLink>
            <div :class="store.error ? 'scale-100' : ''" class="fixed scale-0 z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                    <!-- Overlay background -->
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
                    <!-- Modal content -->
                    <div
                        :class="store.error ? 'scale-100' : ''"
                        class="transform scale-0 transition-transform duration-300 relative z-10 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                        <!-- Icon -->
                        <div
                            class="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-500 bg-red-100 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        </div>
                        <!-- Message -->
                        <p class="text-lg font-medium text-gray-800">Invalid username or password!</p>
                        <!-- Button -->
                        <div class="mt-6">
                            <button
                                class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500">
                                <RouterLink
                                    @click=";(store.error = !store.error), (username = ''), (password = '')"
                                    to="/login"
                                    >Try again</RouterLink
                                >
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<style>
@import '../../assets/css/formDangKy.css';
</style>
