import DataProvider from '../data/dataProvider'
import data from '../mock/test-dataProvider'

test('get translation', () => {
    DataProvider.setData(data)
    const translation = DataProvider.getTranslation()
    expect(translation).toBeDefined()
})

test('check if successChunk = 2', () => {
    const uiElements = DataProvider.getUiElements()
    expect(uiElements.successChunk).toContain('2')
})

test('set successChunk = 10', () => {
    DataProvider.setData({ uiElements: { successChunk: '10' } })
    expect(DataProvider.data.uiElements.successChunk).toContain('10')
})

test('add UiElement and reset all other : giftBarProgression', () => {
    DataProvider.setData({ uiElements: { giftBarProgression: '90' } })
    expect(DataProvider.data.uiElements.giftBarProgression).toContain('90')
    expect(DataProvider.data.uiElements.successChunk).toBeUndefined()
})

test('add UiElement : giftEnd', () => {
    const uiElements = DataProvider.getUiElements()
    DataProvider.setData({ uiElements: { ...uiElements, giftEnd: '2021' } })
    console.log('dataProvider', DataProvider)
    expect(DataProvider.data.uiElements.giftEnd).toContain('2021')
    expect(DataProvider.data.uiElements.giftBarProgression).toBeDefined()
})

test('reset uiElements', () => {
    DataProvider.setData({ uiElements: {} })
    const undefinedObject = {}
    expect(DataProvider.data.uiElements).toMatchObject(undefinedObject)
})

test('get gameStat', () => {
    const gameStats = DataProvider.getGameStats()
    expect(gameStats).toBeDefined()
})
