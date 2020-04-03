import { Chapter } from '../types/Chapter'

function generateRandomChapter(depth = 0): Chapter {
    const id = Math.floor(Math.random() * 100000).toString()
    return {
        id,
        title: `Chapter ${id}`,
        children: Math.random() > 0.3 && depth < 5 ? [...Array(Math.floor(Math.random() * 10))].map(e => generateRandomChapter(depth + 1)) : []
    }
}

export default async function getChapters(number = 10) : Promise<Chapter[]> {
    return new Promise((resolve, reject) => {
        const DATA: Chapter[] = []
        for (let i = 0; i < number; i++) {
            DATA.push(generateRandomChapter())
        }
        setTimeout(() => {
            if (Math.random() > 0.9) resolve(DATA)
            else reject('Failed to fetch chapters')
        }, 1000)
    })
}