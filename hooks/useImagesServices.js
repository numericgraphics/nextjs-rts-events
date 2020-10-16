import { useState, useEffect } from 'react'
import { getAllImagesFromJSON, loadImage } from '../data/tools'

export function useImagesServices (eventData) {
    const [isImagesPreLoaded, setImagePreLoaded] = useState({})
    const [counter, setCounter] = useState(0)
    const [numImageToPreload, setNumImageToPreload] = useState(-1)
    let imagesArray = []

    function loadingImageCallBack (response) {
        setCounter(counter => counter + 1)
        if (!response) {
            setImagePreLoaded(prevState => ({ ...prevState, numError: prevState.numError + 1 }))
        }
    }

    function preloadImages (images) {
        if (images.length < 1) {
            setImagePreLoaded(prevState => ({ ...prevState, ready: true }))
        }
        images.map(image => loadImage(image, loadingImageCallBack))
    }

    useEffect(() => {
        setImagePreLoaded({ ready: false, numImages: 0, numError: 0 })
    }, [])

    useEffect(() => {
        if (Object.keys(eventData).length !== 0) {
            imagesArray = getAllImagesFromJSON(eventData, [], ['.jpg', '.png', '.jpeg', '.image?'])
            setNumImageToPreload(imagesArray.length)
            preloadImages(imagesArray)
        }
    }, [eventData])

    useEffect(() => {
        if (counter === numImageToPreload) {
            setImagePreLoaded(prevState => ({ ...prevState, ready: true, numImages: numImageToPreload }))
        }
    }, [counter, numImageToPreload])
    return isImagesPreLoaded
}
