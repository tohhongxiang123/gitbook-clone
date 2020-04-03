import { useState, useCallback, useEffect } from "react";

/**
 * 
 * @param promise Function (which returns a promise) to run 
 * @param initialData Initial data before promise runs
 * @param initialArgs Initial arguments for promise. If not provided, promise does not run on initialisation of hook
 * 
 * @returns [{isLoading, error, data}, executePromise]. executePromise returns {data, error}, error is null if promise resolves. Data is null if promise rejects
 */

export function usePromise<T, U extends any[]>(promise: (...args: U) => Promise<T>, initialData: T, ...initialArgs: U | []) {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T>(initialData)
    const [error, setError] = useState<string | null>(null)

    const _promise = useCallback(promise, [])
    const [_initialArgs, setInitialArgs] = useState([...initialArgs])

    const runPromise = useCallback(async (...args: U) => {
        const result = { data: null, error: null } as { data: T | null, error: string | null }
        setIsLoading(true)
        try {
            const data = await _promise(...args)
            setData(data)
            result.data = data
        } catch (e) {
            setError(e)
            result.error = e
        } finally {
            setIsLoading(false)
        }

        return result
    }, [_promise])

    // if initialArgs, run hook
    useEffect(() => {
        if (_initialArgs.length > 0) {
            runPromise(..._initialArgs as U)
        }
    }, [runPromise, _initialArgs])

    // if initialArgs change, replace
    useEffect(() => {
        if (_initialArgs.length !== initialArgs.length) setInitialArgs(initialArgs)
        for (let i = 0; i < initialArgs.length; i++) {
            if (initialArgs[i] !== _initialArgs[i]) return setInitialArgs(initialArgs)
        }
    }, [initialArgs, _initialArgs])

    return [{ isLoading, error, data }, runPromise] as const
}
