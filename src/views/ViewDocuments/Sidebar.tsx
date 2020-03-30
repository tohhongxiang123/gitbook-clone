import React from 'react'

interface SidebarProps {
    title: string,
    children: React.ReactNode
}

export default function Sidebar({title, children}: SidebarProps) {
    return (
        <nav className="sidebar">
            <h2 className="sidebar__header">{title}</h2>
            <ul className="sidebar__list">
                {children && Array.isArray(children) ? children.map((child, index) => (
                    <li key={index}>
                        {child}
                    </li>
                )) : children}
            </ul>
        </nav>
    )
}
