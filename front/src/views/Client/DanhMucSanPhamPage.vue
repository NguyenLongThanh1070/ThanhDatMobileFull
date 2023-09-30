<script setup>
import ProductsGrid from '@/components/ProductsGrid.vue'
import { useDienThoaiStore } from '@/stores/DienThoaiStore'
import { ref, computed } from 'vue'

const store = useDienThoaiStore()
const productsPerPage = 6
const currentPage = ref(1)

const totalProducts = computed(() => store.products.length)
const totalPages = computed(() => Math.ceil(totalProducts.value / productsPerPage))

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * productsPerPage
    const end = start + productsPerPage
    return store.products.slice(start, end)
})

function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
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
                        <!-- filter-group  .// -->
                        <article class="filter-group">
                            <header class="card-header">
                                <a
                                    href="#"
                                    data-toggle="collapse"
                                    data-target="#collapse_2"
                                    aria-expanded="true"
                                    class="">
                                    <i class="icon-control fa fa-chevron-down"></i>
                                    <h6 class="title">Hãng</h6>
                                </a>
                            </header>
                            <div class="filter-content collapse show" id="collapse_2">
                                <div class="card-body">
                                    <label class="custom-control custom-checkbox">
                                        <input type="checkbox" checked="" class="custom-control-input" />
                                        <div class="custom-control-label">
                                            Mercedes <b class="badge badge-pill badge-light float-right">120</b>
                                        </div>
                                    </label>
                                    <label class="custom-control custom-checkbox">
                                        <input type="checkbox" checked="" class="custom-control-input" />
                                        <div class="custom-control-label">
                                            Toyota <b class="badge badge-pill badge-light float-right">15</b>
                                        </div>
                                    </label>
                                    <label class="custom-control custom-checkbox">
                                        <input type="checkbox" checked="" class="custom-control-input" />
                                        <div class="custom-control-label">
                                            Mitsubishi <b class="badge badge-pill badge-light float-right">35</b>
                                        </div>
                                    </label>
                                    <label class="custom-control custom-checkbox">
                                        <input type="checkbox" checked="" class="custom-control-input" />
                                        <div class="custom-control-label">
                                            Nissan <b class="badge badge-pill badge-light float-right">89</b>
                                        </div>
                                    </label>
                                    <label class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" />
                                        <div class="custom-control-label">
                                            Honda <b class="badge badge-pill badge-light float-right">30</b>
                                        </div>
                                    </label>
                                </div>
                                <!-- card-body.// -->
                            </div>
                        </article>
                        <!-- filter-group .// -->
                        <article class="filter-group">
                            <header class="card-header">
                                <a
                                    href="#"
                                    data-toggle="collapse"
                                    data-target="#collapse_3"
                                    aria-expanded="true"
                                    class="">
                                    <i class="icon-control fa fa-chevron-down"></i>
                                    <h6 class="title">Price range</h6>
                                </a>
                            </header>
                            <div class="filter-content collapse show" id="collapse_3" style="">
                                <div class="card-body">
                                    <input type="range" class="custom-range" min="0" max="100" name="" />
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label>Min</label>
                                            <input class="form-control" placeholder="$0" type="number" />
                                        </div>
                                        <div class="form-group text-right col-md-6">
                                            <label>Max</label>
                                            <input class="form-control" placeholder="$1,0000" type="number" />
                                        </div>
                                    </div>
                                    <!-- form-row.// -->
                                    <button class="btn btn-block btn-primary">Apply</button>
                                </div>
                                <!-- card-body.// -->
                            </div>
                        </article>
                        <!-- filter-group .// -->
                        <article class="filter-group">
                            <header class="card-header">
                                <a
                                    href="#"
                                    data-toggle="collapse"
                                    data-target="#collapse_4"
                                    aria-expanded="true"
                                    class="">
                                    <i class="icon-control fa fa-chevron-down"></i>
                                    <h6 class="title">Sizes</h6>
                                </a>
                            </header>
                            <div class="filter-content collapse show" id="collapse_4" style="">
                                <div class="card-body">
                                    <label class="checkbox-btn">
                                        <input type="checkbox" />
                                        <span class="btn btn-light"> XS </span>
                                    </label>

                                    <label class="checkbox-btn">
                                        <input type="checkbox" />
                                        <span class="btn btn-light"> SM </span>
                                    </label>

                                    <label class="checkbox-btn">
                                        <input type="checkbox" />
                                        <span class="btn btn-light"> LG </span>
                                    </label>

                                    <label class="checkbox-btn">
                                        <input type="checkbox" />
                                        <span class="btn btn-light"> XXL </span>
                                    </label>
                                </div>
                                <!-- card-body.// -->
                            </div>
                        </article>
                        <!-- filter-group .// -->
                        <article class="filter-group">
                            <header class="card-header">
                                <a
                                    href="#"
                                    data-toggle="collapse"
                                    data-target="#collapse_5"
                                    aria-expanded="false"
                                    class="">
                                    <i class="icon-control fa fa-chevron-down"></i>
                                    <h6 class="title">More filter</h6>
                                </a>
                            </header>
                            <div class="filter-content collapse in" id="collapse_5" style="">
                                <div class="card-body">
                                    <label class="custom-control custom-radio">
                                        <input
                                            type="radio"
                                            name="myfilter_radio"
                                            checked=""
                                            class="custom-control-input" />
                                        <div class="custom-control-label">Any condition</div>
                                    </label>

                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" class="custom-control-input" />
                                        <div class="custom-control-label">Brand new</div>
                                    </label>

                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" class="custom-control-input" />
                                        <div class="custom-control-label">Used items</div>
                                    </label>

                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="myfilter_radio" class="custom-control-input" />
                                        <div class="custom-control-label">Very old</div>
                                    </label>
                                </div>
                                <!-- card-body.// -->
                            </div>
                        </article>
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
                        <li class="page-item">
                            <button class="page-link" @click="goToPage(1)" :disabled="currentPage === 1">1</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="goToPage(2)" :disabled="currentPage === 2">2</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="goToPage(3)" :disabled="currentPage === 3">3</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="goToPage(4)" :disabled="currentPage === 4">4</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="goToPage(5)" :disabled="currentPage === 5">5</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="goToPage(6)" :disabled="currentPage === 6">6</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link" @click="goToPage(7)" :disabled="currentPage === 7">7</button>
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
