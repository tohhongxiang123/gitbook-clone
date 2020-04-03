import React, { useState } from 'react'
import { ReactComponent as ArrowRight } from '../../assets/arrow_right.svg'
import { ReactComponent as ArrowDown } from '../../assets/arrow_down.svg'
import { Link } from 'react-router-dom'
import { Chapter } from '../../types/Chapter'

interface SidebarCardProps {
    title: string,
    id: string,
    index: number,
    children: Chapter[]
    indices?: number[]
    basePath: string,
    addChapter: (indices: number[]) => void
    isLoading: boolean
}

export default function SidebarCard({ title, children, id, basePath, addChapter, isLoading, index, indices=[] }: SidebarCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (

        <div className={`${indices.length > 0 ? 'sidebar__item-nested' : ''} sidebar__item sidebar__link`}>
            <div className="sidebar__addItemContainer sidebar__addItemContainer-top">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <button className="sidebar__addItemButton" onClick={() => addChapter([...indices, index])} disabled={isLoading}>+</button>
                    <hr className="sidebar__item-border" />
                </div>
            </div>

            <div className="sidebar__addItemContainer sidebar__addItemContainer-bottom">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <button className="sidebar__addItemButton" onClick={() => addChapter([...indices, index + 1])} disabled={isLoading}>+</button>
                    <hr className="sidebar__item-border" />
                </div>
            </div>

            <div className="sidebar__item-content" onClick={() => setIsOpen(c => !c)}>
                <p style={{ margin: 0 }}><Link to={`${basePath}/${id}`}><span style={{ zIndex: 3, position: 'relative' }}>{title}</span></Link></p>
                {children.length > 0 ? <button className="sidebar__expandItemButton">{!isOpen ? <ArrowRight /> : <ArrowDown />}</button> : null}
            </div>

            {isOpen && children.length > 0 && children.map((child, childIndex) => (
                <SidebarCard 
                    {...child} 
                    index={childIndex} 
                    basePath={basePath} 
                    key={child.id} 
                    indices={[...indices, index]} 
                    addChapter={addChapter} 
                    isLoading={isLoading}
                />
            ))}
        </div>
    )
}
