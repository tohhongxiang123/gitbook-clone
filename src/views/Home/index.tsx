import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Previewer from './Previewer'
import SidebarCard from './SidebarCard'
import client from '../../api/client'
import usePromise from '../../api/usePromise'

export default function Home() {
    const [{isLoading, data: chapters, error}, getChapters] = usePromise(
        (numberOfChapters: number) => client.getChapters(numberOfChapters), [])

    useEffect(() => {
        getChapters(10)
    }, [getChapters])

    const sidebarItems = isLoading ? 
        <p>Loading...</p> : 
        chapters.map(chapter => <SidebarCard {...chapter} key={chapter.id} />)
    return (
        <div className="home">
            <Sidebar title="Title">
                {sidebarItems}
                {error && <p>{error}</p>}
            </Sidebar>
            <Previewer />
        </div>
    )
}
