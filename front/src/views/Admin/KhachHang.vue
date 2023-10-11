<script setup>
import { useKhachHangStore } from '@/stores/KhachHangStore'
import { ref, watchEffect } from 'vue'
const store = useKhachHangStore()
store.getKhachHang()

let TenKhachHang = ref('')
let DiaChi = ref('')
let SoDienThoai = ref('')
let Email = ref('')
let TenDangNhap = ref('')
let MatKhau = ref('')
let IsVerified = ref(false)
let TinhTrangHoatDong = ref(true)
let selectKhachHang = ref([])
let deleteKhachHang = ref([])
let status = ref('')

// Hàm xử lý sự kiện checkbox tổng được thay đổi trạng thái
const handleSelectAll = (event) => {
    const checkboxList = document.querySelectorAll('tbody input[type=checkbox]')
    checkboxList.forEach((c) => (c.checked = !c.checked))
    // Nếu checkbox tổng được check thì lấy danh sách ID của tất cả các checkbox con
    if (event.target.checked) {
        deleteKhachHang.value = Array.from(checkboxList).map((checkbox) => parseInt(checkbox.value))
    } else {
        deleteKhachHang.value = []
    }
}

// Hàm xử lý sự kiện checkbox con được thay đổi trạng thái
const handleSelectOne = (event) => {
    const KhachHangId = parseInt(event.target.value)
    // Nếu checkbox được check thì thêm KhachHangId vào danh sách ID
    if (event.target.checked) {
        deleteKhachHang.value = [...deleteKhachHang.value, KhachHangId]
    } else {
        deleteKhachHang.value = deleteKhachHang.value.filter((id) => id !== KhachHangId)
    }
}

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
                        <h2>Khách hàng</h2>
                    </div>
                    <div class="col-sm-6">
                        <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"
                            ><i class="material-icons fa-solid fa-circle-plus"></i> <span>Thêm khách hàng</span></a
                        >
                        <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"
                            ><i class="material-icons fa-solid fa-circle-minus"></i><span>Xóa</span></a
                        >
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>
                            <span class="custom-checkbox">
                                <input type="checkbox" id="selectAll" @change="handleSelectAll" />
                                <label for="selectAll"></label>
                            </span>
                        </th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Tên đăng nhập</th>
                        <th>Xác thực</th>
                        <th>Tình trạng hoạt động</th>
                        <th>CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(KhachHang, id) in store.KhachHang" :key="id">
                        <td>
                            <span class="custom-checkbox">
                                <input
                                    type="checkbox"
                                    :id="'checkbox' + id"
                                    :value="KhachHang.PK_MaKhachHang"
                                    @change="handleSelectOne" />
                                <label for="'checkbox'+id"></label>
                            </span>
                        </td>
                        <td>{{ KhachHang.TenKhachHang }}</td>
                        <td>{{ KhachHang.DiaChi }}</td>
                        <td>{{ KhachHang.SoDienThoai }}</td>
                        <td>{{ KhachHang.Email }}</td>
                        <td>{{ KhachHang.TenDangNhap }}</td>
                        <td>{{ KhachHang.IsVerified }}</td>
                        <td>{{ KhachHang.TinhTrangHoatDong }}</td>
                        <td>
                            <a
                                href="#editEmployeeModal"
                                class="edit"
                                data-toggle="modal"
                                @click="selectKhachHang = { ...KhachHang }"
                                ><i
                                    class="material-icons fa-solid fa-pen-to-square"
                                    data-toggle="tooltip"
                                    title="Edit"></i>
                            </a>
                            <a
                                href="#deleteEmployeeModal"
                                class="delete"
                                data-toggle="modal"
                                @click="deleteKhachHang = { ...KhachHang }"
                                ><i class="material-icons fa-solid fa-trash" data-toggle="tooltip" title="Delete"></i
                            ></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- Edit Modal HTML -->
    <div id="addEmployeeModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <form
                    @submit.prevent="
                        store.addKhachHang(
                            TenKhachHang,
                            DiaChi,
                            SoDienThoai,
                            Email,
                            TenDangNhap,
                            MatKhau,
                            IsVerified,
                            TinhTrangHoatDong
                        )
                    ">
                    <div class="modal-header">
                        <h4 class="modal-title">Thêm khách hàng</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Tên khách hàng</label>
                            <input type="text" class="form-control" v-model="TenKhachHang" required />
                        </div>
                        <div class="form-group">
                            <label>Địa chỉ</label>
                            <input type="text" class="form-control" v-model="DiaChi" required />
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" class="form-control" v-model="SoDienThoai" required />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" v-model="Email" required />
                        </div>
                        <div class="form-group">
                            <label>Tên đăng nhập</label>
                            <input type="text" class="form-control" v-model="TenDangNhap" required />
                        </div>
                        <div class="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" class="form-control" v-model="MatKhau" required />
                        </div>
                        <div class="form-group">
                            <label>Xác thực</label>
                            <input type="text" class="form-control" v-model="IsVerified" required />
                        </div>
                        <div class="form-group">
                            <label>Tình trạng hoạt động</label>
                            <input type="text" class="form-control" v-model="TinhTrangHoatDong" required />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                        <input type="submit" class="btn btn-success" value="Add" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Edit Modal HTML -->
    <div id="editEmployeeModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <form
                    @submit.prevent="
                        store.updateKhachHang(
                            selectKhachHang.PK_MaKhachHang,
                            selectKhachHang.TenKhachHang,
                            selectKhachHang.DiaChi,
                            selectKhachHang.SoDienThoai,
                            selectKhachHang.Email,
                            selectKhachHang.TenDangNhap,
                            selectKhachHang.MatKhau,
                            selectKhachHang.IsVerified,
                            selectKhachHang.TinhTrangHoatDong
                        )
                    ">
                    <div class="modal-header">
                        <h4 class="modal-title">Chỉnh sửa khách hàng</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Tên khách hàng</label>
                            <input type="text" class="form-control" v-model="selectKhachHang.TenKhachHang" required />
                        </div>
                        <div class="form-group">
                            <label>Địa chỉ</label>
                            <input type="text" class="form-control" v-model="selectKhachHang.DiaChi" required />
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" class="form-control" v-model="selectKhachHang.SoDienThoai" required />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" v-model="selectKhachHang.Email" required />
                        </div>
                        <div class="form-group">
                            <label>Tên đăng nhập</label>
                            <input type="text" class="form-control" v-model="selectKhachHang.TenDangNhap" required />
                        </div>
                        <div class="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" class="form-control" v-model="selectKhachHang.MatKhau" required />
                        </div>
                        <div class="form-group">
                            <label>Xác thực</label>
                            <input type="text" class="form-control" v-model="selectKhachHang.IsVerified" required />
                        </div>
                        <div class="form-group">
                            <label>Tình trạng hoạt động</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="selectKhachHang.TinhTrangHoatDong"
                                required />
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
    <!-- Delete Modal HTML -->
    <div id="deleteEmployeeModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="store.deleteKhachHang(deleteKhachHang)">
                    <div class="modal-header">
                        <h4 class="modal-title">Xóa khách hàng</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="form-group" style="display: none">
                        <input type="text" class="form-control" v-model="deleteKhachHang" />
                    </div>
                    <div class="modal-body">
                        <p>Bạn có chắc chắn muốn xóa những khách hàng này không?</p>
                        <p class="text-warning"><small>Hành động này không thể hoàn tác</small></p>
                    </div>
                    <div class="modal-footer">
                        <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
                        <input type="submit" class="btn btn-danger" value="Delete" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '../../assets/css/admin.css';
</style>
