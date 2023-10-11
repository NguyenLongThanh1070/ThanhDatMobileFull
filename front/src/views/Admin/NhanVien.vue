<script setup>
import { useNhanVienStore } from '@/stores/NhanVienStore'
import { ref, watchEffect } from 'vue'
import moment from 'moment'
const store = useNhanVienStore()
store.getNhanVien()

let TenNhanVien = ref('')
let DiaChi = ref('')
let SoDienThoai = ref('')
let Email = ref('')
let TenDangNhap = ref('')
let MatKhau = ref('')
let NgaySinh = ref('')
let NgayVaoLam = ref('')
let LuongCoBan = ref('')
let PhuCap = ref('')
let Quyen = ref('')
let selectNhanVien = ref([])
let deleteNhanVien = ref([])
let status = ref('')

// Hàm xử lý sự kiện checkbox tổng được thay đổi trạng thái
const handleSelectAll = (event) => {
    const checkboxList = document.querySelectorAll('tbody input[type=checkbox]')
    checkboxList.forEach((c) => (c.checked = !c.checked))
    // Nếu checkbox tổng được check thì lấy danh sách ID của tất cả các checkbox con
    if (event.target.checked) {
        deleteNhanVien.value = Array.from(checkboxList).map((checkbox) => parseInt(checkbox.value))
    } else {
        deleteNhanVien.value = []
    }
}

