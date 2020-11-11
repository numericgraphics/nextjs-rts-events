import DataProvider from '../data/dataProvider'
import event from '../mock/test-call-event'
import game from '../mock/test-call-get-game'

test('set data from event call', () => {
    expect(DataProvider).toBeDefined()
    DataProvider.setEventData(event)
    expect(DataProvider.data).toBeDefined()
})

test('get translation', () => {
    const translation = DataProvider.getTranslation()
    expect(translation).toBeDefined()
})

test('check if successChunk = 2', () => {
    const uiElements = DataProvider.getEventUiElements()
    expect(uiElements.successChunk).toContain('2')
})

test('set successChunk = 10', () => {
    DataProvider.setEventData({ uiElements: { successChunk: '10' } })
    expect(DataProvider.data.event.uiElements.successChunk).toContain('10')
})

test('add UiElement and reset all other : giftBarProgression', () => {
    DataProvider.setEventData({ uiElements: { giftBarProgression: '90' } })
    expect(DataProvider.data.event.uiElements.giftBarProgression).toContain('90')
    expect(DataProvider.data.event.uiElements.successChunk).toBeUndefined()
})

test('add UiElement : giftEnd', () => {
    const uiElements = DataProvider.getEventUiElements()
    DataProvider.setEventData({ uiElements: { ...uiElements, giftEnd: '2021' } })
    expect(DataProvider.data.event.uiElements.giftEnd).toContain('2021')
    expect(DataProvider.data.event.uiElements.giftBarProgression).toContain('90')
    expect(DataProvider.data.event.uiElements.giftBarProgression).toBeDefined()
})

test('reset uiElements', () => {
    DataProvider.setEventData({ uiElements: {} })
    const undefinedObject = {}
    expect(DataProvider.data.event.uiElements).toMatchObject(undefinedObject)
})

test('get gameStat', () => {
    const gameStats = DataProvider.getGameStats()
    expect(gameStats).toBeDefined()
})

test('set data from game call', () => {
    DataProvider.setData(game)
})

test('get data from game object', () => {
    expect(DataProvider.data.event.promos).toHaveLength(2)
    expect(DataProvider.data.uiElements).toMatchObject(game.uiElements)
    expect(DataProvider.data.user.nickname).toBe('TestMan')
})
