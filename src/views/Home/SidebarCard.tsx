import React, { useState } from 'react'
import { ReactComponent as ArrowRight } from '../../assets/arrow_right.svg'
import { ReactComponent as ArrowDown } from '../../assets/arrow_down.svg'
import { Link } from 'react-router-dom'

interface SidebarCardProps {
    title: string,
    id: string,
    depth?: number,
    children: SidebarCardProps[]
}

export default function SidebarCard({ title, children, id, depth = 0 }: SidebarCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        
        <div className={`${depth > 0 ? 'sidebar__item-nested' : ''} sidebar__item sidebar__link`}>
            <div className="sidebar__addItemContainer sidebar__addItemContainer-top">
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                <button className="sidebar__addItemButton">+</button>
                <hr className="sidebar__item-border" />
                </div>
            </div>

            <div className="sidebar__addItemContainer sidebar__addItemContainer-bottom">
                <div style={{position: 'relative', width: '100%', height: '100%'}}>
                    <button className="sidebar__addItemButton">+</button>
                    <hr className="sidebar__item-border" />
                </div>
            </div>

            
            <div className="sidebar__item-content" onClick={() => setIsOpen(c => !c)}>
                <p style={{ margin: 0, zIndex: 3 }}><Link to={`/${id}`}>{title}</Link></p>
                {children.length > 0 ? <button className="sidebar__expandItemButton">{!isOpen ? <ArrowRight /> : <ArrowDown />}</button> : null}
            </div>

            {isOpen && children.length > 0 && children.map(child => <SidebarCard {...child} depth={depth + 1} key={child.id} />)}
        </div>
    )
}
