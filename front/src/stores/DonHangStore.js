import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useDonHangStore = defineStore('DonHang', {
    state: () => ({
        loading: false,
        DonHang: ref([]),
        ChiTietDonHang: ref([]),
    }),
    actions: {
        async getDonHang() {
            try {
                const URL = 'http://localhost:3000/api/v1/donhang'
                this.loading = true
                const result = await axios.get(URL)
                this.DonHang = await result.data
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async getChiTietDonHang(PK_MaDonHang) {
            try {
                const URL = `http://localhost:3000/api/v1/donhang/${PK_MaDonHang}`
                const result = await axios.get(URL)
                this.ChiTietDonHang = await result.data
            } catch (error) {
                console.log(error)
            }
        },
        async updateDonHang(PK_MaDonHang, TenNguoiNhan, DiaChiGiaoHang, SoDienThoai, GhiChu, TrangThai) {
            try {
                const URL = `http://localhost:3000/api/v1/donHang/${PK_MaDonHang}`
                await axios.put(URL, {
                    TenNguoiNhan: TenNguoiNhan,
                    DiaChiGiaoHang: DiaChiGiaoHang,
                    SoDienThoai: SoDienThoai,
                    GhiChu: GhiChu,
                    TrangThai: TrangThai,
                })
                this.getDonHang()
            } catch (error) {
                console.log(error)
            }
        },
    },
})
