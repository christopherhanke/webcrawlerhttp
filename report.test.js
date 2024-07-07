import { test, expect } from "@jest/globals"
import { sortPages } from "./report"

test('sort two Pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sort five Pages', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev/about': 3,
        'https://wagslane.dev/tags': 5,
        'https://wagslane.dev/clean-code': 2,
        'https://wagslane.dev': 8
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev', 8],
        ['https://wagslane.dev/tags', 5],
        ['https://wagslane.dev/about', 3],
        ['https://wagslane.dev/clean-code', 2],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})