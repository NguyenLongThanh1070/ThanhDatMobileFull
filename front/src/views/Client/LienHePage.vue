<script setup>
import { ref } from 'vue'
import { useLienHeStore } from '@/stores/LienHeStore'

const store = useLienHeStore()
let TenNguoiGui = ref('')
let Email = ref('')
let SoDienThoai = ref('')
let TinNhan = ref('')
</script>
<template>
    <div class="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Gửi ý kiến phản hồi</h2>
                    </div>
                    <form
                        class="main_form"
                        @submit.prevent="store.addContact(TenNguoiGui, Email, SoDienThoai, TinNhan)">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                <input
                                    class="form-control"
                                    placeholder="Nhập tên"
                                    type="text"
                                    v-model="TenNguoiGui"
                                    required />
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                <input class="form-control" placeholder="Email" type="text" v-model="Email" required />
                            </div>
                            <div class="col-md-12">
                                <input
                                    class="form-control"
                                    placeholder="Số diện thoại"
                                    type="text"
                                    v-model="SoDienThoai"
                                    required />
                            </div>
                            <div class="col-md-12">
                                <textarea
                                    class="textarea"
                                    placeholder="Phản hồi..."
                                    v-model="TinNhan"
                                    required></textarea>
                            </div>
                            <div class="col-md-12">
                                <button class="send" type="submit">Gửi</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
