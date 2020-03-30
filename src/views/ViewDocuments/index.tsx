import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Previewer from './Previewer'
import SidebarCard from './SidebarCard'
import client from '../../api/client'
import { usePromise } from '../../api/usePromise'
import { useRouteMatch, Route } from 'react-router-dom'

export default function ViewDocuments() {
    const [{ isLoading, data: chapters, error }, getChapters] = usePromise(
        (numberOfChapters: number) => client.getChapters(numberOfChapters), [])

    useEffect(() => {
        getChapters(100)
    }, [getChapters])

    const match = useRouteMatch<{ documentID: string }>()

    const sidebarItems = isLoading ?
        <p>Loading...</p> :
        chapters.map(chapter => <SidebarCard {...chapter} key={chapter.id} basePath={match.url} />)
    return (
        <div className="home">
            <Sidebar title="Title">
                {sidebarItems}
                {error && <p>{error}</p>}
            </Sidebar>
            <Route path={`${match.url}/:documentID`}>
                <Previewer />
            </Route>
        </div>
    )
}
