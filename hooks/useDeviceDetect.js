import { useEffect, useState } from 'react'

export default function useDeviceDetect () {
    const [userAgent, setMobile] = useState({ userAgent: '', iosVersion: -1, isIos: false })
    useEffect(() => {
        if (typeof window.navigator !== 'undefined') {
            setMobile((prevState) => ({ ...prevState, userAgent: window.navigator }))
            if (window.navigator.userAgent.match(/iP(hone|od|ad)/)) {
                const version = parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
                    .replace('undefined', '3_2').replace('_', '.').replace('_', '')
                )
                setMobile((prevState) => ({ ...prevState, iosVersion: version, isIos: true }))
            }
        }
    }, [])

    return userAgent
}
