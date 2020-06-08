import { TweenMax } from 'gsap'

export function useTweenMax (ref, duration, config) {
    const go = () => TweenMax.to(ref.current, duration, config)

    return [go]
}
