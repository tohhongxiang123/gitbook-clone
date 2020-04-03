import getChapters from './getChapters'
import getChapter from './getChapter'
import addChapter from './addChapter'
import { ChapterPreview, Chapter } from '../types/Chapter'

class Api {
    getChapters : (numberOfChapters: number) => Promise<Chapter[]>
    getChapter: (chapterID: ChapterPreview['id']) => Promise<ChapterPreview>
    addChapter: (chapter: Chapter) => Promise<Chapter>

    constructor() {
        this.getChapters = getChapters
        this.getChapter = getChapter
        this.addChapter = addChapter
    }
}

export default new Api()