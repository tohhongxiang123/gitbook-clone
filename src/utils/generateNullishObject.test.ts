import generateObjectWithSameValues from './generateObjectWithSameValues'

describe('Generate nullish object', () => {
    it('succeeds on flat object', () => {
        expect(generateObjectWithSameValues({a: 1, b: 2}, null)).toEqual({a: null, b: null})
        expect(generateObjectWithSameValues({a: 1, b: 2}, true)).toEqual({a: true, b: true})
        expect(generateObjectWithSameValues({a: 1, b: 2}, 1)).toEqual({a: 1, b: 1})
        expect(generateObjectWithSameValues({a: 1, b: 2}, 'any string')).toEqual({a: 'any string', b: 'any string'})
        expect(generateObjectWithSameValues({a: 1, b: 2}, {a: 1, b: 2})).toEqual({a: {a: 1, b: 2}, b: {a: 1, b: 2}})
    })

    it('succeeds on nested objects', () => {
        expect(generateObjectWithSameValues({a: 'any', b: {c: 'thing', d: 1}}, 1)).toEqual({a: 1, b: 1})
    })

    it ('converts non primitives to null', () => {
        expect(generateObjectWithSameValues({a: [1,2,3], b: () => console.log('any function')}, null)).toEqual({a: null, b: null})
        expect(generateObjectWithSameValues({a: [1,2,3], b: {c: () => console.log('any function')}, d: {e: null, f: {g: 'null'}}}, null)).toEqual({a: null, b: null, d: null})
    })

    it ('succeeds on empty object', () => {
        expect(generateObjectWithSameValues({}, null)).toEqual({})
    })
})