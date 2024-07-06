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

test('getURLsfromHTML on http://blog.boot.dev/path', () => {
    const inputBody = `
<html>
    <body>
        <a href="https://blog.boot.dev">Boot.dev Blog</a>
    </body>
</html>
`
    const inputBase = 'https://blog.boot.dev'
    const actual = getURLsfromHTML(inputBody, inputBase)
    const expected = ['blog.boot.dev']
    expect(actual).toBe(expected)
})