import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useKhachHangStore = defineStore('KhachHang', {
    state: () => ({
        loading: false,
        KhachHang: ref([]),
    }),
    actions: {
        async addKhachHang(
            TenKhachHang,
            DiaChi,
            SoDienThoai,
            Email,
            TenDangNhap,
            MatKhau,
            IsVerified,
            TinhTrangHoatDong
        ) {
            try {
                const URL = 'http://localhost:3000/api/v1/khachhang'
                await axios.post(URL, {
                    TenKhachHang: TenKhachHang,
                    DiaChi: DiaChi,
                    SoDienThoai: SoDienThoai,
                    Email: Email,
                    TenDangNhap: TenDangNhap,
                    MatKhau: MatKhau,
                    IsVerified: IsVerified,
                    TinhTrangHoatDong: TinhTrangHoatDong,
                })
                this.getKhachHang()
            } catch (error) {
                console.log(error)
            }
        },
        async getKhachHang() {
            try {
                const URL = 'http://localhost:3000/api/v1/khachhang'
                this.loading = true
                const result = await axios.get(URL)
                this.KhachHang = await result.data
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async updateKhachHang(
            PK_MaKhachHang,
            TenKhachHang,
            DiaChi,
            SoDienThoai,
            Email,
            TenDangNhap,
            MatKhau,
            IsVerified,
            TinhTrangHoatDong
        ) {
            try {
                const URL = `http://localhost:3000/api/v1/khachhang/${PK_MaKhachHang}`
                await axios.put(URL, {
                    TenKhachHang: TenKhachHang,
                    DiaChi: DiaChi,
                    SoDienThoai: SoDienThoai,
                    Email: Email,
                    TenDangNhap: TenDangNhap,
                    MatKhau: MatKhau,
                    IsVerified: IsVerified,
                    TinhTrangHoatDong: TinhTrangHoatDong,
                })
                this.getKhachHang()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteKhachHang(deleteKhachHang) {
            if (typeof deleteKhachHang === 'object') {
                try {
                    const URL = `http://localhost:3000/api/v1/khachhang/${deleteKhachHang.PK_MaKhachHang}`
                    await axios.delete(URL)
                } catch (error) {
                    console.log(error)
                }
            } else {
                for (const PK_MaKhachHang of deleteKhachHang) {
                    try {
                        const URL = `http://localhost:3000/api/v1/khachhang/${PK_MaKhachHang}`
                        await axios.delete(URL)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            this.getKhachHang()
        },
    },
})
