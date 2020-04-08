import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Previewer from './Previewer'
import SidebarCard from './SidebarCard'
import client from '../../api/client'
import { usePromise } from '../../api/usePromise'
import { useRouteMatch, Route } from 'react-router-dom'
import { Chapter } from '../../types/Chapter'
import InfoText from '../../components/InfoText'

type ChapterOrder = { id: Chapter['id'], children: ChapterOrder }[]

export default function ViewDocuments() {
    const [{ isLoading: isFetchingChapters, data: initialChaptersData, error: fetchChaptersError }] = usePromise(
        (numberOfChapters: number) => client.getChapters(numberOfChapters), [], 10)
    const [chapterOrder, setChapterOrder] = useState<ChapterOrder>([])
    const [allChapters, setAllChapters] = useState<{ [id: string]: Chapter }>({})

    useEffect(() => {
        function getChapterIds(chapter: Chapter): ChapterOrder[number] {
            return {
                id: chapter.id,
                children: chapter.children.map(childChapter => getChapterIds(childChapter))
            }
        }

        function addChapterToOverallChapters(chapter: Chapter): void {
            if (chapter.children.length > 0) {
                chapter.children.forEach(childChapter => addChapterToOverallChapters(childChapter))
            }
            return setAllChapters(prevChapters => ({
                ...prevChapters,
                [chapter.id]: { id: chapter.id, title: chapter.title, children: [] }
            }))
        }

        if (initialChaptersData) {
            setChapterOrder(initialChaptersData.map(chapter => getChapterIds(chapter)));
            initialChaptersData.forEach(chapter => addChapterToOverallChapters(chapter));
        }
    }, [initialChaptersData])

    const [{ isLoading: isAddingChapter }, handleAddChapter] = usePromise(
        (chapter: Chapter) => client.addChapter(chapter), null
    )

    const addChapter = async (indices: number[]) => {
        const generatedID = Math.floor(Math.random() * 1000000).toString()
        const newChapter = {
            id: generatedID,
            title: 'Chapter ' + generatedID,
            text: 'This is some random text',
            children: [] as Chapter['children']
        }

        const { data: chapter, error } = await handleAddChapter(newChapter)
        if (error || !chapter) return alert(error)


        function recursivelyAddChapter(currentChapters: ChapterOrder, indices: number[], chapterId: Chapter['id']): ChapterOrder {
            const currentIndex = indices[0]
            const chapterToAdd = { id: chapterId, children: [] }

            if (indices.length === 1) {
                return currentIndex < 0 ?
                    [chapterToAdd, ...currentChapters] :
                    [...currentChapters.slice(0, currentIndex), chapterToAdd, ...currentChapters.slice(currentIndex)]
            }

            return [
                ...currentChapters.slice(0, currentIndex),
                {
                    ...currentChapters[currentIndex],
                    children: recursivelyAddChapter(currentChapters[currentIndex].children, indices.slice(1), chapterId)
                },
                ...currentChapters.slice(currentIndex + 1)
            ]
        }

        setChapterOrder(prevChapters => recursivelyAddChapter(prevChapters, indices, chapter.id))
        setAllChapters(prevChapters => ({
            ...prevChapters,
            [chapter.id]: newChapter
        }))
    }

    const match = useRouteMatch<{ documentID: string }>()

    function getChapterFromIds(chapterOrder: ChapterOrder[number]): Chapter {
        return {
            ...allChapters[chapterOrder.id],
            children: chapterOrder.children.length > 0 ? chapterOrder.children.map(child => getChapterFromIds(child)) : []
        }
    }

    const sidebarItems = isFetchingChapters ?
        <p>Loading...</p> :
        chapterOrder.map((chapter, index) => <SidebarCard
            {...getChapterFromIds(chapter)}
            index={index}
            key={chapter.id}
            basePath={match.url}
            addChapter={addChapter}
            isLoading={isAddingChapter}
        />)
    return (
        <div className="home">
            <Sidebar title="Title">
                {sidebarItems}
                {fetchChaptersError && <InfoText variant="danger" style={{margin: '1em'}}>{fetchChaptersError}</InfoText>}
            </Sidebar>
            <Route path={`${match.url}/:documentID`}>
                <Previewer />
            </Route>
        </div>
    )
}