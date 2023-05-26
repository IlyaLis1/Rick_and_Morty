import { useEffect, useRef } from 'react'

export const useAfterMountEffect = (callback, dependencies) => {

    const isFirstRender = useRef(true)

    useEffect(() => {

        if (!isFirstRender.current) {
            // !isFirstRender.current = false
            callback()
        } else {
            isFirstRender.current = false
        }

    }, dependencies)
}
