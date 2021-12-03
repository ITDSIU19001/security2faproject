import qrcode from 'qrcode'
import otplib from 'otplib'


const { authenticator } = otplib


const generateUniqueSecret = () => {
  return authenticator.generateSecret()
}

const generateTimeUsed = () => {
  return authenticator.timeUsed()
}


const generateOTPToken = (username, serviceName, secret) => {
  return authenticator.keyuri(username, serviceName, secret)
}


const verifyOTPToken = (token, secret) => {

  return authenticator.check(token, secret)
}


const generateQRCode = async (otpAuth) => {
  try {
    const QRCodeImageUrl = await qrcode.toDataURL(otpAuth)
    return `<img src='${QRCodeImageUrl}' alt='qr-code-img' />`
  } catch (error) {
    console.log('Could not generate QR code', error)
    return
  }
}

export {
  generateUniqueSecret,
  verifyOTPToken,
  generateOTPToken,
  generateQRCode,
  generateTimeUsed,
}
