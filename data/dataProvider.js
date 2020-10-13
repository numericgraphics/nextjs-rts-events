class DataProvider {
    constructor () {
        this.data = {
            user: {},
            challenge: {},
            gifts: [],
            promos: [],
            theme: {},
            timeControl: {},
            translation: {},
            hasAvailableChallenges: true,
            gameStats: {},
            uiElements: {},
            startPageElements: []
        }
    }

    setData (data) {
        Object.assign(this.data, data)
    }

    getAllData () {
        return this.data
    }

    getGameStats () {
        return this.data.gameStats
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

    getChallenges () {
        return this.data.challenges
    }

    getChallengesStates () {
        return this.data.challengesStates
    }

    getUiElements () {
        return this.data.uiElements
    }

    getStartPageElements () {
        return this.data.startPageElements
    }

    hasAvailableChallenges () {
        return this.data.gameStats.hasAvailableChallenges
    }
}

const DataProviderInstance = new DataProvider()

export default DataProviderInstance
