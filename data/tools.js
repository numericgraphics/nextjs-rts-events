export function getTranslationsOLD (value, translation, type) {
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

export function getTranslations (count, allTranslations, key) {
    const glue = (count > 0) ? (count > 1) ? 'N' : 1 : 0
    return allTranslations[key + glue]
}
