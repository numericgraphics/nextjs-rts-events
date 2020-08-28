export function getTranslations (value, translation, type) {
    switch (value) {
    case 0:
        if (type === 'wrong') {
            return translation.wrong0
        } else if (type === 'good') {
            return translation.good0
        }
        break
    case 1:
        if (type === 'wrong') {
            return translation.wrong1
        } else if (type === 'good') {
            return translation.good1
        }
        break
    default:
        if (type === 'wrong') {
            return translation.wrongN
        } else if (type === 'good') {
            return translation.goodN
        }
        break
    }
}

export const UserStates = Object.freeze({
    USER_ACTION_CLICKED_VIDEO: 'userActionClickedVideo'
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
    const localStorage = JSON.parse(getLocalStorage(localStorageName))
    if (localStorage && localStorage[0][key]) {
        return localStorage[0][key]
    }
    return null
}
