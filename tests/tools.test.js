import {
    hexToRgbA,
    getAllImagesFromJSON,
    preLoadImage,
    phoneVerification,
    dateCreator,
    epochConverter,
    between
} from '../data/tools'
import data from '../mock/test-call-event'

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
