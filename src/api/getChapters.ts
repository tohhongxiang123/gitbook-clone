import { Chapter } from '../types/Chapter'

function generateRandomChapter(depth = 0): Chapter {
    const id = Math.floor(Math.random() * 100000).toString()
    return {
        id,
        title: `Chapter ${id}`,
        text: 'Hello cruel world',
        children: Math.random() > 0.4 && depth < 5 ? [...Array(Math.floor(Math.random() * 5))].map(e => generateRandomChapter(depth + 1)) : []
    }
}

export default async function getChapters(number = 10) : Promise<Chapter[]> {
    return new Promise((resolve, reject) => {
        const DATA: Chapter[] = []
        for (let i = 0; i < number; i++) {
            DATA.push(generateRandomChapter())
        }
        setTimeout(() => {
            Math.random() > 0.01 ? resolve(DATA) : reject('Failed to fetch because of destiny')
        }, 1000)
    })
}