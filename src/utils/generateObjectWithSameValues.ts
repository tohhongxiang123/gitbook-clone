/**
 * 
 * @param obj Object to turn all values into `value`
 * @example generateNullishObject({a: 1, b: 2}, null) => {a: null, b: null}
 * @example generateNullishObject({a: 1, b: {c: 2, d: 3}}, 1) => {a: 1, b: 1}
 */
export default function generateNullishObject<T, U>(obj: T, value: U): {[key in keyof T]: U} {
    const result = {} as any
    Object.keys(obj).forEach(key => result[key] = value)
    return result
}

// function isObject(maybeObject: any) : maybeObject is Object {
//     if (maybeObject === null) return false
//     if (Array.isArray(maybeObject)) return false
//     return typeof maybeObject === 'object';
// } 