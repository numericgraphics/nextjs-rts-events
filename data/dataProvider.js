class DataProvider {
    constructor () {
        this.data = {
            user: {},
            challenge: {},
            challenges: [],
            gifts: [],
            promos: [],
            theme: {},
            timeControl: {},
            translation: {},
            challengesStates: [],
            hasAvailableChallenges: true,
            score: {}
        }
    }

    setData (data) {
        Object.assign(this.data, data)
    }

    getAllData () {
        return this.data
    }

    getScore () {
        return this.data.score
    }

    getTheme () {
        return this.data.theme
    }

    getGifts () {
        return this.data.gifts
    }

    getPromos () {
        console.log('getPromo')
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

    hasAvailableChallenges () {
        return this.data.hasAvailableChallenges
    }
}

const DataProviderInstance = new DataProvider()

export default DataProviderInstance
