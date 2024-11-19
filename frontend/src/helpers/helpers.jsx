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

export const calculatePrice = (item) => {
    const subTotal = item.reduce((acc, i) => acc + i.quantity * i.price, 0);
    let shipping = 0;

    if (subTotal > 200) {
        shipping = 25
    }
    const tax = Number((0.15 * subTotal).toFixed(2));
    const total = subTotal + shipping + tax;

    return {
        subTotal: subTotal.toFixed(2), shipping, tax, total: total.toFixed(2)
    }

}