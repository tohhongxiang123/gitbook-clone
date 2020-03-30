import React, { useState } from 'react'
import { ReactComponent as ArrowRight } from '../../assets/arrow_right.svg'
import { ReactComponent as ArrowDown } from '../../assets/arrow_down.svg'
import { Link } from 'react-router-dom'
import { ChapterList } from '../../types/Chapter'

interface SidebarCardProps {
    title: string,
    id: string,
    children: ChapterList[]
    depth?: number,
    basePath: string,
}

export default function SidebarCard({ title, children, id, basePath, depth = 0 }: SidebarCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (

        <div className={`${depth > 0 ? 'sidebar__item-nested' : ''} sidebar__item sidebar__link`}>
            <div className="sidebar__addItemContainer sidebar__addItemContainer-top">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <button className="sidebar__addItemButton">+</button>
                    <hr className="sidebar__item-border" />
                </div>
            </div>

            <div className="sidebar__addItemContainer sidebar__addItemContainer-bottom">
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <button className="sidebar__addItemButton">+</button>
                    <hr className="sidebar__item-border" />
                </div>
            </div>


            <div className="sidebar__item-content" onClick={() => setIsOpen(c => !c)}>
                <p style={{ margin: 0 }}><Link to={`${basePath}/${id}`}><span style={{ zIndex: 3, position: 'relative' }}>{title}</span></Link></p>
                {children.length > 0 ? <button className="sidebar__expandItemButton">{!isOpen ? <ArrowRight /> : <ArrowDown />}</button> : null}
            </div>

            {isOpen && children.length > 0 && children.map(child => <SidebarCard {...child} basePath={basePath} depth={depth + 1} key={child.id} />)}
        </div>
    )
}
