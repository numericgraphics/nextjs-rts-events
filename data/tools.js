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
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex) && A <= 1 && A >= 0 && typeof A === 'number') {
        c = hex.substring(1).split('')
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + A + ')'
    } else {
        console.log('Bad Hex or Alpha HEX : ' + hex + ' Alpha : ' + A)
        // default color on error
        return 'rgba(255,0,0,1)'
    }
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

export function hourConverter (time) {
    // 2200 to 22:00
    const hour = time.slice(0, 2)
    const min = time.slice(2, 4)
    return hour + ':' + min
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
    if (min && hour) {
        return date + ' ' + hour + ':' + min
    } else {
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

export function dateObjConvert (dateObj) {
    const today = new Date()
    const day = dateObj.getDate() < 10 ? '0' + dateObj.getDate().toString() : dateObj.getDate()
    const month = dateObj.getMonth() < 10 ? '0' + (dateObj.getMonth() + 1).toString() : (dateObj.getMonth() + 1)
    const hour = dateObj.getHours() < 10 ? '0' + dateObj.getHours().toString() : dateObj.getHours().toString()
    const min = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes().toString() : dateObj.getMinutes().toString()
    const date = day + '-' + month + '-' + dateObj.getFullYear()
    const time = (dateObj.getHours() === today.getHours() && dateObj.getMinutes() === today.getMinutes()) ? null : hour + min
    const finalDate = { date: date, time: time }
    return finalDate
}

export function between (x, min, max) {
    return x >= min && x <= max
}

function toBase64 (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

export async function b64Conv (file) {
    const image = await toBase64(file)
    return image
}
