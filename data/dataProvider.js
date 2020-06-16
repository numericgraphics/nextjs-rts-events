class DataProvider {
    constructor () {
        this.data = {}
    }

    setData (data) {
        this.data = data
    }

    getAllData () {
        return this.data
    }

    getTheme () {
        return this.data.theme
    }

    getGift () {
        return this.data.gifts
    }

    getPromos () {
        return this.data.promos
    }

    getTimeControl () {
        return this.data.timeControl
    }
}

const DataProviderInstance = new DataProvider()

export default DataProviderInstance
