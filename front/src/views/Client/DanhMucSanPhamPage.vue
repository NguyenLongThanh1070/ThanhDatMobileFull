<script setup>
import ProductsGrid from '@/components/ProductsGrid.vue'
import { useDienThoaiStore } from '@/stores/DienThoaiStore'
import { ref, computed } from 'vue'

const store = useDienThoaiStore()
store.getDienThoai()
const productsPerPage = 6
const currentPage = ref(1)
const selectedBrands = ref([])
let min = ref(1000)
let max = ref(10000000)

//pagination
const totalProducts = computed(() => {
    if (store.TimDienThoai.length !== 0) {
        return store.TimDienThoai.length
    } else if (store.FilterDienThoai.length !== 0) {
        return store.FilterDienThoai.length
    } else {
        return store.DienThoai.length
    }
})

const totalPages = computed(() => Math.ceil(totalProducts.value / productsPerPage))

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

let paginatedProducts = computed(() => {
    if (store.TimDienThoai.length !== 0) {
        return store.TimDienThoai.slice(
            (currentPage.value - 1) * productsPerPage,
            (currentPage.value - 1) * productsPerPage + productsPerPage
        )
    } else if (store.FilterDienThoai.length !== 0) {
        return store.FilterDienThoai.slice(
            (currentPage.value - 1) * productsPerPage,
            (currentPage.value - 1) * productsPerPage + productsPerPage
        )
    } else {
        return store.DienThoai.slice(
            (currentPage.value - 1) * productsPerPage,
            (currentPage.value - 1) * productsPerPage + productsPerPage
        )
    }
})

const brands = computed(() => {
    return [...new Set(store.DienThoai.map((phone) => phone.ThuongHieu))]
})

const getBrandCount = (brand) => {
    return store.DienThoai.filter((phone) => phone.ThuongHieu === brand).length
}
</script>
<template>
    <div class="brand">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="titlepage">
                        <h2>Sản phẩm của chúng tôi</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="brand-bg">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                        <form @submit.prevent="store.filterDienThoai(selectedBrands, min, max)">
                            <!-- filter-group  .// -->
                            <article class="filter-group">
                                <header class="card-header">
                                    <a data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" class="">
                                        <i class="icon-control fa fa-chevron-down"></i>
                                        <h6 class="title">Hãng</h6>
                                    </a>
                                </header>
                                <div class="filter-content collapse show" id="collapse_2">
                                    <div class="card-body">
                                        <label
                                            class="custom-control custom-checkbox"
                                            v-for="(brand, id) in brands"
                                            :key="id">
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                v-model="selectedBrands"
                                                :value="brand" />
                                            <div class="custom-control-label">
                                                {{ brand }}
                                                <b class="badge badge-pill badge-light float-right">{{
                                                    getBrandCount(brand)
                                                }}</b>
                                            </div>
                                        </label>
                                    </div>
                                    <!-- card-body.// -->
                                </div>
                            </article>
                            <!-- filter-group .// -->
                            <article class="filter-group">
                                <header class="card-header">
                                    <a data-toggle="collapse" data-target="#collapse_3" aria-expanded="true">
                                        <i class="icon-control fa fa-chevron-down"></i>
                                        <h6 class="title">Khoảng giá</h6>
                                    </a>
                                </header>
                                <div class="filter-content collapse show" id="collapse_3">
                                    <div class="card-body">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Min</label>
                                                <input
                                                    class="form-control"
                                                    placeholder="0"
                                                    type="number"
                                                    v-model="min" />
                                            </div>
                                            <div class="form-group text-right col-md-6">
                                                <label>Max</label>
                                                <input
                                                    class="form-control"
                                                    placeholder="100,000,000"
                                                    type="number"
                                                    v-model="max" />
                                            </div>
                                        </div>
                                        <!-- form-row.// -->
                                        <button class="btn btn-block btn-primary" type="submit">Apply</button>
                                    </div>
                                    <!-- card-body.// -->
                                </div>
                            </article>
                        </form>

                        <!-- filter-group .// -->
                    </div>
                    <!-- card.// -->
                </div>
                <div class="col-md-9">
                    <ProductsGrid :products="paginatedProducts" />
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
                                Previous
                            </button>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page">
                            <button class="page-link" @click="goToPage(page)" :disabled="currentPage === page">
                                {{ page }}
                            </button>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <button
                                class="page-link"
                                @click="goToPage(currentPage + 1)"
                                :disabled="currentPage === totalPages">
                                Next
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.icon-control {
    margin-top: 5px;
    float: right;
    font-size: 80%;
}

.btn-light {
    background-color: #fff;
    border-color: #e4e4e4;
}

.list-menu {
    list-style: none;
    margin: 0;
    padding-left: 0;
}
.list-menu a {
    color: #343a40;
}

.card-product-grid .info-wrap {
    overflow: hidden;
    padding: 18px 20px;
}

[class*='card-product'] a.title {
    color: #212529;
    display: block;
}

.card-product-grid:hover .btn-overlay {
    opacity: 1;
}
.card-product-grid .btn-overlay {
    -webkit-transition: 0.5s;
    transition: 0.5s;
    opacity: 0;
    left: 0;
    bottom: 0;
    color: #fff;
    width: 100%;
    padding: 5px 0;
    text-align: center;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
}
.img-wrap {
    overflow: hidden;
    position: relative;
}
</style>
