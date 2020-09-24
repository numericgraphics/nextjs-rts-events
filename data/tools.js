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
    var c
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
