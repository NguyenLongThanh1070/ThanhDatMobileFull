import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useDienThoaiStore = defineStore('DienThoai', {
    state: () => ({
        loading: false,
        DienThoai: ref([]),
    }),
    actions: {
        async getDienThoai() {
            try {
                const URL = 'http://localhost:3000/api/v1/dienthoai'
                this.loading = true
                const result = await axios.get(URL)
                this.DienThoai = await result.data
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async deleteDienThoai(deleteDienThoai) {
            if (typeof deleteDienThoai === 'object') {
                try {
                    const URL = `http://localhost:3000/api/v1/DienThoai/${deleteDienThoai.PK_MaDienThoai}`
                    await axios.delete(URL)
                } catch (error) {
                    console.log(error)
                }
            } else {
                for (const PK_MaDienThoai of deleteDienThoai) {
                    try {
                        const URL = `http://localhost:3000/api/v1/DienThoai/${PK_MaDienThoai}`
                        await axios.delete(URL)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            this.getDienThoai()
        },
    },
})
