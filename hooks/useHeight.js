import { useState, useEffect, useContext } from 'react'
import UserContext from '../components/UserContext'

export const useHeight = () => {
    const { dataProvider } = useContext(UserContext)
    const [height, setHeight] = useState(dataProvider.innerHeight)
    const handleResize = () => setHeight(window.innerHeight)
    const handleOnload = () => setHeight(window.innerHeight)
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        window.addEventListener('onload', handleOnload)
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('onload', handleOnload)
        }
    }, [handleResize])
    return height
}
