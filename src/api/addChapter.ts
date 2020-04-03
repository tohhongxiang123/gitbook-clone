import { Chapter } from "../types/Chapter"

export default async function addChapter(chapter: Chapter) : Promise<Chapter> {
    return new Promise((resolve, reject) => setTimeout(() => {
        if (Math.random() > 0.1) resolve(chapter)
        else reject('Failed to add chapter')
    }, 1000))
}