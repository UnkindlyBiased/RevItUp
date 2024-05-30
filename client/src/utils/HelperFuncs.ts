type KeyValue = {
    key: string
    value: string | null
}

function splitRequests(arr: KeyValue[], split: string = ' ') {
    return arr.map(elem => `${elem.key}=${elem.value}`).join(split)
}

export default splitRequests