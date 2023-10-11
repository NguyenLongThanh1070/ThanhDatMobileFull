import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useNhanVienStore = defineStore('NhanVien', {
    state: () => ({
        loading: false,
        NhanVien: ref([]),
    }),
    actions: {
        async addNhanVien(
            TenNhanVien,
            DiaChi,
            SoDienThoai,
            Email,
            TenDangNhap,
            MatKhau,
            NgaySinh,
            NgayVaoLam,
            LuongCoBan,
            PhuCap,
            Quyen
        ) {
            try {
                const URL = 'http://localhost:3000/api/v1/nhanvien'
                await axios.post(URL, {
                    TenNhanVien: TenNhanVien,
                    DiaChi: DiaChi,
                    SoDienThoai: SoDienThoai,
                    Email: Email,
                    TenDangNhap: TenDangNhap,
                    MatKhau: MatKhau,
                    NgaySinh: NgaySinh,
                    NgayVaoLam: NgayVaoLam,
                    LuongCoBan: LuongCoBan,
                    PhuCap: PhuCap,
                    Quyen: Quyen,
                })
                this.getNhanVien()
            } catch (error) {
                console.log(error)
            }
        },
        async getNhanVien() {
            try {
                const URL = 'http://localhost:3000/api/v1/nhanvien'
                this.loading = true
                const result = await axios.get(URL)
                this.NhanVien = await result.data
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async updateNhanVien(
            PK_MaNhanVien,
            TenNhanVien,
            DiaChi,
            SoDienThoai,
            Email,
            TenDangNhap,
            MatKhau,
            NgaySinh,
            NgayVaoLam,
            LuongCoBan,
            PhuCap,
            Quyen
        ) {
            try {
                const URL = `http://localhost:3000/api/v1/nhanvien/${PK_MaNhanVien}`
                await axios.put(URL, {
                    TenNhanVien: TenNhanVien,
                    DiaChi: DiaChi,
                    SoDienThoai: SoDienThoai,
                    Email: Email,
                    TenDangNhap: TenDangNhap,
                    MatKhau: MatKhau,
                    NgaySinh: NgaySinh,
                    NgayVaoLam: NgayVaoLam,
                    LuongCoBan: LuongCoBan,
                    PhuCap: PhuCap,
                    Quyen: Quyen,
                })
                this.getNhanVien()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteNhanVien(deleteNhanVien) {
            if (typeof deleteNhanVien === 'object') {
                try {
                    const URL = `http://localhost:3000/api/v1/nhanvien/${deleteNhanVien.PK_MaNhanVien}`
                    await axios.delete(URL)
                } catch (error) {
                    console.log(error)
                }
            } else {
                for (const PK_MaNhanVien of deleteNhanVien) {
                    try {
                        const URL = `http://localhost:3000/api/v1/nhanvien/${PK_MaNhanVien}`
                        await axios.delete(URL)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            this.getNhanVien()
        },
    },
})
