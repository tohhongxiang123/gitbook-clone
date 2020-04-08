import React from 'react'

interface InfoTextProps {
    children: React.ReactNode
    variant: 'danger' | 'success',
    className?: string,
    style?: object
}

export default function InfoText({ variant, children, className, style }: InfoTextProps) {
    return (
        <div className={`${variant} alert ${className}`} {...{style}}>
            {children}
        </div>
    )
}
