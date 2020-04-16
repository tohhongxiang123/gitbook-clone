export interface ChapterPreview {
    id: string,
    title: string,
    text: string
}

export interface Chapter extends ChapterPreview {
    children: Chapter[]
}


export type ChapterOrder = { id: Chapter['id'], children: ChapterOrder }[]