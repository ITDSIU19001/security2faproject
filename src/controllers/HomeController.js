import path from 'path'


const __dirname = path.resolve()


const getHomePage = async (req, res) => {
  return res.sendFile(path.join(`${__dirname}/src/views/home.html`))
}

export {
  getHomePage,
}
