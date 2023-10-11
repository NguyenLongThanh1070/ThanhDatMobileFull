import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

export const useDanhGiaStore = defineStore('DanhGia', {
    state: () => ({
        DanhGia: ref([]),
    }),
    actions: {
        async getDanhGia() {
            try {
                const FK_MaDienThoai = route.params.PK_MaDienThoai
                const URL = `http://localhost:3000/api/v1/danhgia/${FK_MaDienThoai}`
                const result = await axios.get(URL)
                this.DanhGia = await result.data
            } catch (error) {
                console.log(error)
            }
        },
        async addDanhGia(TenKhachHang, NoiDungDanhGia, FK_MaDienThoai) {
            try {
                const URL = 'http://localhost:3000/api/v1/danhgia/'
                await axios.post(URL, {
                    TenKhachHang: TenKhachHang,
                    NoiDungDanhGia: NoiDungDanhGia,
                    FK_MaDienThoai: FK_MaDienThoai,
                })
                await this.getDanhGia(FK_MaDienThoai)
            } catch (error) {
                console.log(error)
            }
        },
    },
})
