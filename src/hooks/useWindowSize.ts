
import { useState, useEffect } from 'react';

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Добавляем слушатель события
    window.addEventListener('resize', handleResize);
    
    // Вызываем обработчик сразу для установки начального размера
    handleResize();
    
    // Очищаем слушатель при размонтировании
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
