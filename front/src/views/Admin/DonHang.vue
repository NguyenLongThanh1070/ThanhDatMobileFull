<script setup>
import { useLienHeStore } from '@/stores/LienHeStore'
import { onMounted, ref } from 'vue'
const store = useLienHeStore()
store.getContact()

let TenNguoiGui = ref('')
let Email = ref('')
let SoDienThoai = ref('')
let TinNhan = ref('')
let selectContact = ref([])
let deleteContacts = ref([])

// Hàm xử lý sự kiện checkbox tổng được thay đổi trạng thái
const handleSelectAll = (event) => {
    const checkboxList = document.querySelectorAll('tbody input[type=checkbox]')
    checkboxList.forEach((c) => (c.checked = !c.checked))
    // Nếu checkbox tổng được check thì lấy danh sách ID của tất cả các checkbox con
    if (event.target.checked) {
        deleteContacts.value = Array.from(checkboxList).map((checkbox) => parseInt(checkbox.value))
    } else {
        deleteContacts.value = []
    }
}

// Hàm xử lý sự kiện checkbox con được thay đổi trạng thái
const handleSelectOne = (event) => {
    const contactId = parseInt(event.target.value)
    // Nếu checkbox được check thì thêm contactId vào danh sách ID
    if (event.target.checked) {
        deleteContacts.value = [...deleteContacts.value, contactId]
    } else {
        deleteContacts.value = deleteContacts.value.filter((id) => id !== contactId)
    }
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
                        <h2>Liên hệ</h2>
                    </div>
                    <div class="col-sm-6">
                        <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"
                            ><i class="material-icons fa-solid fa-circle-plus"></i> <span>Add New Employee</span></a
                        >
                        <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"
                            ><i class="material-icons fa-solid fa-circle-minus"></i><span>Delete</span></a
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
                        <th>Tên người gửi</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Tin nhắn</th>
                        <th>Thời gian</th>
                        <th>CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(contact, id) in store.contacts" :key="id">
                        <td>
                            <span class="custom-checkbox">
                                <input
                                    type="checkbox"
                                    :id="'checkbox' + id"
                                    :value="contact.PK_MaLienHe"
                                    @change="handleSelectOne" />
                                <label for="'checkbox'+id"></label>
                            </span>
                        </td>
                        <td>{{ contact.TenNguoiGui }}</td>
                        <td>{{ contact.Email }}</td>
                        <td>{{ contact.SoDienThoai }}</td>
                        <td>{{ contact.TinNhan }}</td>
                        <td>{{ contact.ThoiGian }}</td>
                        <td>
                            <a
                                href="#editEmployeeModal"
                                class="edit"
                                data-toggle="modal"
                                @click="selectContact = { ...contact }"
                                ><i
                                    class="material-icons fa-solid fa-pen-to-square"
                                    data-toggle="tooltip"
                                    title="Edit"></i>
                            </a>
                            <a
                                href="#deleteEmployeeModal"
                                class="delete"
                                data-toggle="modal"
                                @click="deleteContacts = { ...contact }"
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
                <form @submit.prevent="store.addContact(TenNguoiGui, Email, SoDienThoai, TinNhan)">
                    <div class="modal-header">
                        <h4 class="modal-title">Thêm liên hệ</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Tên người gửi</label>
                            <input type="text" class="form-control" v-model="TenNguoiGui" required />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" v-model="Email" required />
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" class="form-control" v-model="SoDienThoai" required />
                        </div>
                        <div class="form-group">
                            <label>Tin nhắn</label>
                            <textarea class="form-control" v-model="TinNhan" required></textarea>
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
                        store.updateContact(
                            selectContact.PK_MaLienHe,
                            selectContact.TenNguoiGui,
                            selectContact.Email,
                            selectContact.SoDienThoai,
                            selectContact.TinNhan
                        )
                    ">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Employee</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group" style="display: none">
                            <input type="text" class="form-control" v-model="selectContact.PK_MaLienHe" />
                        </div>
                        <div class="form-group">
                            <label>Tên người gửi</label>
                            <input type="text" class="form-control" v-model="selectContact.TenNguoiGui" required />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control" v-model="selectContact.Email" required />
                        </div>
                        <div class="form-group">
                            <label>Số điện thoại</label>
                            <textarea class="form-control" v-model="selectContact.SoDienThoai" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Tin nhắn</label>
                            <input type="text" class="form-control" v-model="selectContact.TinNhan" required />
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
                <form @submit.prevent="store.deleteContact(deleteContacts)">
                    <div class="modal-header">
                        <h4 class="modal-title">Xóa liên hệ</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="form-group" style="display: none">
                        <input type="text" class="form-control" v-model="deleteContacts" />
                    </div>
                    <div class="modal-body">
                        <p>Bạn có chắc chắn muốn xóa những liên hệ này không?</p>
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
