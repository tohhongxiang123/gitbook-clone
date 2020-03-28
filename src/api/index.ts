import { useState, useEffect, useCallback } from 'react'
import generateObjectWithSameValues from '../utils/generateObjectWithSameValues'

/**
 * 
 * @param _mapApiToData [key: string]: Promise<T>
 */
export default function useApi<T>(_mapApiToData: {[key in keyof T]: Promise<T[key]>}) {
    const [mapApiToData] = useState(_mapApiToData)
    const [data, setData] = useState<{ [key in keyof T]: (T[key] extends Promise<infer U> ? U : T[key]) | null }>(generateObjectWithSameValues(mapApiToData, null))
    const [error, setError] = useState<{ [key in keyof T]: string | null }>(generateObjectWithSameValues(mapApiToData, null))
    const [isLoading, setIsLoading] = useState(generateObjectWithSameValues(mapApiToData, false))

    const getData = useCallback(async () => {
        setIsLoading(prevLoadingState => ({...prevLoadingState, ...generateObjectWithSameValues(mapApiToData, true)}))
        const keyValuePairs = Object.entries(mapApiToData)
        
        await Promise.all(keyValuePairs.map(([key, value]: [string, any]) => value.then((value: any) => {
            setData(prevData => ({ ...prevData, [key]: value }))
        }).catch((e: Error) => {
            setError(prevErrors => ({ ...prevErrors, [key]: e }))
        }).finally(() => setIsLoading(prevLoadingState => ({ ...prevLoadingState, [key]: false }))
        )))
    }, [mapApiToData])

    useEffect(() => {
        getData()
    }, [getData])

    return [{ isLoading, data, error }, getData] as const
}