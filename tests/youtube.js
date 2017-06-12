import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('Youtube test', t => {
  return client.getPromise('https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyA961WArdG_rzAFtRqEaWsE98ZiM4Sa7Lw')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
