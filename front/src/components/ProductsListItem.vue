<script setup>
import { defineProps } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useGioHangStore } from '@/stores/GioHangStore'
import { useDienThoaiStore } from '@/stores/DienThoaiStore'

const DienThoaiStore = useDienThoaiStore()
const GioHangStore = useGioHangStore()
const AuthStore = useAuthStore()

const props = defineProps({
    PK_MaGioHang: Number,
    HinhAnh: String,
    TenDienThoai: String,
    SoLuong: Number,
    DonGia: Number,
})
</script>

<template>
    <div class="row justify-content-center mb-3">
        <div class="col-md-12 col-xl-10">
            <div class="card shadow-0 border rounded-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                            <div class="bg-image hover-zoom ripple rounded ripple-surface">
                                <img
                                    :src="DienThoaiStore.AnhDienThoai.filter((Anh) => Anh.includes(props.HinhAnh))"
                                    class="w-100" />
                                <div class="hover-overlay">
                                    <div class="mask" style="background-color: rgba(253, 253, 253, 0.15)"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-6">
                            <h5>{{ props.TenDienThoai }}</h5>
                            <div class="d-flex flex-row">
                                <span>Số lượng: {{ props.SoLuong }}</span>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                            <div class="d-flex flex-row align-items-center mb-1">
                                <h4 class="mb-1 me-1">{{ props.DonGia }}</h4>
                                đồng
                            </div>
                            <h6 class="text-success">Free shipping</h6>
                            <form
                                @submit.prevent="
                                    GioHangStore.removeFromGioHang(props.PK_MaGioHang, AuthStore.user.username)
                                ">
                                <div class="d-flex flex-column mt-4">
                                    <button class="btn btn-primary btn-sm" type="submit">
                                        <i class="fa fa-trash-o text-black-50"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
