import { useState, useEffect, useContext } from 'react'
import UserContext from '../components/UserContext'

export const useHeight = () => {
    const { dataProvider } = useContext(UserContext)
    const [height, setHeight] = useState(dataProvider.innerHeight)
    const handleResize = () => setHeight(window.innerHeight)
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [handleResize])
    return height
}
//document && document.documentElement && document.documentElement.clientHeight || window.innerHeight
