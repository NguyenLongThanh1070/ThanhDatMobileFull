import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'

export const useLienHeStore = defineStore('LienHe', {
    state: () => ({
        loading: false,
        status: ref(''),
        LienHe: ref([]),
    }),
    actions: {
        async addLienHe(TenNguoiGui, Email, SoDienThoai, TinNhan) {
            this.status = ''
            try {
                const URL = 'http://localhost:3000/api/v1/lienhe'
                await axios.post(URL, {
                    TenNguoiGui: TenNguoiGui,
                    Email: Email,
                    SoDienThoai: SoDienThoai,
                    TinNhan: TinNhan,
                })
                this.status = 'Cảm ơn đã đóng góp ý kiến cho Thành Đạt Mobile'
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        },
        async getLienHe() {
            try {
                const URL = 'http://localhost:3000/api/v1/lienhe'
                this.loading = true
                const result = await axios.get(URL)
                this.LienHe = await result.data
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async updateLienHe(PK_MaLienHe, TenNguoiGui, Email, SoDienThoai, TinNhan) {
            try {
                const URL = `http://localhost:3000/api/v1/lienhe/${PK_MaLienHe}`
                await axios.put(URL, {
                    TenNguoiGui: TenNguoiGui,
                    Email: Email,
                    SoDienThoai: SoDienThoai,
                    TinNhan: TinNhan,
                })
                this.getLienHe()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteLienHe(deleteLienHe) {
            for (const PK_MaLienHe of deleteLienHe) {
                try {
                    const URL = `http://localhost:3000/api/v1/lienhe/${PK_MaLienHe}`
                    await axios.delete(URL)
                } catch (error) {
                    console.log(error)
                }
            }
            this.getLienHe()
        },
    },
})
