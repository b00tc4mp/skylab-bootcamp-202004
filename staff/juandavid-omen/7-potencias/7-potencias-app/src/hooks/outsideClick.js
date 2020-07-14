import { useRef, useState, useEffect } from 'react'

export const useOutsideClick = (initialValue) => {
  const ref = useRef(null)
  const [hidden, setHidden] = useState(initialValue)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) setHidden(true)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [ref])

  return { hidden, setHidden, ref }
}
