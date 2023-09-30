<script setup>
import { useDienThoaiStore } from '@/stores/DienThoaiStore'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const store = useDienThoaiStore()
store.getDienThoai()

let TenDienThoai = ref('')
let DoPhanGiai = ref('')
// let HinhAnh = ref('')
let HeDieuHanh = ref('')
let CamTruoc = ref('')
let CamSau = ref('')
let RAM = ref('')
let ROM = ref('')
let Pin = ref('')
let SoLuong = ref(0)
let DonGia = ref(0)
let FK_MaHang = ref('')
let selectDienThoai = ref([])
let deleteDienThoai = ref([])

// Hàm xử lý sự kiện checkbox tổng được thay đổi trạng thái
const handleSelectAll = (event) => {
    const checkboxList = document.querySelectorAll('tbody input[type=checkbox]')
    checkboxList.forEach((c) => (c.checked = !c.checked))
    // Nếu checkbox tổng được check thì lấy danh sách ID của tất cả các checkbox con
    if (event.target.checked) {
        deleteDienThoai.value = Array.from(checkboxList).map((checkbox) => parseInt(checkbox.value))
    } else {
        deleteDienThoai.value = []
    }
}

// Hàm xử lý sự kiện checkbox con được thay đổi trạng thái
const handleSelectOne = (event) => {
    const DienThoaiId = parseInt(event.target.value)
    // Nếu checkbox được check thì thêm contactId vào danh sách ID
    if (event.target.checked) {
        deleteDienThoai.value = [...deleteDienThoai.value, DienThoaiId]
    } else {
        deleteDienThoai.value = deleteDienThoai.value.filter((id) => id !== DienThoaiId)
    }
}

