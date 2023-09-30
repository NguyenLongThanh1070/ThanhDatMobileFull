import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'

export const useLienHeStore = defineStore('contact', {
    state: () => ({
        loading: false,
        status: ref(''),
        contacts: ref([]),
    }),
    actions: {
        async addContact(TenNguoiGui, Email, SoDienThoai, TinNhan) {
            this.status = ''
            try {
                const URL = 'http://localhost:3000/api/v1/contact'
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
        async getContact() {
            try {
                const URL = 'http://localhost:3000/api/v1/contact'
                this.loading = true
                const result = await axios.get(URL)
                this.contacts = await result.data
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async updateContact(PK_MaLienHe, TenNguoiGui, Email, SoDienThoai, TinNhan) {
            try {
                const URL = `http://localhost:3000/api/v1/contact/${PK_MaLienHe}`
                await axios.put(URL, {
                    TenNguoiGui: TenNguoiGui,
                    Email: Email,
                    SoDienThoai: SoDienThoai,
                    TinNhan: TinNhan,
                })
                this.getContact()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteContact(deleteContacts) {
            for (const PK_MaLienHe of deleteContacts) {
                try {
                    const URL = `http://localhost:3000/api/v1/contact/${PK_MaLienHe}`
                    await axios.delete(URL)
                } catch (error) {
                    console.log(error)
                }
            }
            this.getContact()
        },
    },
})
