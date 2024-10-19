export const getPriceQueryParams = (searchParams, key, value) => {


    console.log(key)
    const hasKeyExist = searchParams.has(key);

    if (value && hasKeyExist) {
        searchParams.get(key, value);
    }
    else if (value) {
        searchParams.append(key, value);

    } else if (hasKeyExist) {
        searchParams.delete(key);
    }

    return searchParams

}