function normalizeURL (url) {
    const objURL = new URL(url)
    if (objURL.pathname[objURL.pathname.length - 1] === '/') {
        objURL.pathname = objURL.pathname.slice(0,-1)
    }
    return objURL.hostname + objURL.pathname
}


export { normalizeURL };