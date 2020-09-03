export function getTranslations (count, allTranslations, key) {
    const glue = (count > 0) ? (count > 1) ? 'N' : 1 : 0
    return allTranslations[key + glue]
}
