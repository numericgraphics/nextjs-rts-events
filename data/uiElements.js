class UiElementsServices {
    init (dataProvider) {
        this.dataProvider = dataProvider
        this.getUiElements = this.getUiElements.bind(this)
    }

    getUiElements () {
        return this.dataProvider.getUiElements()
    }

    getEventUiElements () {
        return this.dataProvider.getEventUiElements()
    }
}

const UIElementsInstance = new UiElementsServices()
export default UIElementsInstance
