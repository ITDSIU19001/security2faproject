import path from 'path'
import {
  generateUniqueSecret,
  verifyOTPToken,
  generateOTPToken,
  generateQRCode,
} from '../helpers/2fa.js'

const __dirname = path.resolve()


const MOCK_USER = {
  username: 'nhp010327',
  password: '2355556',
  is2FAEnabled: true,
  secret: generateUniqueSecret()
}

const getLoginPage = async (req, res) => {
  return res.sendFile(path.join(`${__dirname}/src/views/login.html`))
}

const getEnable2FAPage = async (req, res) => {
  return res.sendFile(path.join(`${__dirname}/src/views/enable2FA.html`))
}



const getverify2FAPage = async (req, res) => {
  return res.sendFile(path.join(`${__dirname}/src/views/verify2FA.html`))
}


const postLogin = async (req, res) => {
  try {
    let user = MOCK_USER
    const { username, password } = req.body

    if (username === user.username && password === user.password) {

      if (user.is2FAEnabled) {
        return res.status(200).json({
          isCorrectIdentifier: true,
          is2FAEnabled: true,
          isLoggedIn: false,
        })
      }

      return res.status(200).json({
        isCorrectIdentifier: true,
        is2FAEnabled: false,
        isLoggedIn: true,
      })
    }

    return res.status(200).json({
      isCorrectIdentifier: false,
      is2FAEnabled: false,
      isLoggedIn: false,
    })
  } catch (error) {
    return res.status(500).json(error)
  }
}


const postEnable2FA = async (req, res) => {
  try {
    let user = MOCK_USER


    const serviceName = 'Security'

    const otpAuth = generateOTPToken(user.username, serviceName, user.secret)
    console.log(otpAuth)



    const QRCodeImage = await generateQRCode(otpAuth)

    return res.status(200).json({ QRCodeImage })
  } catch (error) {
    return res.status(500).json(error)
  }
}

const postVerify2FA = async (req, res) => {
  try {
    let user = MOCK_USER
    const { otpToken } = req.body


    const isValid = verifyOTPToken(otpToken, user.secret)


    return res.status(200).json({ isValid })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export {
  getLoginPage,
  getEnable2FAPage,
  getverify2FAPage,
  postLogin,
  postEnable2FA,
  postVerify2FA,
}
