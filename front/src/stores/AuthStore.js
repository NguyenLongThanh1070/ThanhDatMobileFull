import { defineStore } from 'pinia'
import router from '../router/index'
import axios from 'axios'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        status: ref(''),
        error: false,
        message: ref(''),
        token: '',
        user: {
            username: '',
            role: '',
        },
    }),
    persist: {
        paths: ['token', 'user.username', 'user.role'],
    },
    actions: {
        async login(TenDangNhap, MatKhau) {
            const URL = 'http://localhost:3000/api/v1/auth/login'
            try {
                const res = await axios.post(URL, {
                    TenDangNhap: TenDangNhap,
                    MatKhau: MatKhau,
                })
                const { message, username, role } = res.data
                this.token = message
                this.user.username = username
                this.user.role = role
                localStorage.setItem('token', this.token)
                router.push('/')
            } catch (err) {
                this.status = 'Đăng nhập thất bại'
                this.error = true
            }
        },
        async register(TenKhachHang, DiaChi, SoDienThoai, Email, TenDangNhap, MatKhau) {
            const URL = 'http://localhost:3000/api/v1/auth/register'
            try {
                const res = await axios.post(URL, {
                    TenKhachHang: TenKhachHang,
                    DiaChi: DiaChi,
                    SoDienThoai: SoDienThoai,
                    Email: Email,
                    TenDangNhap: TenDangNhap,
                    MatKhau: MatKhau,
                })
                console.log(res)
                router.push('/')
            } catch (err) {
                this.error = true
                this.message = err.response.data.message
            }
        },
        async logout() {
            await router.push('/login')
            localStorage.removeItem('auth')
            localStorage.removeItem('token')
        },
    },
})
