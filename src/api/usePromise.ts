import { useState, useCallback, useEffect } from "react";

/**
 * 
 * @param promise Function (which returns a promise) to run 
 * @param initialData Initial data before promise runs
 * @param initialArgs Initial arguments for promise. If not provided, promise does not run on initialisation of hook. If promise takes in 0 arguments, initialArgs should be either true or false. True will make promise run immediately
 * 
 * @returns [{isLoading, error, data}, executePromise]. executePromise returns {data, error}, error is null if promise resolves. Data is null if promise rejects
 */
function usePromise<T, U extends any[]>(promise: (...args: U) => Promise<T>, initialData: T, ...initialArgs: U | [boolean]) {
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
        if ((promise.length === 0 && _initialArgs[0]) || (_initialArgs.length === promise.length)) {
            runPromise(..._initialArgs as U)
        }
    }, [runPromise, _initialArgs, promise.length])

    // if initialArgs change, replace
    useEffect(() => {
        if (_initialArgs.length !== initialArgs.length) setInitialArgs(initialArgs)
        for (let i = 0; i < initialArgs.length; i++) {
            if (initialArgs[i] !== _initialArgs[i]) return setInitialArgs(initialArgs)
        }
    }, [initialArgs, _initialArgs])

    return [{ isLoading, error, data }, runPromise] as const
}

export { usePromise }
