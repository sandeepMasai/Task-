import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const SavedPlacesContext = createContext(null)

const STORAGE_KEY = 'tpe-saved-places'

export function SavedPlacesProvider({ children }) {
  const [saved, setSaved] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  }, [saved])

  const savePlace = useCallback((place) => {
    setSaved((prev) =>
      prev.some((p) => p.id === place.id) ? prev : [...prev, place]
    )
  }, [])

  const removePlace = useCallback((id) => {
    setSaved((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const isSaved = useCallback(
    (id) => saved.some((p) => p.id === id),
    [saved]
  )

  return (
    <SavedPlacesContext.Provider
      value={{ saved, savePlace, removePlace, isSaved }}
    >
      {children}
    </SavedPlacesContext.Provider>
  )
}

export const useSavedPlaces = () => useContext(SavedPlacesContext)
