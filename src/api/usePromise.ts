import { useState, useCallback } from "react";

export default function usePromise<T, U extends any[]>(promise: (...args: U) => Promise<T>, initialData: T) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T>(initialData)
    const [error, setError] = useState<string|null>(null)
    const _promise = useCallback(promise, [])

    const runPromise = useCallback(async (...args: U) => {
        setIsLoading(true)
        console.log('Promise is running', args)
        try {
            const data = await _promise(...args)
            setData(data)
            setIsLoading(false)
            return {data}
        } catch(e) {
            setIsLoading(false)
            setError(e)
            return {error: e}
        }
    }, [_promise])

    return [{isLoading, error, data}, runPromise] as const
}