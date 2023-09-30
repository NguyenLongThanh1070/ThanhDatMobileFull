const createTokenUser = (KhachHang) => {
    return { PK_MaKhachHang: KhachHang.PK_MaKhachHang, TenKhachHang: KhachHang.TenKhachHang }
}

module.exports = createTokenUser
