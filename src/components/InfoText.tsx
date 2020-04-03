import React from 'react'

interface InfoTextProps {
    children: React.ReactNode
    variant: 'danger' | 'success'
}

export default function InfoText({ variant, children }: InfoTextProps) {
    return (
        <div className={`${variant} alert`}>
            {children}
        </div>
    )
}
