import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    //KhachHang
    {
        path: '/',
        name: 'TrangChu',
        component: () => import('@/views/Client/TrangChuPage.vue'),
        meta: {
            title: 'Trang chủ',
        },
    },
    {
        path: '/dang-ky',
        name: 'DangKy',
        component: () => import('@/views/Client/DangKyPage.vue'),
        meta: {
            title: 'Đăng ký',
        },
    },
    {
        path: '/dang-nhap',
        name: 'DangNhap',
        component: () => import('@/views/Client/DangNhapPage.vue'),
        meta: {
            title: 'Đăng nhập',
        },
    },
    {
        path: '/danh-muc-san-pham',
        name: 'DanhMucSanPham',
        component: () => import('@/views/Client/DanhMucSanPhamPage.vue'),
        meta: {
            title: 'Danh mục sản phẩm',
        },
    },
    {
        path: '/gio-hang',
        name: 'GioHang',
        component: () => import('@/views/Client/GioHangPage.vue'),
        meta: {
            title: 'Giỏ hàng',
        },
    },
    {
        path: '/gioi-thieu',
        name: 'GioiThieu',
        component: () => import('@/views/Client/GioiThieuPage.vue'),
        meta: {
            title: 'Giới thiệu',
        },
    },
    {
        path: '/lien-he',
        name: 'LienHe',
        component: () => import('@/views/Client/LienHePage.vue'),
        meta: {
            title: 'Liên hệ',
        },
    },
    {
        path: '/quen-mat-khau',
        name: 'QuenMK',
        component: () => import('@/views/Client/QuenMKPage.vue'),
        meta: {
            title: 'Quên mật khẩu',
        },
    },
    {
        path: '/dat-lai-mat-khau',
        name: 'DatLaiMatKhau',
        component: () => import('@/views/Client/DatLaiMatKhau.vue'),
        meta: {
            title: 'Đặt lại mật khẩu',
        },
    },
    {
        path: '/:PK_MaDienThoai',
        name: 'TrangSanPhamChiTiet',
        component: () => import('@/views/Client/TrangSanPhamChiTietPage.vue'),
        meta: {
            title: 'Chi tiết sản phẩm',
        },
    },
    //NhanVien
    {
        path: '/admin-dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Admin/DonHang.vue'),
        meta: {
            title: 'Dashboard',
        },
    },
    {
        path: '/admin-dienthoai',
        name: 'Điện thoại',
        component: () => import('@/views/Admin/DienThoai.vue'),
        meta: {
            title: 'Điện thoại',
        },
    },
    {
        path: '/admin-khachhang',
        name: 'Khách hàng',
        component: () => import('@/views/Admin/KhachHang.vue'),
        meta: {
            title: 'Khách hàng',
        },
    },
    {
        path: '/admin-lienhe',
        name: 'Liên hệ',
        component: () => import('../views/Admin/LienHe.vue'),
        meta: {
            title: 'Liên hệ',
        },
    },
    {
        path: '/admin-nhanvien',
        name: 'Nhân viên',
        component: () => import('@/views/Admin/NhanVien.vue'),
        meta: {
            title: 'Nhân viên',
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const title = to.meta.title
    if (title) {
        document.title = title
    }
    next()
})

export default router
