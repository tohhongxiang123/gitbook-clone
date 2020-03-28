import { Chapter } from '../types/Chapter'

function generateRandomChapter(depth = 0): Chapter {
    const id = Math.floor(Math.random() * 100000).toString()
    return {
        id,
        title: `Chapter ${id}`,
        children: Math.random() > 0.9 ? [...Array(Math.floor(Math.random() * 10))].map(e => generateRandomChapter(depth + 1)) : []
    }
}

export default async function getChapters(number = 10) : Promise<Chapter[]> {
    return new Promise((resolve, reject) => {
        const DATA: Chapter[] = []
        for (let i = 0; i < number; i++) {
            DATA.push(generateRandomChapter())
        }
        setTimeout(() => resolve(DATA), 1000)
    })
}