export interface Chapter {
    id: string,
    title: string,
    text: string
}

export interface ChapterList extends Omit<Chapter, 'text'> {
    children: ChapterList[]
}