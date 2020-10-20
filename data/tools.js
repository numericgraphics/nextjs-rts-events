export function getTranslations (count, allTranslations, key) {
    const glue = (count > 0) ? (count > 1) ? 'N' : 1 : 0
    return allTranslations[key + glue]
}

export const UserStates = Object.freeze({
    USER_ACTION_CLICKED_VIDEO: 'userActionClickedVideo',
    USER_ACTION_VIDEO_MUTED: 'userActionVideoMuted'
})

export function storeInLocalStorage (localStorageName, obj) {
    let data = localStorage.getItem(localStorageName)
    data = data === null ? {} : JSON.parse(data)
    Object.assign(data, obj)
    localStorage.setItem(localStorageName, JSON.stringify(data))
}

export function getLocalStorage (localStorageName) {
    return localStorage.getItem(localStorageName)
}

export function getDataFromLocalStorage (localStorageName, key) {
    const data = JSON.parse(getLocalStorage(localStorageName))
    if (data && data[key] !== undefined) {
        return data[key]
    }
    return null
}

export function hexToRgbA (hex, A) {
    let c
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + A + ')'
    }
    throw new Error('Bad Hex')
}

export function getAllImagesFromJSON (data, results, refs) {
    for (const i in data) {
        if (typeof data[i] === 'object') {
            getAllImagesFromJSON(data[i], results, refs)
        } else {
            if (refs.some(substring => String(data[i]).includes(substring))) {
                results.push(data[i])
            }
        }
    }
    return results
}

export function preLoadImage (url, callBack) {
    const img = new Image()

    function onLoaded () {
        callBack(true)
        cleanup()
    }

    function onerror (e) {
        callBack(false)
        console.log('IMAGE PRE-CACHED ERROR', e)
    }

    function cleanup () {
        img.removeEventListener('load', onLoaded, false)
        img.removeEventListener('error', onerror, false)
    }

    img.addEventListener('load', onLoaded)
    img.addEventListener('error', onerror)
    img.src = url
}

export function phoneVerification (data) {
    const swissReg = /^(\+41)(\d{2})(\d{3})(\d{2})(\d{2})$/
    const franceReg = /^(\+33)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/
    const belgiumReg = /^(\+32)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})$/
    const italianReg = /^(\+39)(\d{3})(\d{7})$/
    const liechtensteinReg = /^(\+423)(\d{3})(\d{3})(\d{3})(\d{3})$/

    data = '+' + data
    if ((swissReg.test(data)) || (franceReg.test(data)) || (belgiumReg.test(data)) || (italianReg.test(data)) || liechtensteinReg.test(data)) {
        return true
    } else {
        return false
    }
}
