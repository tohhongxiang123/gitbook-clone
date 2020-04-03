export interface ChapterPreview {
    id: string,
    title: string,
    text: string
}

export interface Chapter extends Omit<ChapterPreview, 'text'> {
    children: Chapter[]
}