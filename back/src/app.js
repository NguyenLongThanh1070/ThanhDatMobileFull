require('dotenv').config()
require('express-async-errors')

//express
const express = require('express')
const app = express()
//pakages khac
const cookieParser = require('cookie-parser')
const cors = require('cors')

//routers
const authRouter = require('./routes/authRoutes')
const billRouter = require('./routes/billRoutes')
const cartRouter = require('./routes/cartRoutes')
const contactRouter = require('./routes/contactRoutes')
const feedbackRouter = require('./routes/feedbackRoutes')
const DienThoaiRouter = require('./routes/DienThoaiRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const KhachHangRouter = require('./routes/KhachHangRoutes')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(cors())

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/bill', billRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/contact', contactRouter)
app.use('/api/v1/feedback', feedbackRouter)
app.use('/api/v1/dienthoai', DienThoaiRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/khachhang', KhachHangRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

try {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
} catch (error) {
    console.log(error)
}
