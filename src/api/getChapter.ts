import { ChapterPreview } from '../types/Chapter'

export default async function getChapter(chapterID: ChapterPreview['id']) : Promise<ChapterPreview> {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({
            id: chapterID,
            title: 'Chapter ' + chapterID,
            text: 'This is some random text'
        }), 1000)
    })
}