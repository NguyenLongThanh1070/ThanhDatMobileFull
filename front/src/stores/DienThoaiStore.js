import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import router from '@/router'
import { storage } from '@/firebase/init'
import { getDownloadURL, ref as storageRef, uploadBytes, deleteObject } from 'firebase/storage'

export const useDienThoaiStore = defineStore('DienThoai', {
    state: () => ({
        status: ref(''),
        loading: false,
        DienThoai: ref([]),
        AnhDienThoai: ref([]),
        TimDienThoai: ref([]),
        FilterDienThoai: ref([]),
        SingleDienThoai: ref({}),
    }),
    actions: {
        async getDienThoai() {
            try {
                const URL = 'http://localhost:3000/api/v1/dienthoai'
                this.loading = true
                const result = await axios.get(URL)
                this.DienThoai = await result.data
                const promises = this.DienThoai.map((item) =>
                    getDownloadURL(storageRef(storage, 'DienThoai/' + item.HinhAnh))
                )
                this.AnhDienThoai = await Promise.all(promises)
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async addDienThoai(
            TenDienThoai,
            DoPhanGiai,
            ThuongHieu,
            HinhAnh,
            file,
            HeDieuHanh,
            CamTruoc,
            CamSau,
            RAM,
            ROM,
            Pin,
            SoLuong,
            DonGia
        ) {
            try {
                const URL = 'http://localhost:3000/api/v1/dienthoai'
                const res = await axios.post(URL, {
                    TenDienThoai: TenDienThoai,
                    DoPhanGiai: DoPhanGiai,
                    ThuongHieu: ThuongHieu,
                    HinhAnh: HinhAnh,
                    HeDieuHanh: HeDieuHanh,
                    CamTruoc: CamTruoc,
                    CamSau: CamSau,
                    RAM: RAM,
                    ROM: ROM,
                    Pin: Pin,
                    SoLuong: SoLuong,
                    DonGia: DonGia,
                })
                const storageReference = storageRef(storage, 'DienThoai/' + HinhAnh)
                await uploadBytes(storageReference, file).then(() => {
                    console.log('Uploaded')
                })
                this.status = res.data.msg
                await this.getDienThoai()
            } catch (error) {
                console.log(error)
            }
        },
        async timDienThoai(TenDienThoai) {
            try {
                const URL = 'http://localhost:3000/api/v1/dienthoai'
                this.loading = true
                const result = await axios.get(URL)
                this.TimDienThoai = await result.data
                if (TenDienThoai !== '') {
                    this.TimDienThoai = this.TimDienThoai.filter((phone) => {
                        return phone.TenDienThoai.toLowerCase().includes(TenDienThoai.toLowerCase())
                    })
                }
                router.push('/danh-muc-san-pham')
                TenDienThoai = ''
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async filterDienThoai(selectedBrands, min, max) {
            try {
                const URL = 'http://localhost:3000/api/v1/dienthoai'
                this.loading = true
                const result = await axios.get(URL)
                this.FilterDienThoai = await result.data
                if (selectedBrands.length > 0) {
                    this.FilterDienThoai = this.FilterDienThoai.filter((phone) =>
                        selectedBrands.includes(phone.ThuongHieu)
                    )
                }
                if (min > 0) {
                    this.FilterDienThoai = this.FilterDienThoai.filter((phone) => phone.DonGia >= min)
                }

                if (max > 0) {
                    this.FilterDienThoai = this.FilterDienThoai.filter((phone) => phone.DonGia <= max)
                }
                this.loading = false
                selectedBrands = []
                min = 0
                max = 0
            } catch (error) {
                console.log(error)
            }
        },
        async getSingleDienThoai(PK_MaDienThoai) {
            try {
                const URL = `http://localhost:3000/api/v1/dienthoai/${PK_MaDienThoai}`
                this.loading = true
                const result = await axios.get(URL)
                this.SingleDienThoai = await result.data
                this.loading = false
            } catch (error) {
                console.log(error)
            }
        },
        async updateDienThoai(
            PK_MaDienThoai,
            TenDienThoai,
            DoPhanGiai,
            ThuongHieu,
            HinhAnhCu,
            HinhAnhMoi,
            file,
            HeDieuHanh,
            CamTruoc,
            CamSau,
            RAM,
            ROM,
            Pin,
            SoLuong,
            DonGia
        ) {
            try {
                const URL = `http://localhost:3000/api/v1/dienthoai/${PK_MaDienThoai}`
                let res = await axios.put(URL, {
                    TenDienThoai: TenDienThoai,
                    DoPhanGiai: DoPhanGiai,
                    ThuongHieu: ThuongHieu,
                    HinhAnh: HinhAnhMoi,
                    HeDieuHanh: HeDieuHanh,
                    CamTruoc: CamTruoc,
                    CamSau: CamSau,
                    RAM: RAM,
                    ROM: ROM,
                    Pin: Pin,
                    SoLuong: SoLuong,
                    DonGia: DonGia,
                })
                const AnhCuReference = storageRef(storage, 'DienThoai/' + HinhAnhCu)
                await deleteObject(AnhCuReference).then(() => {
                    console.log('Deleted')
                })
                const AnhMoiReference = storageRef(storage, 'DienThoai/' + HinhAnhMoi)
                await uploadBytes(AnhMoiReference, file).then(() => {
                    console.log('Uploaded')
                })
                this.status = res.data.msg
                await this.getDienThoai()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteDienThoai(deleteDienThoai) {
            if (typeof deleteDienThoai === 'object') {
                try {
                    const URL = `http://localhost:3000/api/v1/DienThoai/${deleteDienThoai.PK_MaDienThoai}`
                    const res = await axios.delete(URL)
                    const AnhCuReference = storageRef(storage, 'DienThoai/' + deleteDienThoai.HinhAnh)
                    await deleteObject(AnhCuReference).then(() => {
                        console.log('Deleted')
                    })
                    this.status = res.data.msg
                    await this.getDienThoai()
                } catch (error) {
                    console.log(error)
                }
            } else {
                for (const PK_MaDienThoai of deleteDienThoai) {
                    try {
                        const URL = `http://localhost:3000/api/v1/DienThoai/${PK_MaDienThoai}`
                        const res = await axios.delete(URL)
                        const AnhCuReference = storageRef(storage, 'DienThoai/' + deleteDienThoai.HinhAnh)
                        await deleteObject(AnhCuReference).then(() => {
                            console.log('Deleted')
                        })
                        this.status = res.data.msg
                        await this.getDienThoai()
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        },
    },
})
