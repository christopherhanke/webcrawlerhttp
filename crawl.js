import { JSDOM } from 'jsdom'

function normalizeURL (url) {
    const objURL = new URL(url)
    if (objURL.pathname.length > 0 && objURL.pathname[objURL.pathname.length - 1] === '/') {
        objURL.pathname = objURL.pathname.slice(0,-1)
    }
    return objURL.hostname + objURL.pathname
}

function getURLsfromHTML (htmlBody, baseURL) {
    const urls = []
    return urls
}

export { normalizeURL, getURLsfromHTML };