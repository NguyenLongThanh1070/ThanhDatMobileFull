const sendEmail = require('./sendEmail')

const sendResetPasswordEmail = async ({ TenDangNhap, Email, Token, origin }) => {
    const message = `
    <form method="post" action="${origin}/api/v1/auth/reset-password">
        <input type="hidden" name="Token" value="${Token}">
        <input type="hidden" name="Email" value="${Email}">
        <button type="submit">Đặt lại mật khẩu</button>
    </form>`

    return sendEmail({
        to: Email,
        subject: 'Đặt lại mật khẩu',
        html: `<h4> Xin chào, ${TenDangNhap}</h4>
    ${message}
    `,
    })
}

module.exports = sendResetPasswordEmail
