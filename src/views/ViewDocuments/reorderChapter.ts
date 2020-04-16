import { Chapter, ChapterOrder } from '../../types/Chapter'

export default function reorderChapter(chapterId: Chapter['id'], sourceIds: Chapter['id'][], from: number, destinationIds: Chapter['id'][], to: number, chapterOrder: ChapterOrder) {
    const chapterToMove = {
        id: chapterId,
        children: [...sourceIds, from.toString()].reduce((accum, currentVal) => {
            if (currentVal === 'root') return accum
            return accum[parseInt(currentVal)].children
        }, chapterOrder)
    }
    const removedChapterArray = removeChapter(sourceIds, from, chapterOrder)
    const updatedChapterArray = addChapterBack(destinationIds, to, removedChapterArray, chapterToMove)
    return updatedChapterArray
}

function removeChapter(sourceIds: Chapter['id'][], from: number, chapterOrder: ChapterOrder) : ChapterOrder {
    const updatedArray = JSON.parse(JSON.stringify(chapterOrder))
    if (sourceIds[0] === 'root' || sourceIds.length === 0) {
        updatedArray.splice(from, 1)
        return updatedArray
    }

    const parentIndex = parseInt(sourceIds[0])
    const updatedChildren = removeChapter(
        sourceIds.slice(1, sourceIds.length),
        from,
        updatedArray[parentIndex].children
    )

    const result = [
        ...updatedArray.slice(0, parentIndex),
        {
            id: updatedArray[parentIndex].id,
            children: updatedChildren
        },
        ...updatedArray.slice(parentIndex + 1)
    ]
    return result
}

function addChapterBack(destinationIds: Chapter['id'][], to: number, chapterOrder: ChapterOrder, chapterToAdd: ChapterOrder[number]) : ChapterOrder {
    const updatedArray = JSON.parse(JSON.stringify(chapterOrder))
    if (destinationIds[0] === 'root' || destinationIds.length === 0) {
        updatedArray.splice(to, 0, chapterToAdd)
        return updatedArray
    }

    const parentIndex = parseInt(destinationIds[0])
    const updatedChildren = addChapterBack(
        destinationIds.slice(1, destinationIds.length),
        to,
        updatedArray[parentIndex].children,
        chapterToAdd
    )
    
    return [
        ...updatedArray.slice(0, parentIndex),
        {
            id: updatedArray[parentIndex].id,
            children: updatedChildren
        },
        ...updatedArray.slice(parentIndex + 1)
    ]
}