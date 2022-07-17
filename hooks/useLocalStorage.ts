import { Pallet } from "../types/pallet"

const useLocalStorage = () => {
  if(typeof window === 'undefined') return { data: null, save: () => {} }
  const data = JSON.parse(localStorage.getItem('TADANO_COLOR_DATA') ?? 'null')
  const save = (data: unknown) => {
    localStorage.setItem('TADANO_COLOR_DATA', JSON.stringify(data))
  }
  return {
    save,
    data,
  }
}

export default useLocalStorage;
