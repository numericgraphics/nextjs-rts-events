class ScoreServices {
    init (dataProvider) {
        this.dataProvider = dataProvider
        this.getChallengesStates = this.getChallengesStates.bind(this)
        this.getChallenges = this.getChallenges.bind(this)
        this.gameStats = this.getGameStats.bind(this)
    }

    getGameStats () {
        return this.dataProvider.getGameStats()
    }

    getChallenges () {
        return this.dataProvider.getChallenges()
    }

    getChallengesStates () {
        return this.dataProvider.getChallengesStates()
    }

    getProgress () {
        const total = this.gameStats().totalChallengesCount
        const available = this.gameStats().availableChallengesCount
        return 100 * (total - available) / total
    }

    getUserPoints () {
        const challenges = this.getChallengesStates()
        if (challenges === undefined || challenges.length === 0) {
            return 0
        }
        // TODO : Get points from  user -- bug some points are null
        // const result = challenges.reduce((a, b) => a + b.points)
        return 0
    }

    getUserSuccess () {
        const challenges = this.getChallengesStates()
        if (challenges === undefined || challenges.length === 0) {
            return 0
        }
        return challenges.filter(challenge => challenge.success === true).length
    }

    getUserErrors () {
        return this.getChallengesTotalNumber() - this.getUserSuccess()
    }

    getChallengesTotalNumber () {
        const challenges = this.getChallengesStates()
        if (challenges === undefined || challenges.length === 0) {
            return 0
        }
        return challenges.length
    }
}

const ScoreServicesInstance = new ScoreServices()
export default ScoreServicesInstance
