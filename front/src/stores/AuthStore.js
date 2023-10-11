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
                const { token, username, role, message } = res.data
                this.status = message
                this.token = token
                this.user.username = username
                this.user.role = role
                localStorage.setItem('token', this.token)
                localStorage.setItem('user.username', this.user.username)
                localStorage.setItem('user.role', this.user.role)
                if (this.user.role === 'KhachHang') {
                    await router.push('/')
                } else {
                    await router.push('/admin-dashboard')
                }
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
                await router.push('/dang-nhap')
                this.status = res.data.msg
            } catch (err) {
                this.error = true
                this.message = err.response.data.message
            }
        },
        async retrieval(Email) {
            const URL = 'http://localhost:3000/api/v1/auth/forgot-password'
            if (Email) {
                try {
                    const res = await axios.post(URL, {
                        Email: Email,
                    })
                    this.email = Email
                    this.status = res.data.msg
                } catch (err) {
                    this.error = true
                    this.message = err.response.data.message
                }
            } else {
                this.status = 'Hãy nhập email'
            }
        },
        async resetPassword(Email, MatKhau) {
            const URL = 'http://localhost:3000/api/v1/auth/reset-password'
            try {
                const res = await axios.post(URL, {
                    Email: Email,
                    MatKhau: MatKhau,
                })
                this.status = res.data.msg
            } catch (error) {
                console.log(error)
            }
        },
        async logout() {
            await router.push('/dang-nhap')
            this.token = ''
            this.user.username = ''
            localStorage.removeItem('auth')
            localStorage.removeItem('token')
        },
    },
})
