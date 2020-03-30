import { Chapter } from '../types/Chapter'

export default async function getChapter(chapterID: Chapter['id']) : Promise<Chapter> {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({
            id: chapterID,
            title: 'Chapter ' + chapterID,
            text: 'This is some random text'
        }), 1000)
    })
}