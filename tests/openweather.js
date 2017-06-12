import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('Openweather test', t => {
  return client.getPromise('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=6ab094674da884c7449b419d3cd8f77d')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
