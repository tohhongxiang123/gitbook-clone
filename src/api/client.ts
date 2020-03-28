import getChapters from './getChapters'

class Api {
    async getChapters(numberOfChapters: number) {
        return await getChapters(numberOfChapters ?? Math.floor(Math.random()*1000))
    }
}

export default new Api()