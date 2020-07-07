class DataProvider {
    constructor () {
        this.data = {
            user: {},
            quiz: [],
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

    getQuiz () {
        return this.data.quiz
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
