import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'

export const useDonHangStore = defineStore('DonHang', {
    state: () => ({
        loading: false,
        DonHang: ref([]),
    }),
    actions: {
        async addDonHang(TenNguoiGui, Email, SoDienThoai, TinNhan) {
            try {
                const URL = 'http://localhost:3000/api/v1/donhang'
                await axios.post(URL, {
                    TenNguoiGui: TenNguoiGui,
                    Email: Email,
                    SoDienThoai: SoDienThoai,
                    TinNhan: TinNhan,
                })
            } catch (error) {
                console.log(error)
            }
        },
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
        async updateDonHang(PK_MaLienHe, TenNguoiGui, Email, SoDienThoai, TinNhan) {
            try {
                const URL = `http://localhost:3000/api/v1/DonHang/${PK_MaLienHe}`
                await axios.put(URL, {
                    TenNguoiGui: TenNguoiGui,
                    Email: Email,
                    SoDienThoai: SoDienThoai,
                    TinNhan: TinNhan,
                })
                this.getDonHang()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteDonHang(deleteDonHang) {
            for (const PK_MaLienHe of deleteDonHang) {
                try {
                    const URL = `http://localhost:3000/api/v1/DonHang/${PK_MaLienHe}`
                    await axios.delete(URL)
                } catch (error) {
                    console.log(error)
                }
            }
            this.getDonHang()
        },
    },
})
