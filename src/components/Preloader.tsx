import React, { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(40);
  const [currentPhase, setCurrentPhase] = useState<'brand' | 'stroke' | 'loading' | 'complete'>('brand');
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Блокируем прокрутку
    document.body.style.overflow = 'hidden';

    // T0: Фон появляется мгновенно (0.0-0.2c)
    // T1: Бренд появляется (0.3-0.8c)
    setTimeout(() => {
      setCurrentPhase('brand');
      if (logoRef.current) {
        logoRef.current.classList.add('animate-brand');
      }
    }, 300);

    // T2: Акцентный штрих (0.8-1.3c)
    setTimeout(() => {
      setCurrentPhase('stroke');
      if (logoRef.current) {
        logoRef.current.classList.add('animate-stroke');
      }
    }, 800);

    // T3: Индикатор загрузки (0.8-2.8c)
    setTimeout(() => {
      setCurrentPhase('loading');
      
      // Анимация прогресса от 40% до 100%
      let startTime = Date.now();
      const duration = 2000; // 2 секунды для прогресса
      
      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progressPercent = Math.min((elapsed / duration) * 60 + 40, 100);
        
        setProgress(Math.round(progressPercent));
        
        if (progressPercent < 100) {
          requestAnimationFrame(animateProgress);
        } else {
          // Достигли 100%
          setTimeout(() => {
            setCurrentPhase('complete');
            
            // T4: Исчезновение прелоадера (2.8-3.5c) - плавно
            setTimeout(() => {
              setIsFading(true);
              document.body.style.overflow = '';
              document.body.classList.add('is-ready');
              
              // Плавно исчезаем через 0.8 секунды
              setTimeout(() => {
                onComplete();
              }, 800);
            }, 700);
          }, 200);
        }
      };
      
      requestAnimationFrame(animateProgress);
    }, 2000);

    // Fallback таймаут на 3.5 секунды
    const timeout = setTimeout(() => {
      if (isVisible) {
        setIsVisible(false);
        document.body.style.overflow = '';
        onComplete();
      }
    }, 3500);

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#0B0D0F] flex items-center justify-center overflow-hidden transition-all duration-800 ${isFading ? 'opacity-0 scale-95 backdrop-blur-md' : ''}`}>
      {/* Центральный контент */}
      <div className="relative z-10 text-center space-y-8">
        {/* Логотип */}
        <div 
          ref={logoRef}
          className="relative"
        >
          {/* Основной логотип */}
          <div className="text-6xl md:text-8xl font-bold text-white tracking-wider">
            SYNAPLINK
          </div>
          
          {/* Акцентный контур для stroke-анимации */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-6xl md:text-8xl font-bold fill-none stroke-[#9BEF4C] stroke-[3] tracking-wider"
              style={{
                strokeDasharray: '1000',
                strokeDashoffset: currentPhase === 'stroke' ? '0' : '1000',
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.2,0.7,0,1)'
              }}
            >
              SYNAPLINK
            </text>
          </svg>
        </div>
        

        
        {/* Прогресс бар */}
        {currentPhase === 'loading' && (
          <div className="space-y-4">
            {/* Процент */}
            <div className="text-2xl font-mono text-[#9BEF4C]">
              {progress}%
            </div>
            
            {/* Прогресс бар */}
            <div className="w-80 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
              <div 
                ref={progressRef}
                className="h-full bg-gradient-to-r from-[#9BEF4C] to-[#9BEF4C]/80 rounded-full transition-all duration-100 ease-out"
                style={{ 
                  width: `${progress}%`,
                  transform: progress === 100 ? 'scaleX(1.05)' : 'scaleX(1)',
                  transition: progress === 100 ? 'transform 0.2s ease-out' : 'width 0.1s ease-out'
                }}
              />
            </div>
            
            {/* Анимированные точки */}
            <div className="flex justify-center space-x-2">
              <div className={`w-2 h-2 bg-[#9BEF4C] rounded-full transition-opacity duration-[120ms] ${
                progress % 3 === 0 ? 'opacity-100' : 'opacity-40'
              }`} />
              <div className={`w-2 h-2 bg-[#9BEF4C] rounded-full transition-opacity duration-[120ms] ${
                progress % 3 === 1 ? 'opacity-100' : 'opacity-40'
              }`} />
              <div className={`w-2 h-2 bg-[#9BEF4C] rounded-full transition-opacity duration-[120ms] ${
                progress % 3 === 2 ? 'opacity-100' : 'opacity-40'
              }`} />
            </div>
          </div>
        )}
      </div>
      
      {/* Фоновые элементы */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Сетка */}
        <svg className="absolute inset-0 opacity-5 airy-element" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Частицы */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#9BEF4C]/30 rounded-full airy-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2000}ms`,
              animationDuration: `${2000 + Math.random() * 1000}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Preloader;
