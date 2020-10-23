import DataProvider from '../data/dataProvider'

test('get translation', () => {
    const translation = DataProvider.getTranslation()
    expect(translation).toBeDefined()
})

test('get start page element', () => {
    const startElements = DataProvider.getStartPageElements()
    expect(startElements).toBeDefined()
})

test('get UiElements', () => {
    const uiElements = DataProvider.getUiElements()
    expect(uiElements).toBeDefined()
})

test('get gameStat', () => {
    const gameStats = DataProvider.getGameStats()
    expect(gameStats).toBeDefined()
})
