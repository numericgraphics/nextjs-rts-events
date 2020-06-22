class DataProvider {
    constructor () {
        this.data = {}
    }

    setData (data) {
        Object.assign(this.data, data)
    }

    getAllData () {
        return this.data
    }

    getTheme () {
        return this.data.theme
    }

    getGifts () {
        return this.data.gifts
    }

    getPromos () {
        return this.data.promos
    }

    getTimeControl () {
        return this.data.timeControl
    }

    getTranslation () {
        return this.data.translation
    }

    getUser () {
        return this.data.user
    }
}

const DataProviderInstance = new DataProvider()

export default DataProviderInstance
