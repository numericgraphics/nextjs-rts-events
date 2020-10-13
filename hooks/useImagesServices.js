import { useState, useEffect } from 'react'

export function useImagesServices (eventData) {
    const [isImagesPreLoaded, setImagePreLoaded] = useState(false)
    const [counter, setCounter] = useState(0)
    const [numImageToPreload, setNumImageToPreload] = useState(-1)
    const refArray = ['.jpg', '.png', '.jpeg', '.image?']
    let imagesArray = []

    function getAllImagesFromJSON (data, dataArray) {
        for (const i in data) {
            if (typeof data[i] === 'object') {
                getAllImagesFromJSON(data[i], dataArray)
            } else {
                if (refArray.some(substring => String(data[i]).includes(substring))) {
                    dataArray.push(data[i])
                }
            }
        }
        return dataArray
    }

    function preloadImages (images) {
        if (images.length < 1) {
            setImagePreLoaded(true)
        }
        images.map(image => loadImage(image))
    }

    function loadImage (url) {
        const img = new Image()

        function callBack () {
            setCounter(counter => counter + 1)
            cleanup()
        }

        function onerror (e) {
            callBack()
            console.log('IMAGE PRELOADED ERROR', e)
        }

        function cleanup () {
            img.removeEventListener('load', callBack)
            img.removeEventListener('error', onerror)
        }

        img.addEventListener('load', callBack)
        img.addEventListener('error', onerror)
        img.src = url
    }

    useEffect(() => {
        if (Object.keys(eventData).length !== 0) {
            imagesArray = getAllImagesFromJSON(eventData, [])
            setNumImageToPreload(imagesArray.length)
            preloadImages(imagesArray)
        }
    }, [eventData])

    useEffect(() => {
        if (counter === numImageToPreload) {
            setImagePreLoaded(true)
        }
    }, [counter, numImageToPreload])

    return isImagesPreLoaded
}
