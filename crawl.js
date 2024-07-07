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

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    
    //check if link is on this page, prevent to crawl all web
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    //check if page has already been seen, increase entry
    const normalizeCurrentURL = normalizeURL(currentURL)
    if (pages[normalizeCurrentURL] > 0) {
        pages[normalizeCurrentURL]++
        return pages
    }

    pages[normalizeCurrentURL] = 1
    console.log(`acitvely crawling: ${currentURL}`)
    
    try {
        const resp = await fetch(currentURL)

        //checking error codes in fetch request
        if (resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }
        
        //checking getting back html
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()
        const nextURLs = getURLsfromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }

    } catch (err) {
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
    return pages
}

export {
     normalizeURL,
     getURLsfromHTML,
     crawlPage
    };