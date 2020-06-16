class DataProvider {
    constructor () {
        this.data = {}
        this.setData = this.setData.bind(this)
        this.getAllData = this.getAllData.bind(this)
        this.getTheme = this.getTheme.bind(this)
        this.getGift = this.getGift.bind(this)
        this.getTimeControl = this.getTimeControl.bind(this)
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

    getTimeControl () {
        return this.data.timeControl
    }
}

const DataProviderInstance = new DataProvider()

export default DataProviderInstance