async function addDienThoai() {
    const formData = new FormData() // Khởi tạo đối tượng FormData để submit dữ liệu
    formData.append('TenDienThoai', TenDienThoai)
    formData.append('DoPhanGiai', DoPhanGiai)
    formData.append('HinhAnh', this.file, this.file.name) // Thêm tập tin vào FormData
    formData.append('HeDieuHanh', HeDieuHanh)
    formData.append('CamTruoc', CamTruoc)
    formData.append('CamSau', CamSau)
    formData.append('RAM', RAM)
    formData.append('ROM', ROM)
    formData.append('Pin', Pin)
    formData.append('SoLuong', SoLuong)
    formData.append('DonGia', DonGia)
    formData.append('FK_MaHang', FK_MaHang)
    try {
        const response = await axios.post(`http://localhost:3000/api/v1/DienThoai/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}
async function updateDienThoai() {
    const formData = new FormData() // Khởi tạo đối tượng FormData để submit dữ liệu
    formData.append('PK_MaDienThoai', selectDienThoai.value)
    formData.append('TenDienThoai', TenDienThoai)
    formData.append('DoPhanGiai', DoPhanGiai)
    formData.append('HinhAnh', this.file, this.file.name) // Thêm tập tin vào FormData
    formData.append('HeDieuHanh', HeDieuHanh)
    formData.append('CamTruoc', CamTruoc)
    formData.append('CamSau', CamSau)
    formData.append('RAM', RAM)
    formData.append('ROM', ROM)
    formData.append('Pin', Pin)
    formData.append('SoLuong', SoLuong)
    formData.append('DonGia', DonGia)
    formData.append('FK_MaHang', FK_MaHang)
    try {
        const response = await axios.put(`http://localhost:3000/api/v1/DienThoai/${selectDienThoai.value}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}
function onImageChange(e) {
    this.file = e.target.files[0]
}

onMounted(() => {
    // // Activate tooltip
    // //console.log(document.querySelector('#tooltip'))
    // // Select/Deselect checkboxes
    // // var checkbox = document.querySelector('#checkbox1')
    // console.log(checkbox)
    // document.querySelector('#selectAll').click(function () {
    //     if (this.checked) {
    //         checkbox.each(function () {
    //             this.checked = true
    //         })
    //     } else {
    //         checkbox.each(function () {
    //             this.checked = false
    //         })
    //     }
    // })
    // checkbox.click(function () {
    //     if (!this.checked) {
    //         document.querySelector('#selectAll').prop('checked', false)
    //     }
    // })
})
</script>

<template>
    <h1 v-if="store.loading">Loading...</h1>
    <div v-else class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-6">
                        <h2>Điện thoại</h2>
                    </div>
                    <div class="col-sm-6">
                        <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"
                            ><i class="material-icons fa-solid fa-circle-plus"></i> <span>Thêm điện thoại</span></a
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
                        <th>Tên Điện thoại</th>
                        <th>Độ phân giải</th>
                        <th>Hình ảnh</th>
                        <th>Hệ điều hành</th>
                        <th>Cam trước</th>
                        <th>Cam sau</th>
                        <th>RAM</th>
                        <th>ROM</th>
                        <th>Pin</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Mã hãng</th>
                        <th>CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(DienThoai, id) in store.DienThoai" :key="id">
                        <td>
                            <span class="custom-checkbox">
                                <input
                                    type="checkbox"
                                    :id="'checkbox' + id"
                                    :value="DienThoai.PK_MaDienThoai"
                                    @change="handleSelectOne" />
                                <label for="'checkbox'+id"></label>
                            </span>
                        </td>
                        <td>{{ DienThoai.TenDienThoai }}</td>
                        <td>{{ DienThoai.DoPhanGiai }}</td>
                        <td>
                            <img :src="require(`../../assets/images/${DienThoai.HinhAnh}`)" />
                        </td>
                        <td>{{ DienThoai.HeDieuHanh }}</td>
                        <td>{{ DienThoai.CamTruoc }}</td>
                        <td>{{ DienThoai.CamSau }}</td>
                        <td>{{ DienThoai.RAM }}</td>
                        <td>{{ DienThoai.ROM }}</td>
                        <td>{{ DienThoai.Pin }}</td>
                        <td>{{ DienThoai.SoLuong }}</td>
                        <td>{{ DienThoai.DonGia }}</td>
                        <td>{{ DienThoai.FK_MaHang }}</td>
                        <td>
                            <a
                                href="#editEmployeeModal"
                                class="edit"
                                data-toggle="modal"
                                @click="selectDienThoai = { ...DienThoai }"
                                ><i
                                    class="material-icons fa-solid fa-pen-to-square"
                                    data-toggle="tooltip"
                                    title="Edit"></i>
                            </a>
                            <a
                                href="#deleteEmployeeModal"
                                class="delete"
                                data-toggle="modal"
                                @click="deleteDienThoai = { ...DienThoai }"
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
                <form @submit.prevent="addDienThoai">
                    <div class="modal-header">
                        <h4 class="modal-title">Thêm điện thoại</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Tên điện thoại</label>
                            <input type="text" class="form-control" v-model="TenDienThoai" required />
                        </div>
                        <div class="form-group">
                            <label>Độ phân giải</label>
                            <input type="email" class="form-control" v-model="DoPhanGiai" required />
                        </div>
                        <div class="form-group">
                            <label>Hình ảnh</label>
                            <input type="file" class="form-control" @change="onImageChange" required />
                        </div>
                        <div class="form-group">
                            <label>Hệ điều hành</label>
                            <input type="text" class="form-control" v-model="HeDieuHanh" required />
                        </div>
                        <div class="form-group">
                            <label>Cam trước</label>
                            <input type="text" class="form-control" v-model="CamTruoc" required />
                        </div>
                        <div class="form-group">
                            <label>Cam sau</label>
                            <input type="text" class="form-control" v-model="CamSau" required />
                        </div>
                        <div class="form-group">
                            <label>RAM</label>
                            <input type="text" class="form-control" v-model="RAM" required />
                        </div>
                        <div class="form-group">
                            <label>ROM</label>
                            <input type="text" class="form-control" v-model="ROM" required />
                        </div>
                        <div class="form-group">
                            <label>Pin</label>
                            <input type="text" class="form-control" v-model="Pin" required />
                        </div>
                        <div class="form-group">
                            <label>Số lượng</label>
                            <input type="text" class="form-control" v-model="SoLuong" required />
                        </div>
                        <div class="form-group">
                            <label>Đơn giá</label>
                            <input type="text" class="form-control" v-model="DonGia" required />
                        </div>
                        <div class="form-group">
                            <label>Mã hãng</label>
                            <input type="text" class="form-control" v-model="FK_MaHang" required />
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
                <form @submit.prevent="updateDienThoai">
                    <div class="modal-header">
                        <h4 class="modal-title">Sửa thông tin điện thoại</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Tên điện thoại</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.TenDienThoai" required />
                        </div>
                        <div class="form-group">
                            <label>Độ phân giải</label>
                            <input type="email" class="form-control" v-model="selectDienThoai.DoPhanGiai" required />
                        </div>
                        <div class="form-group">
                            <label>Hình ảnh</label>
                            <input type="file" class="form-control" @change="onImageChange" required />
                        </div>
                        <div class="form-group">
                            <label>Hệ điều hành</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.HeDieuHanh" required />
                        </div>
                        <div class="form-group">
                            <label>Cam trước</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.CamTruoc" required />
                        </div>
                        <div class="form-group">
                            <label>Cam sau</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.CamSau" required />
                        </div>
                        <div class="form-group">
                            <label>RAM</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.RAM" required />
                        </div>
                        <div class="form-group">
                            <label>ROM</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.ROM" required />
                        </div>
                        <div class="form-group">
                            <label>Pin</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.Pin" required />
                        </div>
                        <div class="form-group">
                            <label>Số lượng</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.SoLuong" required />
                        </div>
                        <div class="form-group">
                            <label>Đơn giá</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.DonGia" required />
                        </div>
                        <div class="form-group">
                            <label>Mã hãng</label>
                            <input type="text" class="form-control" v-model="selectDienThoai.FK_MaHang" required />
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
    <!-- Delete Modal HTML -->
    <div id="deleteEmployeeModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="store.deleteDienThoai(deleteDienThoai)">
                    <div class="modal-header">
                        <h4 class="modal-title">Xóa điện thoại</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="form-group" style="display: none">
                        <input type="text" class="form-control" v-model="deleteDienThoai" />
                    </div>
                    <div class="modal-body">
                        <p>Bạn có chắc chắn muốn xóa những điện thoại này không?</p>
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
