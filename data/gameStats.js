class GameStatsServices {
    init (dataProvider) {
        this.dataProvider = dataProvider
        this.gameStats = this.getGameStats.bind(this)
    }

    getGameStats () {
        return this.dataProvider.getGameStats()
    }

    getProgress () {
        const total = this.gameStats().activeChallengesCount
        const available = this.gameStats().availableChallengesCount
        return 100 * (total - available) / total
    }
}

const GameStatsInstance = new GameStatsServices()
export default GameStatsInstance
