import { useEffect, useState } from 'react'

export default function useAppVisibility () {
    const [isVisible, setVisible] = useState()
    const updateVisible = () => {
        setVisible(!document.hidden)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('visibilitychange', updateVisible)
            updateVisible()
        }

        return () => {
            window.removeEventListener('visibilitychange', updateVisible)
        }
    }, [])

    return isVisible
}

/*
IOS issue : it's a bug !
https://caniuse.com/?search=pagehide
https://bugs.webkit.org/show_bug.cgi?id=156356
https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event
https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html
https://stackoverflow.com/questions/4656387/how-to-detect-in-ios-webapp-when-switching-back-to-safari-from-background
https://stackoverflow.com/questions/54703437/ios-pagehide-not-triggered-cannot-detecting-page-unload
 */
