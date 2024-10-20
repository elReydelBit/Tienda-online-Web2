import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para almacenar nuestro valor
  // Pasar la función inicial al useState para que sólo se ejecute una vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Obtener de localStorage por clave
      const item = window.localStorage.getItem(key);
      // Analizar el JSON almacenado o si ninguno retorna initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay error también retorna initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Retorna una versión envuelta de la función setter de useState que ...
  // ... persiste el nuevo valor a localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que el valor sea una función para que tengamos la misma API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Guardar estado
      setStoredValue(valueToStore);
      // Guardar en localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Un manejo de errores más sofisticado debería ser usado aquí
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    }
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
