import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', {
    state: {
        cart: ref([]),
    },
    actions: {
        async getCart() {
            const result = await axios.get('http://localhost:3000/api/v1/cart/get-cart', {
                params: { TenDangNhap: true },
            })
            this.cart = await result.data
        },
        async addCart(HinhAnh, TenDienThoai, SoLuong, DonGia, TenDangNhap, PK_MaDienThoai) {
            const URL = 'http://localhost:3000/api/v1/cart'
            const response = await axios.post(URL, {
                HinhAnh: HinhAnh,
                TenDienThoai: TenDienThoai,
                SoLuong: SoLuong,
                DonGia: DonGia,
                TenDangNhap: TenDangNhap,
                FK_MaDienThoai: PK_MaDienThoai,
            })
            console.log(response)
        },
        async removeFromCart(PK_MaDienThoai) {
            const URL = 'http://localhost:3000/api/v1/cart'
            const response = await axios.delete(URL, {
                PK_MaDienThoai: PK_MaDienThoai,
            })
            console.log(response)
        },
    },
})
