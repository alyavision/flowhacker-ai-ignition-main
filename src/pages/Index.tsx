import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Phone, MessageCircle, Send, Rocket, Sparkles, Bot, Workflow, PenTool } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Preloader } from "@/components/Preloader";
import { NeuralBackground } from "@/components/NeuralBackground";
import { MobileNavigation } from "@/components/MobileNavigation";
import "@/components/AnimatedElements.css";
import "@/components/Preloader.css";
import "@/components/AiryAnimations.css";


const PHONE_NUMBER = "998503030694";
const USER_FRIENDLY_PHONE_NUMBER = "+998 50 303 06 94";
const TG_LINK = "https://t.me//SynapLinkAi_bot";
const TG_CHANNEL = "https://t.me//synaplinkai";
const WA_LINK = `https://wa.me/${PHONE_NUMBER}`;
const IS_FEEDBACK_READY = false; // TODO: вставить true, если готов сервис для принятия формы обратной связи

const Index = () => {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const IS_TG_READY = Boolean(TG_LINK);
  const IS_TG_CHANNEL_READY = Boolean(TG_CHANNEL);



    // Активируем анимации сразу после прелоадера
  useEffect(() => {
    console.log('isPreloaderComplete', isPreloaderComplete);
    if (isPreloaderComplete) {
      // Добавляем класс is-ready к body
      document.body.classList.add('is-ready');
      
      // Активируем анимации для элементов с data-fade
      const fadeElements = document.querySelectorAll('[data-fade]');
      fadeElements.forEach((el, index) => {
        // Сначала добавляем класс для анимации
        el.classList.add('animate-on-load');
        // Потом анимируем
        setTimeout(() => {
          el.classList.add('fade-in');
        }, index * 30);
      });
    }
  }, [isPreloaderComplete]);

  // Показываем прелоадер, пока он не завершен
  if (!isPreloaderComplete) {
    return <Preloader onComplete={() => setIsPreloaderComplete(true)} />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (IS_TG_READY) {
      toast({ title: "Открываем чат в Telegram", description: "Продолжите общение с нашим ботом" });
      try { window.open(TG_LINK, "_blank"); } catch {}
    } else {
      toast({ title: "Скоро", description: "Telegram-бот в разработке. Ссылка появится позже." });
    }
  };


  return (
    <div className="min-h-screen text-foreground bg-[#0A0A0A]/80">
      <NeuralBackground />
      
      {/* Мобильная навигация */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen} 
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        tgLink={TG_LINK}
        isTgReady={IS_TG_READY}
        phoneNumber={PHONE_NUMBER}
        userFriendlyPhoneNumber={USER_FRIENDLY_PHONE_NUMBER}
      />
      
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border bg-[#0A0A0A]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/70" style={{ paddingTop: 'env(safe-area-inset-top)' }} data-fade>
        <div className="container mx-auto flex h-16 items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 airy-link" aria-label="Synaplink AI">
            <div className="h-8 w-8 rounded-md bg-lime-400 text-black grid place-items-center font-orbitron font-extrabold airy-element">SL</div>
            <span className="font-orbitron text-lg">Synaplink AI</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#services" className="story-link airy-link">Услуги</a>
            <a href="#pricing" className="story-link airy-link">Цены</a>
            <a href="#faq" className="story-link airy-link">FAQ</a>
            <a href="#contact" className="story-link airy-link">Контакты</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                if (IS_TG_READY) {
                  try { window.open(TG_LINK, "_blank"); } catch {}
                } else {
                  toast({ title: "Скоро", description: "Telegram-бот в разработке." });
                }
              }}
              className="airy-gradient-button bg-cyan-400 hover:bg-cyan-500 text-black font-semibold hidden sm:flex"
              aria-label="Связаться в Telegram"
            >
              Связаться в Telegram
            </Button>
          </div>
        </div>
      </header>



      <main className="pt-16 sm:pt-24">
        {/* Hero */}
        <section id="hero" className="relative overflow-hidden z-[2]" data-fade>
          <div className="absolute inset-0 -z-10 bg-[#0A0A0A] opacity-60" />
          {/* Wireframe grid overlay */}
          <svg className="absolute inset-0 -z-10 opacity-20 airy-element" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeOpacity="0.06" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Нейронные частицы */}
          <div className="absolute inset-0 -z-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-lime-400/30 rounded-full airy-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2000}ms`,
                  animationDuration: `${2000 + Math.random() * 1000}ms`
                }}
              />
            ))}
          </div>
          
          <div className="container mx-auto grid items-center gap-6 sm:gap-8 py-12 sm:py-20 md:py-28">
            <h1 className="font-orbitron text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight uppercase text-center airy-element" data-fade>
              <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent airy-element">
                ВАШ БИЗНЕС НА АВТОПИЛОТЕ
              </span>
              <span className="text-white airy-element"> С ИИ</span>
            </h1>
            
            <p className="max-w-3xl text-base sm:text-lg text-muted-foreground text-center mx-auto airy-element" data-fade>
              Превращаем ваш бизнес в умную машину продаж: ИИ-продавцы, автоматические рассылки и воронки, которые работают 24/7, пока вы отдыхаете или занимаетесь любимыми делами.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 my-6 sm:my-8" data-fade>
              <div className="text-center airy-element">
                <div className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent airy-element">
                  <AnimatedCounter value={40} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground mt-2 airy-element">к продажам</p>
              </div>
              <div className="text-center airy-element">
                <div className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent airy-element">
                  <AnimatedCounter value={10} suffix="+ часов" />
                </div>
                <p className="text-sm text-muted-foreground mt-2 airy-element">экономия в неделю</p>
              </div>
              <div className="text-center airy-element">
                <div className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent airy-element">
                  <AnimatedCounter value={100} suffix="%" />
                </div>
                <p className="text-sm text-muted-foreground mt-2 airy-element">автопилот</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-fade>
              <Button onClick={() => {
                  if (IS_TG_READY) {
                    try { window.open(TG_LINK, "_blank"); } catch {}
                  } else {
                    toast({ title: "Скоро", description: "Telegram-бот в разработке." });
                  }
                }} variant="secondary" size="xl" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 airy-gradient-button bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500 text-black font-semibold">
                <Sparkles className="size-4 sm:size-5 mr-2 airy-icon"/> Получить бесплатный AI-аудит
              </Button>
              <Button
                onClick={() => {
                  if (IS_TG_READY) {
                    try { window.open(TG_LINK, "_blank"); } catch {}
                  } else {
                    toast({ title: "Скоро", description: "Telegram-бот в разработке." });
                  }
                }}
                size="xl"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 airy-gradient-button bg-cyan-400 hover:bg-cyan-500 text-black font-semibold"
              >
                Связаться в Telegram
              </Button>
            </div>
          </div>
        </section>

        <div className="mx-auto w-32 my-4 sm:my-8 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent airy-element" />

        {/* Services */}
        <section id="services" className="container mx-auto py-6 sm:py-12 md:py-20 relative z-[2] bg-[#0A0A0A]/70" data-fade>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-orbitron mb-8 bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent text-center uppercase airy-element">
            НАШИ УСЛУГИ
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm" role="article">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 airy-element">
                  <div className="airy-pulse">
                    <Bot className="text-lime-400 text-2xl airy-icon"/>
                  </div>
                  ИИ-продавец / чат-бот
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                                  <div className="relative overflow-hidden rounded-lg airy-element">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 airy-pulse" />
                    <img src="/images/ai-sales-bot.jpg?v=3" alt="ИИ-продавец" className="w-full h-32 sm:h-40 object-cover rounded relative z-10 airy-element" />
                  </div>
                <p className="airy-element"><span className="text-sky-500 font-medium">24/7 продажи и ответы</span>: принимает заказы, консультирует, собирает заявки. <span className="text-sky-500 font-medium">+40% к продажам</span>, никаких потерянных клиентов.</p>
              </CardContent>
            </Card>

            <Card role="article">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 airy-element">
                  <div className="airy-pulse">
                    <Workflow className="text-cyan-400 text-2xl airy-icon"/>
                  </div>
                  AI-автоматическая рассылка
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="relative overflow-hidden rounded-lg airy-element">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 airy-pulse" />
                  <img src="/images/ai-email-campaign.jpg?v=3" alt="AI-рассылки" className="w-full h-32 sm:h-40 object-cover rounded relative z-10 airy-element" />
                </div>
                <p className="airy-element">WhatsApp и Instagram Direct с <span className="text-sky-500 font-medium">сегментацией</span> и <span className="text-sky-500 font-medium">шаблонами</span> под праздники/акции/новинки. <span className="text-sky-500 font-medium">+60% повторных продаж</span>.</p>
              </CardContent>
            </Card>

            <Card role="article">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 airy-element">
                  <div className="airy-pulse">
                    <Workflow className="text-lime-400 text-2xl airy-icon"/>
                  </div>
                  AI-генератор лидов из соцсетей
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="relative overflow-hidden rounded-lg airy-element">
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-green-500/20 airy-pulse" />
                  <img 
                    src="/images/ai-lead-generator.jpg?v=3" 
                    alt="AI-генератор лидов" 
                    className="w-full h-32 sm:h-40 object-cover rounded relative z-10 airy-element"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.error('Ошибка загрузки изображения:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <p className="airy-element">Собираем контакты по <span className="text-sky-500 font-medium">ключевым запросам</span> из Instagram/Facebook/VK и сразу <span className="text-sky-500 font-medium">грузим в CRM</span>.</p>
              </CardContent>
            </Card>

            <Card role="article">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 airy-element">
                  <div className="airy-pulse">
                    <Bot className="text-cyan-400 text-2xl airy-icon"/>
                  </div>
                  AI-автоответчик с подогревом
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="relative overflow-hidden rounded-lg airy-element">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 airy-pulse" />
                  <img src="/images/ai-auto-responder.jpg?v=3" alt="AI-автоответчик" className="w-full h-32 sm:h-40 object-cover rounded relative z-10 airy-element" />
                </div>
                <p className="airy-element">Мгновенные ответы, <span className="text-sky-500 font-medium">цепочки сообщений</span> к оплате, передаём готовых покупателей. <span className="text-sky-500 font-medium">+45% конверсии</span>.</p>
              </CardContent>
            </Card>

            <Card role="article">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 airy-element">
                  <div className="airy-pulse">
                    <Workflow className="text-lime-400 text-2xl airy-icon"/>
                  </div>
                  Онлайн-запись с напоминаниями
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="relative overflow-hidden rounded-lg airy-element">
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-500/20 to-green-500/20 airy-pulse" />
                  <img 
                    src="/images/online-booking.jpg?v=3" 
                    alt="Онлайн-запись" 
                    className="w-full h-32 sm:h-40 object-cover rounded relative z-10 airy-element"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.error('Ошибка загрузки изображения:', target.src);
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <p className="airy-element"><span className="text-sky-500 font-medium">24/7 запись</span> + автонапоминания. <span className="text-sky-500 font-medium">-70% неявок</span>, <span className="text-sky-500 font-medium">+40% загрузки</span>. Мини-CRM за 1 день.</p>
              </CardContent>
            </Card>



            <Card role="article">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 airy-element">
                  <div className="airy-pulse">
                    <PenTool className="text-cyan-400 text-2xl airy-icon"/>
                  </div>
                  Набор умных Google-таблиц
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="relative overflow-hidden rounded-lg airy-element">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 airy-pulse" />
                  <img src="/images/smart-google-sheets.jpg?v=3" alt="Умные таблицы" className="w-full h-32 sm:h-40 object-cover rounded relative z-10 airy-element" />
                </div>
                <p className="airy-element">10+ готовых инструментов: планировщик контента, трекер клиентов, калькулятор прибыли, учёт расходов. <span className="text-sky-500 font-medium">Экономия 5+ часов в неделю</span>.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Content & Cases — удалены по требованию */}

        {/* Pricing */}
        <section id="pricing" className="container mx-auto py-16 md:py-24 bg-[#0A0A0A]/70 relative z-[2]" data-fade>
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron mb-8 bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent text-center uppercase airy-element">ПАКЕТЫ — НАЧНИТЕ БЫСТРО</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {name:'Start', price:'от 2 500 000 UZS', features:['Мини-чат-бот (Q&A)','Базовая интеграция','Индивидуальные сценарии','1 мес поддержки'], cta:'Заказать консультацию'},
              {name:'Growth', price:'от 6 000 000 UZS', features:['Бот + AI-воронка','Обучение на вашей базе данных','Интеграция CRM'], cta:'Заказать консультацию'},
              {name:'Enterprise', price:'от 25 000 000 UZS', features:['AI-воронка, кастомные модели','Интеграции 1С/CRM','SLA'], cta:'Заказать консультацию'},
            ].map((p, i) => (
              <Card key={i} className="flex flex-col card-hover">
                <CardHeader>
                                  <CardTitle className="flex items-center justify-between airy-element">
                  <span>{p.name}</span>
                  {i===1 && <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 text-black font-bold shadow-lg airy-pulse">🔥 ПОПУЛЯРНО</span>}
                </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="text-lg sm:text-xl font-semibold mb-3 airy-element">{p.price}</div>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5 airy-element">
                    {p.features.map((f,idx)=> <li key={idx} className="airy-element">{f}</li>)}
                  </ul>
                                                                           {IS_TG_READY ? (
                                        <a href={TG_LINK} target="_blank" rel="noopener">
                                          <Button className="mt-6 w-full airy-gradient-button bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500 text-black font-semibold" variant="secondary">{p.cta}</Button>
                                        </a>
                                      ) : (
                                        <a href="#contact">
                                          <Button className="mt-6 w-full airy-gradient-button bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500 text-black font-semibold" variant="secondary">{p.cta}</Button>
                                        </a>
                                      )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section id="why" className="container mx-auto py-16 md:py-24 bg-[#0A0A0A]/70 relative z-[2]">
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron mb-8 bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent text-center uppercase airy-element">ПОЧЕМУ МЫ</h2>
          <div className="grid gap-6 md:grid-cols-3">
                                                    <Card><CardHeader><CardTitle className="flex items-center gap-2 airy-element text-base sm:text-lg">
                                                      <div className="airy-pulse">
                                                        <Rocket className="text-lime-400 airy-icon"/>
                                                      </div>
                                                      Cursor + GPT-5 + n8n
                                                    </CardTitle></CardHeader><CardContent className="text-muted-foreground airy-element text-sm sm:text-base">Скорость разработки, умные сценарии и устойчивые автоматизации.</CardContent></Card>
             <Card><CardHeader><CardTitle className="flex items-center gap-2 airy-element text-base sm:text-lg">
               <div className="airy-pulse">
                 <Workflow className="text-cyan-400 airy-icon"/>
               </div>
               Фокус на ROI
             </CardTitle></CardHeader><CardContent className="text-muted-foreground airy-element text-sm sm:text-base">Мы продаём рост, а не код.</CardContent></Card>
             <Card><CardHeader><CardTitle className="flex items-center gap-2 airy-element text-base sm:text-lg">
               <div className="airy-pulse">
                 <PenTool className="text-lime-400 airy-icon"/>
               </div>
               Локальная экспертиза
             </CardTitle></CardHeader><CardContent className="text-muted-foreground airy-element text-sm sm:text-base">Контент и промты с культурной адаптацией (рус./узб.).</CardContent></Card>
          </div>
        </section>

        {/* About — удалено по требованию */}

        {/* FAQ */}
        <section id="faq" className="container mx-auto py-16 md:py-24 bg-[#0A0A0A]/70 relative z-[2]" data-fade>
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron mb-6 bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent text-center uppercase airy-element">FAQ — ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ</h2>
          <Accordion type="single" collapsible className="w-full">
            {[
              {q:'Сроки запуска', a:'Мы создаём рабочую версию продукта (MVP) в среднем за 7–14 дней. Точный срок зависит от сложности проекта и количества интеграций. Для небольших решений — быстрее, для комплексных систем с API и автоматизацией — чуть дольше. Мы заранее согласуем дедлайны и фиксируем их в договоре, чтобы вы знали, когда получите готовый продукт.'},
              {q:'Поддержка и сопровождение', a:'Предлагаем техническое сопровождение по SLA — от исправления ошибок и обновлений до масштабирования функционала. Можно выбрать пакет поддержки: ежемесячно или по запросу.'},
              {q:'Хранение данных', a:'Данные хранятся в надёжных облачных хранилищах с резервным копированием. Доступ распределяется по ролям (администратор, редактор, пользователь). Используем шифрование и защищённые каналы передачи данных, чтобы исключить утечки.'},
              {q:'NDA (конфиденциальность)', a:'Мы готовы подписать договор о неразглашении (NDA). По вашему желанию ваш бренд и сам факт сотрудничества не будут упомянуты в наших кейсах и публичных материалах.'},
              {q:'Цены и пакеты', a:'Есть готовые продуктовые пакеты с фиксированной стоимостью, а также индивидуальные Enterprise-решения. Цены зависят от функционала, интеграций и сроков. При необходимости можем предложить проект в несколько этапов, чтобы снизить стартовые расходы.'},
              {q:'GDPR и конфиденциальность', a:'Мы работаем по международным стандартам защиты данных, включая GDPR. Собираем только те данные, которые действительно нужны для работы продукта.'},
            ].map((item,i)=> (
              <AccordionItem key={i} value={`item-${i}`} className="airy-element">
                <AccordionTrigger className="airy-element text-base sm:text-lg font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground airy-element text-sm sm:text-base">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact form */}
        {IS_FEEDBACK_READY && (
          <section id="contact" className="container mx-auto py-16 md:py-24 bg-[#0A0A0A]/70 relative z-[2]" data-fade>
            <h2 className="text-2xl sm:text-3xl font-bold font-orbitron mb-6 bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent airy-element">Свяжитесь с нами</h2>
            <p className="text-muted-foreground mb-6 airy-element">Оставьте заявку — получите 15‑минутный звонок. При нажатии вы перейдёте в наш Telegram-бот.</p>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="airy-element">Имя</Label>
                <Input required id="name" name="name" placeholder="Иван" className="airy-element" />
              </div>
              <div>
                <Label htmlFor="company" className="airy-element">Компания</Label>
                <Input id="company" name="company" placeholder="ООО Пример" className="airy-element" />
              </div>
              <div>
                <Label htmlFor="email" className="airy-element">Email/Telegram</Label>
                <Input required id="email" name="email" placeholder="hello@company.com / @username" className="airy-element" />
              </div>
              <div>
                <Label htmlFor="phone" className="airy-element">Телефон</Label>
                <Input id="phone" name="phone" placeholder="+998 XX XXX XX XX" className="airy-element" />
              </div>
              {/* Поля задачи/бюджета/реф удалены по требованию */}
              <div className="md:col-span-2 flex items-center gap-2 text-sm">
                <input id="policy" name="policy" type="checkbox" required className="h-4 w-4 airy-element" />
                <label htmlFor="policy" className="airy-element">Согласен с <a className="text-accent underline airy-link" href="/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></label>
              </div>
              <div className="md:col-span-2">
                <Button type="submit" variant="secondary" className="airy-gradient-button bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500 text-black font-semibold"><Send className="size-4 airy-icon"/> Оставить заявку — получить 15‑минутный звонок</Button>
              </div>
            </form>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-[#0A0A0A]/70 relative z-[2]" data-fade>
        <div className="container mx-auto py-10 grid gap-6 md:grid-cols-4">
                      <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-lime-400 text-black grid place-items-center font-orbitron font-extrabold airy-element">SL</div>
                <span className="font-orbitron">Synaplink AI</span>
              </div>
              <p className="text-sm text-muted-foreground airy-element">Synaplink AI — взламываем будущее, делаем бизнес проще</p>
            </div>
          <div>
            <h4 className="font-semibold mb-3 airy-element">Быстрые ссылки</h4>
            <ul className="space-y-2 text-sm text-muted-foreground airy-element">
              <li className="airy-element"><a href="#services" className="airy-link w-[250px] inline-block">Услуги</a></li>
              <li className="airy-element"><a href="#pricing" className="airy-link w-[250px] inline-block">Прайс</a></li>
              <li className="airy-element"><a href="#faq" className="airy-link w-[250px] inline-block">FAQ</a></li>
              <li className="airy-element"><a href="/privacy" className="airy-link w-[250px] inline-block">Политика конфиденциальности</a></li>
            </ul>
          </div>
          <div>
              <h4 className="font-semibold mb-3 airy-element">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground airy-element">
                <li className="airy-element"><span className="font-medium">Telegram-бот:</span> {IS_TG_READY ? (<a className="text-lime-400 hover:text-cyan-400 airy-link" href={TG_LINK} target="_blank" rel="noopener">перейти в бот</a>) : (<span className="opacity-70">скоро</span>)}</li>
                <li className="airy-element"><span className="font-medium">Telegram-канал:</span> {IS_TG_CHANNEL_READY ? (<a className="text-lime-400 hover:text-cyan-400 airy-link" href={TG_CHANNEL} target="_blank" rel="noopener">подписаться</a>) : (<span className="opacity-70">скоро</span>)}</li>
                <li className="airy-element"><a href={TG_LINK} target="_blank" rel="noopener" className="w-[210px] inline-block text-lime-400 hover:text-cyan-400 airy-link">Telegram</a></li>
                <li className="airy-element"><a className="w-[210px] inline-block text-lime-400 hover:text-cyan-400 airy-link" href={WA_LINK} target="_blank" rel="noopener">WhatsApp</a></li>
                <li className="airy-element"><a href="mailto:hello@synaplink.ai" className="w-[210px] inline-block text-lime-400 hover:text-cyan-400 airy-link">hello@synaplink.ai</a></li>
                <li className="airy-element"><a href={`tel:+${PHONE_NUMBER}`} className="w-[210px] inline-block text-lime-400 hover:text-cyan-400 airy-link">{USER_FRIENDLY_PHONE_NUMBER}</a></li>
                <li className="airy-element">г. Ташкент</li>
              </ul>
          </div>
          {/* Соцсети перенесены в раздел Контакты выше */}
        </div>
      </footer>

      {/* Copyright */}
      <div className="border-t border-border bg-[#0A0A0A]/90 relative z-[2] py-4" data-fade>
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground airy-element">© 2025 SYNAPLINK. Все права защищены</p>
        </div>
      </div>

      {/* Floating chat buttons — удалены по требованию */}



      {/* Lead magnet popup — удалён по требованию */}
    </div>
  );
};

export default Index;
