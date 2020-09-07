import { useState, useEffect } from 'react'

export function useImagesServices (eventData) {
    const [isImagesPreLoaded, setImagePreLoaded] = useState(false)
    const refArray = ['.jpg', '.png', '.jpeg', '.image?']
    const imagesArray = []

    function getAllImagesFromJSON (data) {
        let found = false
        for (const i in data) {
            if (typeof data[i] === 'object') {
                getAllImagesFromJSON(data[i])
                if (found) {
                    break
                }
            } else {
                if (refArray.some(substring => String(data[i]).includes(substring))) {
                    imagesArray.push(data[i])
                    found = true
                    break
                }
            }
        }

        return imagesArray
    }

    function preloadImages (images) {
        let i = 0
        let counter = 0
        function finish () {
            setImagePreLoaded(true)
            counter = 0
            i = 0
        }
        function completed () {
            counter++
            if (counter === images.length) {
                finish()
            }
        }
        function error () {
            console.log('IMAGE PRELOADED ERROR')
            counter++
        }
        function load () {
            for (i = 0; i < images.length; i++) {
                const image = new Image()
                image.onerror = error
                image.onload = completed
                image.src = images[i]
            }
        }
        if (images.length > 0) {
            load()
        } else {
            finish()
        }
    }

    useEffect(() => {
        if (Object.keys(eventData).length !== 0) {
            preloadImages(getAllImagesFromJSON(eventData))
        }
    }, [eventData])
    return isImagesPreLoaded
}
