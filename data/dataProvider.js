class DataProvider {
    constructor () {
        this.data = {
            user: {},
            challenge: [],
            gifts: [],
            promos: [],
            theme: {},
            timeControl: {},
            translation: {},
            challengesStates: [],
            hasAvailableChallenges: true,
            score: null
        }
    }

    setData (data) {
        console.log('setData before', data)
        Object.assign(this.data, data)
        console.log('setData', this.data)
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

    getChallenge () {
        return this.data.challenge
    }

    getChallengesStates () {
        return this.data.challengesStates
    }

    hasAvailableChallenges () {
        return this.data.hasAvailableChallenges
    }
}

const DataProviderInstance = new DataProvider()

export default DataProviderInstance
