import {
    hexToRgbA,
    getAllImagesFromJSON,
    preLoadImage,
    phoneVerification,
    dateCreator,
    epochConverter,
    between,
    b64Conv
} from '../data/tools'
import data from '../mock/test-call-event'
// const img = require('file!./test.png')

test('get images from JSON using getAllImagesFromJSON function', () => {
    const images = getAllImagesFromJSON(data, [], ['.jpg', '.png', '.jpeg', '.image?'])
    expect(images).toHaveLength(5)
})
test('preload image', () => {
    // eslint-disable-next-line accessor-pairs
    Object.defineProperty(global.Image.prototype, 'src', {
        set (src) {
            this.dispatchEvent(new Event('load'))
        }
    })
    const url = 'https://cdn.rts.ch/rtschallengeassets/events/tdr/logo_les-defis-du-Tour.png'
    const mockCallBack = jest.fn()
    preLoadImage(url, mockCallBack)
    expect(mockCallBack).toHaveBeenCalled()
})

test('phone verification', () => {
    const testSwissNumber = phoneVerification(41799116118)
    const testWrongNumber = phoneVerification(23232)
    expect(testSwissNumber).toBe(true)
    expect(testWrongNumber).toBe(false)
})

test('date creation', () => {
    const testDateHyphen = dateCreator('02-11-1999', '1630')
    expect(testDateHyphen).toMatch('02-11-1999 16:30')
})

test('epochConverter', () => {
    const testEpoch = epochConverter('02-11-1999', '1630')
    expect(testEpoch).toEqual(941556600)
})

test('hexToRgbA', () => {
    expect(hexToRgbA('#000000', 0.6)).toMatch('rgba(0,0,0,0.6)')
    expect(hexToRgbA('#000000', 70)).toMatch('rgba(255,0,0,1)')
    expect(hexToRgbA('#00', 0.6)).toMatch('rgba(255,0,0,1)')
    expect(hexToRgbA('#ZZAABB', 0.6)).toMatch('rgba(255,0,0,1)')
    expect(hexToRgbA('#000000', 1)).toMatch('rgba(0,0,0,1)')
    expect(hexToRgbA('#000000', 0)).toMatch('rgba(0,0,0,0)')
    expect(hexToRgbA('#000000', '1')).toMatch('rgba(255,0,0,1)')
    expect(hexToRgbA('#000000', true)).toMatch('rgba(255,0,0,1)')
})

test('between', () => {
    const testBetweenOne = between(12, 20, 30)
    expect(testBetweenOne).toBe(false)
    const testBetweenTwo = between(25, 20, 30)
    expect(testBetweenTwo).toBe(true)
    const testBetweenThree = between(2.5, 20, 30)
    expect(testBetweenThree).toBe(false)
})
test('b64Conv', async () => {
    const base64 = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABJlBMVEUAAADjARXkABTkAhjkARzlABzlAh/kABzjARTjABPkAhflAR3lAB3lABrlABzkABrlAiDkABvnHDbziJj0k6Hxd4jpLEXyfI71lKL0kqH0j5/rOlLvZXj1m6jzipnnGTTlAR7qNEr74OTygpD4xczuWG73sr3609nwaXzwcIL62+Dwc4PuXG7mECzlAR/609jsRVj3vcTxfYzkABXydof3sLvlARvrPlP62d70nqnsTWDlBiL60dbxeYj73uLpMEfkABfyd4n4sLzlBCLkAx7qPFDzjZr73+TrQljkABzpNEr61NnqOlD3vsbyh5XlABv3sbzpKkPwdYPyhZH62t/rQVfnGjPwanzmESvqPFPwaX3mCSbrOlPqMUrziZjtUmblAh////9SFQjJAAAAC3RSTlMAUlJS/Pz8/FJSUoV0BZ0AAAABYktHRGGysEyGAAAAB3RJTUUH5AsXDA4BG4FJfwAAAKVJREFUGNNjYCAIGJlQADMDCysKYGPg5uHh4eXj4eHj4eMHMgUYBIWERUTFxCUkpaRlZOXkFRj4FZWUVURU1dQ1NLW0dXT1gAL6BoZGxiamZuYWllbWAkABG1s7ewdHJ2cXVzd3D08Gfi9vH18/f8cAgcCg4JBQTwbPsPCIyKjoGFWe2Li4eOsEoLWCPP7+PHxAxM/PD7SWhR0FsDFwcKIALsKeBQBtAxfPfnNW7QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0yM1QxMjoxNDowMSswMTowMGgQvo8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMjNUMTI6MTQ6MDErMDE6MDAZTQYzAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC'
    function fixBinary (bin) {
        var length = bin.length
        var buf = new ArrayBuffer(length)
        var arr = new Uint8Array(buf)
        for (var i = 0; i < length; i++) {
            arr[i] = bin.charCodeAt(i)
        }
        return buf
    }
    var binary = fixBinary(atob(base64))
    console.log(binary)
    var blob = new Blob([binary], { type: 'image/png' })
    const res = await b64Conv(blob)
    expect(res).toMatch('data:image/png;base64,' + base64)
    // b64Conv(blob).then(data => expect(data).toReturn(base64))
})
