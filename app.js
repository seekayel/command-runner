const express = require('express');
const child_process = require('child_process')
const app = express()

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))


// #############################################################################
// Run commands
app.use('/run', (req,res,next) => {

  var cmd = 'npm --verbose run bob'
  // var cmd = 'npm --version'

  var out = ''
  try {
    out = child_process.execSync(cmd).toString().trim().replace(/\n+$/, "")
  } catch(error) {
    out = error.toString()
  } finally {
    console.log(out)
  }
  res.json({
    out
  })
  .end()
})


// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.json({
      path: req.originalUrl,
      at: new Date().toISOString(),
      params: req.params,
      env: process.env,
      headers: req.headers
    })
    .end()
})

module.exports = app
