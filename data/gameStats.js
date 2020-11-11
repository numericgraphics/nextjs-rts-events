export class GameStatsServices {
    init (dataProvider) {
        this.dataProvider = dataProvider
        this.gameStats = this.getGameStats.bind(this)
    }

    getGameStats () {
        return this.dataProvider.getGameStats()
    }

    getProgress () {
        return this.gameStats().progress
    }
}

const GameStatsInstance = new GameStatsServices()
export default GameStatsInstance
