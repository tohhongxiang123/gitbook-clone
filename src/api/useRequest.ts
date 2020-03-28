import axios, { AxiosRequestConfig } from "axios"
import { useState, useEffect } from 'react'

export default function useRequest<DataType>(initialConfig?: AxiosRequestConfig, initialData?: DataType) {
    const [config, setConfig] = useState(initialConfig)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<DataType | null>(initialData ?? null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let didCancel = false
        async function fetch() {
            if (!config) return
            setIsLoading(true)
            setError(null)
            
            try {
                const response = await axios.request(config)
                if (!didCancel) {
                    setIsLoading(false)
                    setData(response.data)
                }
            } catch(e) {
                if (!didCancel) {
                    setIsLoading(false)
                    setError(e)
                }
            } 
        }

        fetch()

        return () => {
            didCancel = true
        }
    }, [config])

    return [{isLoading, data, error}, setConfig] as const
}