// Hàm xử lý sự kiện checkbox con được thay đổi trạng thái
const handleSelectOne = (event) => {
    const NhanVienId = parseInt(event.target.value)
    // Nếu checkbox được check thì thêm NhanVienId vào danh sách ID
    if (event.target.checked) {
        deleteNhanVien.value = [...deleteNhanVien.value, NhanVienId]
    } else {
        deleteNhanVien.value = deleteNhanVien.value.filter((id) => id !== NhanVienId)
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
                        <h2>Nhân viên</h2>
                    </div>
                    <div class="col-sm-6">
                        <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"
                            ><i class="material-icons fa-solid fa-circle-plus"></i> <span>Thêm nhân viên</span></a
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
                        <th>Tên Nhân viên</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Tên đăng nhập</th>
                        <th>Ngày sinh</th>
                        <th>Ngày vào làm</th>
                        <th>Lương cơ bản</th>
                        <th>Phụ cấp</th>
                        <th>Quyền</th>
                        <th>CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(NhanVien, id) in store.NhanVien" :key="id">
                        <td>
                            <span class="custom-checkbox">
                                <input
                                    type="checkbox"
                                    :id="'checkbox' + id"
                                    :value="NhanVien.PK_MaLienHe"
                                    @change="handleSelectOne" />
                                <label for="'checkbox'+id"></label>
                            </span>
                        </td>
                        <td>{{ NhanVien.TenNhanVien }}</td>
                        <td>{{ NhanVien.DiaChi }}</td>
                        <td>{{ NhanVien.SoDienThoai }}</td>
                        <td>{{ NhanVien.Email }}</td>
                        <td>{{ NhanVien.TenDangNhap }}</td>
                        <td>{{ moment(NhanVien.NgaySinh).format('DD-MM-YYYY') }}</td>
                        <td>{{ moment(NhanVien.NgayVaoLam).format('DD-MM-YYYY') }}</td>
                        <td>{{ NhanVien.LuongCoBan }}</td>
                        <td>{{ NhanVien.PhuCap }}</td>
                        <td>{{ NhanVien.Quyen }}</td>
                        <td>
                            <a
                                href="#editEmployeeModal"
                                class="edit"
                                data-toggle="modal"
                                @click="selectNhanVien = { ...NhanVien }"
                                ><i
                                    class="material-icons fa-solid fa-pen-to-square"
                                    data-toggle="tooltip"
                                    title="Edit"></i>
                            </a>
                            <a
                                href="#deleteEmployeeModal"
                                class="delete"
                                data-toggle="modal"
                                @click="deleteNhanVien = { ...NhanVien }"
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
                        store.addNhanVien(
                            TenNhanVien,
                            DiaChi,
                            SoDienThoai,
                            Email,
                            TenDangNhap,
                            MatKhau,
                            NgaySinh,
                            NgayVaoLam,
                            LuongCoBan,
                            PhuCap,
                            Quyen.value
                        )
                    ">
                    <div class="modal-header">
                        <h4 class="modal-title">Thêm nhân viên</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Tên nhân viên</label>
                            <input type="text" class="form-control" v-model="TenNhanVien" required />
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
                            <label>Ngày sinh</label>
                            <input type="date" class="form-control" v-model="NgaySinh" required />
                        </div>
                        <div class="form-group">
                            <label>Ngày vào làm</label>
                            <input type="date" class="form-control" v-model="NgayVaoLam" required />
                        </div>
                        <div class="form-group">
                            <label>Lương cơ bản</label>
                            <input type="number" class="form-control" v-model="LuongCoBan" required />
                        </div>
                        <div class="form-group">
                            <label>Phụ cấp</label>
                            <input type="number" class="form-control" v-model="PhuCap" required />
                        </div>
                        <div class="form-group">
                            <label>Quyền</label>
                            <select class="form-control" v-model="Quyen" required>
                                <option value="NhanVien">Nhân viên</option>
                                <option value="QuanLy">Quản lý</option>
                            </select>
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
                        store.updateNhanVien(
                            selectNhanVien.PK_MaNhanVien,
                            selectNhanVien.TenNhanVien,
                            selectNhanVien.DiaChi,
                            selectNhanVien.SoDienThoai,
                            selectNhanVien.Email,
                            selectNhanVien.TenDangNhap,
                            selectNhanVien.MatKhau,
                            selectNhanVien.NgaySinh,
                            selectNhanVien.NgayVaoLam,
                            selectNhanVien.LuongCoBan,
                            selectNhanVien.PhuCap,
                            selectNhanVien.Quyen.value
                        )
                    ">
                    <div class="modal-header">
                        <h4 class="modal-title">Sửa nhân viên</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Tên nhân viên</label>
                            <input type="text" class="form-control" v-model="selectNhanVien.TenNhanVien" required />
                        </div>
                        <div class="form-group">
                            <label>Địa chỉ</label>
                            <input type="text" class="form-control" v-model="selectNhanVien.DiaChi" required />
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" class="form-control" v-model="selectNhanVien.SoDienThoai" required />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" v-model="selectNhanVien.Email" required />
                        </div>
                        <div class="form-group">
                            <label>Tên đăng nhập</label>
                            <input type="text" class="form-control" v-model="selectNhanVien.TenDangNhap" required />
                        </div>
                        <div class="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" class="form-control" v-model="selectNhanVien.MatKhau" required />
                        </div>
                        <div class="form-group">
                            <label>Ngày sinh</label>
                            <input type="date" class="form-control" v-model="selectNhanVien.NgaySinh" required />
                        </div>
                        <div class="form-group">
                            <label>Ngày vào làm</label>
                            <input type="date" class="form-control" v-model="selectNhanVien.NgayVaoLam" required />
                        </div>
                        <div class="form-group">
                            <label>Lương cơ bản</label>
                            <input type="number" class="form-control" v-model="selectNhanVien.LuongCoBan" required />
                        </div>
                        <div class="form-group">
                            <label>Phụ cấp</label>
                            <input type="number" class="form-control" v-model="selectNhanVien.PhuCap" required />
                        </div>
                        <div class="form-group">
                            <label>Quyền</label>
                            <select class="form-control" v-model="selectNhanVien.Quyen" required>
                                <option value="NhanVien">Nhân viên</option>
                                <option value="QuanLy">Quản lý</option>
                            </select>
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
                <form @submit.prevent="store.deleteNhanVien(deleteNhanVien)">
                    <div class="modal-header">
                        <h4 class="modal-title">Xóa nhân viên</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="form-group" style="display: none">
                        <input type="text" class="form-control" v-model="deleteNhanVien" />
                    </div>
                    <div class="modal-body">
                        <p>Bạn có chắc chắn muốn xóa những nhân viên này không?</p>
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
