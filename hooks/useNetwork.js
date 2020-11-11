import { useEffect, useState } from 'react'

export default function useNetwork () {
    const [isOnline, setNetwork] = useState()
    const updateNetwork = () => {
        setNetwork(navigator.onLine)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('offline', updateNetwork)
            window.addEventListener('online', updateNetwork)
            updateNetwork()
        }

        return () => {
            window.removeEventListener('offline', updateNetwork)
            window.removeEventListener('online', updateNetwork)
        }
    }, [])
    return isOnline
}
