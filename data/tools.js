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
