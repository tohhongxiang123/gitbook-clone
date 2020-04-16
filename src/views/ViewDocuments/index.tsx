import React, { useState, useEffect } from 'react'
import SortableTree, { insertNode } from 'react-sortable-tree'
import { usePromise } from '../../api/usePromise'
import client from '../../api/client'
import { Chapter } from '../../types/Chapter'
import NodeRenderer from './NodeRenderer'
import { useRouteMatch, Link, Route } from 'react-router-dom'
import Previewer from './Previewer'
import InfoText from '../../components/InfoText'

export default function ViewDocuments() {
    const [{ isLoading, error, data }] = usePromise(() => client.getChapters(500), [])
    const [chapterData, setChapterData] = useState<Chapter[]>([])

    useEffect(() => {
        if (data) {
            setChapterData(data)
        }
    }, [data])

    const generateNewChapter = (): Chapter => ({
        id: Math.floor(Math.random() * 1000).toString(),
        title: 'Title of the new chapter',
        text: 'Some text nonsense',
        children: []
    })

    const addChapter = (path: any, indexToInsertInto: number) => setChapterData(prevChapterData => insertNode({
        treeData: prevChapterData,
        depth: path.length - 1,
        minimumTreeIndex: indexToInsertInto,
        expandParent: true,
        getNodeKey: ({ treeIndex }) => treeIndex,
        newNode: generateNewChapter()
    }).treeData as Chapter[])

    const [searchQuery, setSearchQuery] = useState('')
    const [numberOfMatches, setNumberOfMatches] = useState(0)
    const [currentMatchToFocusOn, setCurrentMatchToFocusOn] = useState(0)
    const searchMethod = ({ node, searchQuery }: { node: any, searchQuery: string }) => searchQuery && node.title.toLowerCase().includes(searchQuery)

    const match = useRouteMatch<{ documentID: string }>()
    return (
        <div className="home">
            {isLoading ? <p>Loading...</p> : (
                <nav style={{ height: '100vh', display: 'grid', gridAutoFlow: 'row', gridTemplateRows: error ? 'repeat(2, min-content) 1fr min-content' : 'min-content 1fr min-content' }}>
                    <h2>This is the title</h2>
                    {error && <InfoText variant="danger">{error}</InfoText>}
                    <SortableTree nodeContentRenderer={NodeRenderer as any}
                        searchQuery={searchQuery}
                        scaffoldBlockPxWidth={0}
                        generateNodeProps={({ node, path, treeIndex }) => ({
                            title: <Link to={`${match.url}/${node.id}`}>{node.title}</Link>,
                            buttons: [
                                <div className="sidebar__addItemContainer sidebar__addItemContainer-top">
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <button className="sidebar__addItemButton" onClick={() => addChapter(path, treeIndex)}>+</button>
                                        <hr className="sidebar__item-border" />
                                    </div>
                                </div>,
                                <div className="sidebar__addItemContainer sidebar__addItemContainer-bottom">
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        <button className="sidebar__addItemButton" onClick={() => addChapter(path, treeIndex + 1)}>+</button>
                                        <hr className="sidebar__item-border" />
                                    </div>
                                </div>
                            ]
                        })}
                        onlyExpandSearchedNodes={true}
                        searchMethod={searchMethod}
                        searchFocusOffset={currentMatchToFocusOn}
                        searchFinishCallback={matches => setNumberOfMatches(matches.length)}
                        style={{ width: '300px', overflowX: 'hidden', height: '100%' }}
                        treeData={chapterData} onChange={data => setChapterData(data as any)} />
                    <div style={{ padding: '0.375em' }}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                            {numberOfMatches > 0 && <div>
                                <button onClick={() => setCurrentMatchToFocusOn(prev => (prev - 1 + numberOfMatches) % numberOfMatches)}>&lt;</button>
                                <button onClick={() => setCurrentMatchToFocusOn(prev => (prev + 1) % numberOfMatches)}>&gt;</button>
                            </div>}
                        </div>
                        {searchQuery ? <p style={{ textAlign: 'right', margin: 0 }}><small>{numberOfMatches > 0 ? `${currentMatchToFocusOn + 1}/${numberOfMatches}` : 'No matches'}</small></p> : null}
                    </div>
                </nav>
            )}

            <Route path={`${match.path}/:documentID`}>
                <Previewer />
            </Route>
        </div>
    )
}
