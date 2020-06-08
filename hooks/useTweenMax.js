// import { createRef, useEffect } from 'react'
import { TweenMax } from 'gsap'

export function useTweenMax (ref, duration, config, onMount = false) {
    console.log('useTweenMax', ref.current)
    const go = () => TweenMax.to(ref.current, duration, config)
    // useEffect(() => {
    //     if (onMount) go()
    // }, [ref])

    return [go]
}
