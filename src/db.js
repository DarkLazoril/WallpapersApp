const mongoose = require('mongoose')

const uri = 'mongodb://0.0.0.0:27017/wallpapers'

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log('Connection success')
    },
    (err) => {
      console.log('ERROR: ' + err)
    }
  )
