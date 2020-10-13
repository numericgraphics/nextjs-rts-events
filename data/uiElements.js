class UiElementsServices {
    init (dataProvider) {
        this.dataProvider = dataProvider
        this.getUiElements = this.getUiElements.bind(this)
    }

    getUiElements () {
        return this.dataProvider.getUiElements()
    }
}

const UIElementsInstance = new UiElementsServices()
export default UIElementsInstance
