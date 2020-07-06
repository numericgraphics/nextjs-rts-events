class ScoreServices {
    init (dataProvider) {
        this.dataProvider = dataProvider
        this.getChallengesStates = this.getChallengesStates.bind(this)
    }

    getChallengesStates () {
        return this.dataProvider.getChallengesStates()
    }

    getUserPoints () {
        const challenges = this.getChallengesStates()
        if (challenges === undefined || challenges.length === 0) {
            return 0
        }
        // TODO : Get points from  user -- bug some points are null
        console.log('getUserPoints challenges', challenges)
        const result = challenges.reduce((a, b) => a + b.points)
        console.log('getUserPoints result', result)
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
