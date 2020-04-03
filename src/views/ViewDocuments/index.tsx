import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Previewer from './Previewer'
import SidebarCard from './SidebarCard'
import client from '../../api/client'
import { usePromise } from '../../api/usePromise'
import { useRouteMatch, Route } from 'react-router-dom'
import { Chapter } from '../../types/Chapter'
import InfoText from '../../components/InfoText'

export default function ViewDocuments() {
    const [{ isLoading: isFetchingChapters, data: initialChaptersData, error: fetchChaptersError }] = usePromise(
        (numberOfChapters: number) => client.getChapters(numberOfChapters), [], 10)
    const [chapters, setChapters] = useState<Chapter[]>([])

    useEffect(() => {
        if (initialChaptersData) setChapters(initialChaptersData)
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

        setChapters(prevChapters => recursivelyAddChapter(prevChapters, indices, chapter))
    }

    const match = useRouteMatch<{ documentID: string }>()

    const sidebarItems = isFetchingChapters ?
        <p>Loading...</p> :
        chapters.map((chapter, index) => <SidebarCard {...chapter} index={index} key={chapter.id} basePath={match.url} addChapter={addChapter} isLoading={isAddingChapter} />)
    return (
        <div className="home">
            <Sidebar title="Title">
                {sidebarItems}
                {fetchChaptersError && <InfoText variant="danger">{fetchChaptersError}</InfoText>}
            </Sidebar>
            <Route path={`${match.url}/:documentID`}>
                <Previewer />
            </Route>
        </div>
    )
}

function recursivelyAddChapter(currentChapters: Chapter[], indices: number[], newChapter: Chapter): Chapter[] {
    const currentIndex = indices[0]

    if (indices.length === 1) {
        return currentIndex < 0 ?
            [newChapter, ...currentChapters] :
            [...currentChapters.slice(0, currentIndex), newChapter, ...currentChapters.slice(currentIndex)]
    }

    return [...currentChapters.slice(0, currentIndex), { ...currentChapters[currentIndex], children: recursivelyAddChapter(currentChapters[currentIndex].children, indices.slice(1), newChapter) }, ...currentChapters.slice(currentIndex + 1)]
}