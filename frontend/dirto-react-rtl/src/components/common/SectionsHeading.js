import React from 'react'
import { GrCaretDown } from 'react-icons/gr'

export default function SectionsHeading({ children, title, desc, titleClass, descClass }) {
    return (
        <>
            <div className="section-heading">
                {
                    title ? (<h2 className={'sec__title '+titleClass}><span className="sec__title_icon"><GrCaretDown /></span>{title}</h2>) : ' '
                }
                {
                    desc ? (<p className={'sec__desc '+descClass}>{desc}</p>) : ' '
                }
            </div>
            {children}
        </>
    )
}
