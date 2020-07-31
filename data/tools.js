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
