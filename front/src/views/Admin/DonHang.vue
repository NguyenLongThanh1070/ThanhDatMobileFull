<script setup>
import { useDonHangStore } from '@/stores/DonHangStore'
import { ref, watchEffect } from 'vue'
import moment from 'moment'
const store = useDonHangStore()
store.getDonHang()

let status = ref('')
let selectDonHang = ref([])
watchEffect(() => {
    status.value = store.status
})
</script>

<template>
    <div v-if="status" class="alert alert-success" role="alert">{{ status }}</div>
    <h1 v-if="store.loading">Loading...</h1>
    <div v-else class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Đơn hàng</h2>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Tên người nhận</th>
                        <th>Địa chỉ giao hàng</th>
                        <th>Số điện thoại</th>
                        <th>Ghi chú</th>
                        <th>Thời gian tạo đơn hàng</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>Chi tiết đơn hàng</th>
                        <th>CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(DonHang, id) in store.DonHang" :key="id">
                        <td>{{ DonHang.TenNguoiNhan }}</td>
                        <td>{{ DonHang.DiaChiGiaoHang }}</td>
                        <td>{{ DonHang.SoDienThoai }}</td>
                        <td>{{ DonHang.GhiChu }}</td>
                        <td>{{ moment(DonHang.ThoiGianTaoDonHang).format('DD-MM-YYYY') }}</td>
                        <td>{{ DonHang.TrangThai }}</td>
                        <td>
                            <a
                                href="#chiTietDonHang"
                                class="edit"
                                data-toggle="modal"
                                @click="store.getChiTietDonHang(DonHang.PK_MaDonHang)"
                                ><i class="fa-solid fa-circle-info" data-toggle="tooltip" title="Edit"></i>
                            </a>
                        </td>
                        <td>
                            <a
                                href="#editEmployeeModal"
                                class="edit"
                                data-toggle="modal"
                                @click="selectDonHang = { ...DonHang }"
                                ><i
                                    class="material-icons fa-solid fa-pen-to-square"
                                    data-toggle="tooltip"
                                    title="Edit"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Infomation Modal HTML -->
    <div id="chiTietDonHang" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="table-wrapper">
                    <div class="table-title">
                        <div class="row">
                            <div class="col-sm-6">
                                <h2>Chi tiết đơn hàng</h2>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Mã điện thoại</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ChiTietDonHang, id) in store.ChiTietDonHang" :key="id">
                                <td>{{ ChiTietDonHang.FK_MaDienThoai }}</td>
                                <td>{{ ChiTietDonHang.SoLuong }}</td>
                                <td>{{ ChiTietDonHang.DonGia }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- Edit Modal HTML -->
    <div id="editEmployeeModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <form
                    @submit.prevent="
                        store.updateDonHang(
                            selectDonHang.PK_MaDonHang,
                            selectDonHang.TenNguoiNhan,
                            selectDonHang.DiaChiGiaoHang,
                            selectDonHang.SoDienThoai,
                            selectDonHang.GhiChu,
                            selectDonHang.TrangThai
                        )
                    ">
                    <div class="modal-header">
                        <h4 class="modal-title">Chỉnh sửa đơn hàng</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group" style="display: none">
                            <input type="text" class="form-control" v-model="selectDonHang.PK_MaDonHang" />
                        </div>
                        <div class="form-group">
                            <label>Tên người nhận</label>
                            <input type="text" class="form-control" v-model="selectDonHang.TenNguoiNhan" required />
                        </div>
                        <div class="form-group">
                            <label>Địa chỉ giao hàng</label>
                            <input type="text" class="form-control" v-model="selectDonHang.DiaChiGiaoHang" required />
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" class="form-control" v-model="selectDonHang.SoDienThoai" required />
                        </div>
                        <div class="form-group">
                            <label>Ghi chú</label>
                            <textarea
                                type="text"
                                class="form-control"
                                v-model="selectDonHang.GhiChu"
                                required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Thòi gian tạo đơn hàng</label>
                            <input
                                class="form-control"
                                disabled
                                :value="moment(selectDonHang.ThoiGianTaoDonHang).format('DD-MM-YYYY')" />
                        </div>
                        <div class="form-group">
                            <label>Trạng thái đơn hàng</label>
                            <input type="text" class="form-control" v-model="selectDonHang.TrangThai" required />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                        <input type="submit" class="btn btn-info" value="Save" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../../assets/css/admin.css';
</style>
