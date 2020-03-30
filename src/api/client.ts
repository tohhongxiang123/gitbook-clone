import getChapters from './getChapters'
import getChapter from './getChapter'
import { Chapter, ChapterList } from '../types/Chapter';

class Api {
    getChapters : (numberOfChapters: number) => Promise<ChapterList[]>;
    getChapter: (chapterID: Chapter['id']) => Promise<Chapter>;

    constructor() {
        this.getChapters = getChapters
        this.getChapter = getChapter
    }
}

export default new Api()