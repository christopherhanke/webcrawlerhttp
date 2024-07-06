import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsfromHTML } from "./crawl";

test('normalizeURL strip protocol https://blog.boot.dev/path', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeURL strip trailing slash https://blog.boot.dev/path/', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeURL test protocol http://blog.boot.dev/path/', () => {
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})

test('normalizeURL capitals https://blog.Boot.dev/path', () => {
    const input = 'https://blog.Boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toBe(expected)
})

test('getURLsfromHTML absolute', () => {
    const inputBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/">Boot.dev Blog</a>
    </body>
</html>
`
    const inputBase = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(inputBody, inputBase)
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML relative', () => {
    const inputBody = `
<html>
    <body>
        <a href="/path/">Boot.dev Blog</a>
    </body>
</html>
`
    const inputBase = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(inputBody, inputBase)
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML multiple URLS', () => {
    const inputBody = `
<html>
    <body>
        <a href="/path1/">Boot.dev Blog One</a>
        <a href="https://blog.boot.dev/path2/">Boot.dev Blog Two</a>
    </body>
</html>
`
    const inputBase = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(inputBody, inputBase)
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML invalid URL', () => {
    const inputBody = `
<html>
    <body>
        <a href="invalid">Invalid URL</a>
    </body>
</html>
`
    const inputBase = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(inputBody, inputBase)
    const expected = []
    expect(actual).toEqual(expected)
})