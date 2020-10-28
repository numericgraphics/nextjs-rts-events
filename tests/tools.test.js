import { getAllImagesFromJSON, preLoadImage, phoneVerification } from '../data/tools'
import data from '../mock/test-call-event'

test('get images from JSON using getAllImagesFromJSON function', () => {
    const images = getAllImagesFromJSON(data, [], ['.jpg', '.png', '.jpeg', '.image?'])
    expect(images).toHaveLength(3)
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