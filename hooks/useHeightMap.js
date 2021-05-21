import { useState, useEffect } from 'react'
export const useHeightMap = () => {
    const [height, setHeight] = useState()
    const handleResize = () => setHeight(window.innerHeight + 'px')

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])

    console.log(height)
    return height
}
