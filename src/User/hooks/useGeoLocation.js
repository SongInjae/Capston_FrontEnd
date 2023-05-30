import { useState, useEffect } from 'react'


export const UseGeoLocation = (options = {}) => {
    const [location, setLocation] = useState()
    const [error, setError] = useState('')

    const handleSuccess = (pos) => {
        const { latitude, longitude } = pos.coords

        setLocation({
            latitude,
            longitude,
        })
    }

    const handleError = (e) => {
        setError(e)
    }

    useEffect(() => {
        const { geolocation } = navigator

        if (!geolocation) {
            setError('Geolocation is not supported.')
            return
        }

        geolocation.getCurrentPosition(handleSuccess, handleError, options)
    }, [options])

    return new Promise({ location, error }
    )
}
