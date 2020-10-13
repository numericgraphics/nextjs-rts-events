import { useRef, useEffect } from 'react'
import { TweenMax } from 'gsap'

export function useTweenMax (duration, config, onMount = false) {
    const ref = useRef()
    useEffect(
        () => {
            if (onMount) fn()
        },
        [ref]
    )
    const fn = () => TweenMax.to(ref.current, duration, config)
    return [ref, fn]
}

export function useTweenMaxWithRef (ref, duration, config) {
    const fn = () => TweenMax.to(ref.current, duration, config)
    return [fn]
}
