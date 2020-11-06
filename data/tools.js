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

export function hexToRGBA (hex, alpha = 1) {
    var r = parseInt(hex.slice(1, 3), 16)
    var g = parseInt(hex.slice(3, 5), 16)
    var b = parseInt(hex.slice(5, 7), 16)
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
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

export function epochConverter (date, time) {
    // date format : 23-12-1990 time : 2000 ( = 20 heure 00 min)
    const today = new Date()
    const euDate = date.split('-')
    const euDateFinal = euDate[2] + '-' + euDate[1] + '-' + euDate[0]
    const hour = time ? time.slice(0, 2) : today.getHours()
    const min = time ? time.slice(2, 4) : today.getMinutes()
    const usDate = new Date(euDateFinal + 'T' + hour + ':' + min + ':00')

    const myEpoch = usDate.getTime() / 1000.0
    return myEpoch
}

export function dateCreator (date, time) {
    // date format : 23-12-1990 time : 2000 ( = 20 heure 00 min)
    const hour = time && time.slice(0, 2)
    const min = time && time.slice(2, 4)
    console.log(hour)
    if (min && hour) {
        console.log(date)
        return date + ' ' + hour + ':' + min
    } else {
        console.log(date)
        return date
    }
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
