import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('Translate test', t => {
  return client.getPromise('https://translation.googleapis.com/language/translate/v2?key=AIzaSyBucJTOD6wdUDcE0gTuYEb2fNzzDmwWzBg')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
