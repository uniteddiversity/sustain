var fs = require('fs')
var test = require('tape')

var init = require('../lib/init')

process.chdir(__dirname)

test('`init <hash>` should update package.json with valid address', function (t) {
  before(0)
  
  t.equal(read().sustain, undefined, "package doesn't have sustain field yet")

  var testAddress = '1JseKCgywLToABagTu85hZfSGLXQ1pa567'

  init(testAddress, function (err) {
    t.error(err, 'no error')

    t.deepEqual(read().sustain, {
      address: testAddress // random test address
    }, 'sustain field is correct')

    cleanup()
    t.end()
  })
})

test('`init <hash>` should error with invalid address', function (t) {
  before(0)
  
  t.equal(read().sustain, undefined, "package doesn't have sustain field yet")

  init("asdf", function (err) {
    t.ok(err, 'error exists')

    t.equal(err.message, 'Given address is invalid.', 'error message is correct')

    cleanup()
    t.end()
  })
})

function read () {
  return JSON.parse(
    fs.readFileSync(__dirname + '/package.json')
  )
}

function before (num) {
  var packageJson = fs.readFileSync(__dirname + '/package.json.' + num)
  fs.writeFileSync(__dirname + '/package.json', packageJson)
}

function cleanup () {
  fs.unlinkSync(__dirname + '/package.json')
}