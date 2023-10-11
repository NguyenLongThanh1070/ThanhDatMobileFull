import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import router from '@/router'

export const useGioHangStore = defineStore('GioHang', {
    state: () => ({
        status: ref(''),
        GioHang: ref([]),
        message: ref(''),
    }),
    actions: {
        async getGioHang(TenDangNhap) {
            try {
                const result = await axios.get(`http://localhost:3000/api/v1/giohang/${TenDangNhap}`)
                this.GioHang = await result.data
            } catch (error) {
                console.log(error)
            }
        },
        async addGioHang(HinhAnh, TenDienThoai, SoLuong, DonGia, TenDangNhap, FK_MaDienThoai) {
            try {
                const URL = `http://localhost:3000/api/v1/giohang/${TenDangNhap}`
                const res = await axios.post(URL, {
                    HinhAnh: HinhAnh,
                    TenDienThoai: TenDienThoai,
                    SoLuong: SoLuong,
                    DonGia: DonGia,
                    TenDangNhap: TenDangNhap,
                    FK_MaDienThoai: FK_MaDienThoai,
                })
                this.message = res.data.message
            } catch (error) {
                console.log(error)
            }
        },
        async removeFromGioHang(PK_MaGioHang, TenDangNhap) {
            try {
                const URL = `http://localhost:3000/api/v1/giohang/${TenDangNhap}`
                const response = await axios.delete(URL, {
                    data: {
                        PK_MaGioHang: PK_MaGioHang,
                    },
                })
                this.GioHang = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async checkOut(TenNguoiNhan, DiaChi, SoDienThoai) {
            try {
                const URL = `http://localhost:3000/api/v1/thanhtoan`
                console.log(localStorage.getItem('token'))
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
                const res = await axios.post(
                    URL,
                    {
                        TenNguoiNhan: TenNguoiNhan,
                        DiaChi: DiaChi,
                        SoDienThoai: SoDienThoai,
                    },
                    config
                )
                this.status = res.data.msg
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        },
    },
})
