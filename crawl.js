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
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.length > 0 && linkElement.href.slice(0, 1) === '/') {
            //relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            //absolute url
            try {
                const urlObj = new URL(`${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url: ${err.message}`)
            }
        }
        
    }
    return urls
}

export {
     normalizeURL,
     getURLsfromHTML
    };