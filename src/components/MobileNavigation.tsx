import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  tgLink?: string;
  isTgReady?: boolean;
  phoneNumber?: string;
  userFriendlyPhoneNumber?: string;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onToggle, tgLink, isTgReady, phoneNumber, userFriendlyPhoneNumber }) => {
  // Блокируем скролл body при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Бургер кнопка */}
      <button
        onClick={onToggle}
        className="sm:hidden fixed top-2 right-4 z-50 p-3 bg-background/80 backdrop-blur-md border border-border rounded-lg hover:bg-background/90 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
        aria-label="Открыть меню"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Off-canvas панель */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-border z-50 lg:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Заголовок */}
          <div className="flex items-center justify-between mb-8">
            <a href="#hero" className="flex items-center gap-2 airy-link" aria-label="Synaplink AI" onClick={onToggle}>
              <div className="h-8 w-8 rounded-md bg-lime-400 text-black grid place-items-center font-orbitron font-extrabold airy-element">SL</div>
              <span className="font-orbitron text-lg">Synaplink AI</span>
            </a>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Закрыть меню"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Навигация */}
          <nav className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Навигация
              </h3>
              <div className="space-y-2">
                <a 
                  href="#services" 
                  onClick={onToggle}
                  className="block py-3 px-4 text-lg hover:bg-muted rounded-lg transition-colors focus-visible:bg-muted"
                >
                  Услуги
                </a>
                <a 
                  href="#pricing" 
                  onClick={onToggle}
                  className="block py-3 px-4 text-lg hover:bg-muted rounded-lg transition-colors focus-visible:bg-muted"
                >
                  Цены
                </a>
                <a 
                  href="#faq" 
                  onClick={onToggle}
                  className="block py-3 px-4 text-lg hover:bg-muted rounded-lg transition-colors focus-visible:bg-muted"
                >
                  FAQ
                </a>
                <a 
                  href="#contact" 
                  onClick={onToggle}
                  className="block py-3 px-4 text-lg hover:bg-muted rounded-lg transition-colors focus-visible:bg-muted"
                >
                  Контакты
                </a>
              </div>
            </div>

            {/* Контакты */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Связаться
              </h3>
              <div className="space-y-3">
                <a 
                  href={isTgReady && tgLink ? tgLink : "#contact"}
                  target={isTgReady && tgLink ? "_blank" : undefined}
                  rel={isTgReady && tgLink ? "noopener noreferrer" : undefined}
                  onClick={onToggle}
                  className="flex items-center gap-3 py-3 px-4 hover:bg-muted rounded-lg transition-colors focus-visible:bg-muted"
                >
                  <MessageCircle className="w-5 h-5 text-lime-400" />
                  <span>Telegram</span>
                </a>
                <a 
                  href={`tel:+${phoneNumber}`}
                  onClick={onToggle}
                  className="flex items-center gap-3 py-3 px-4 hover:bg-muted rounded-lg transition-colors focus-visible:bg-muted"
                >
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span>{userFriendlyPhoneNumber}</span>
                </a>
              </div>
            </div>
          </nav>

          {/* CTA кнопка */}
          <div className="pt-6 border-t border-border">
            <a 
              href="#contact" 
              onClick={onToggle}
              className="block w-full py-4 px-6 bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-semibold text-center rounded-lg hover:from-lime-500 hover:to-cyan-500 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-2"
            >
              Получить AI-аудит
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
