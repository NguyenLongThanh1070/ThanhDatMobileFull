<script setup>
import { defineProps, onMounted } from 'vue'

const props = defineProps({
    PK_MaDienThoai: String,
    TenDienThoai: String,
    HinhAnh: String,
    DonGia: Number,
})

onMounted(() => {
    const nodeList = document.querySelectorAll('.red')
    for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].innerHTML = numberWithCommas(nodeList[i].innerHTML)
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    }
})
</script>

<template>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 margin">
        <div class="brand_box">
            <router-link :to="`/san-pham/${props.PK_MaDienThoai}`">
                <img :src="require(`../assets/images/${props.HinhAnh}`)" alt="ảnh lỗi" />
                <h3>
                    <strong class="red">{{ props.DonGia }}</strong>
                </h3>
                <span>{{ props.TenDienThoai }}</span>
                <i><img src="../assets/images/star.png" /></i>
                <i><img src="../assets/images/star.png" /></i>
                <i><img src="../assets/images/star.png" /></i>
                <i><img src="../assets/images/star.png" /></i>
                <i><img src="../assets/images/star.png" /></i>
            </router-link>
        </div>
    </div>
</template>
