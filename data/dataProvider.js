import { isMobile } from 'react-device-detect'
import { isBrowserSimulation } from './tools'

class DataProvider {
    constructor () {
        this.data = {
            gameID: '',
            userID: '',
            EventShortName: '',
            recoScore: 0,
            user: {},
            event: {
                shortName: '',
                lang: '',
                baseURL: '',
                promos: '',
                startPageElements: [],
                gifts: [],
                fallbackThemeID: '',
                themeID: '',
                usePhoneNumber: false,
                theme: {},
                timeControl: 0,
                cguURL: '',
                translation: {},
                avatars: [],
                nicknames: [],
                challenges: {},
                importConfig: '',
                uiElements: {}
            },
            challengesStates: [],
            challenge: {},
            gameStats: {},
            uiElements: {},
            gifts: []
        }
    }

    setData (data) {
        Object.assign(this.data, data)
    }

    setEventData (data) {
        return Object.assign(this.data, {}, { event: Object.assign(this.data.event, data) })
    }

    setUser (data) {
        return Object.assign(this.data, {}, { user: Object.assign(this.data.user, data) })
    }

    getAllData () {
        return this.data
    }

    getGameStats () {
        return this.data.gameStats
    }

    getTheme () {
        return this.data.event.theme
    }

    getGifts () { // 2 gifts in new model
        return this.data.gifts
    }

    getPromos () {
        return this.data.event.promos
    }

    getTranslation () {
        return this.data.event.translation
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

    getUiElements () {
        return this.data.uiElements
    }

    getEventUiElements () {
        return this.data.event.uiElements
    }

    getStartPageElements () {
        return this.data.event.startPageElements
    }

    hasAvailableChallenges () {
        return this.data.gameStats.hasAvailableChallenges// (isMobile && !isBrowserSimulation()) ? this.data.gameStats.hasAvailableChallenges : this.data.gameStats.hasAvailableChallengesDesktop
    }

    getNextAvailableChallengeID () {
        return this.data.gameStats.nextAvailableChallengeID // (isMobile && !isBrowserSimulation()) ? this.data.gameStats.nextAvailableChallengeID : this.data.gameStats.nextAvailableChallengeIDDesktop
    }

    getAvatars () {
        return this.data.event.avatars
    }
}

const DataProviderInstance = new DataProvider()

export default DataProviderInstance
