import test from 'ava'
var client = require('node-rest-client-promise').Client()

test('Spotify test', t => {
  return client.getPromise('https://accounts.spotify.com/authorize/?client_id=533a5af89e504b7393f75c477f13c3cd&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback')
    .catch((error) => {
      t.fail()
      throw error
    })
    .then((res) => {
      console.log(res.response.statusCode)
      t.is(res.response.statusCode, 200)
    })
})
