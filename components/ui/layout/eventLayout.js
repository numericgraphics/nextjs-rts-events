import React, { useEffect } from 'react'

export const siteTitle = 'TODO:SiteTitle'

export default function EventLayout ({ children, home }) {
    // TODO handle resize for redraw  with timeout
    function handleResize () {}

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={['container', 'z-index-content '].join(' ')} >
            {
                <React.Fragment>
                    {/* <Box className="backgroundPadding"/> */}
                    {children}
                </React.Fragment>
            }
        </div>
    )
}
