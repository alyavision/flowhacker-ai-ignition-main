import React, { useEffect, useState } from 'react';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

/**
 * Minimalistic full-screen preloader for Synaplink.
 * 1. Dark background.
 * 2. Neon green "SYNAPLINK" with soft glow.
 * 3. Simple progress-bar (50 → 100 %).
 * 4. Pure CSS / Framer-motion animations.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(60);
  const [fade, setFade] = useState(false);

  // simulate loading
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setFade(true); // start fade-out
          setTimeout(() => {
            document.body.style.overflow = '';
            onComplete();
          }); // CSS transition time
          return 100;
        }
        return p + 1;
      });
    }, 50);
    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (fade && progress === 100) return null; // finished

  return (
    <div className={`preloader-wrapper ${fade ? 'fade-out' : ''}`}>
      <div style={{ textAlign: 'center' }}>
        <div className="logo">SYNAPLINK</div>

        {/* progress */}
        <div className="progress-wrapper">
          {/* percent */}
          <span className="percent-text" style={{ left:`${progress}%` }}>{progress}%</span>
          {/* arrow */}
          <span className="arrow" style={{ left:`${progress}%` }} />

          <div className="bar">
            <div className="bar-fill" style={{ width:`${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
