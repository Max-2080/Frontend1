// // ============================================
// // ОСНОВНЫЕ ФУНКЦИИ ДЛЯ САЙТА
// // ============================================

// // Мобильное меню
// document.addEventListener('DOMContentLoaded', function() {
//     const menuToggle = document.querySelector('.menu-toggle');
//     const navList = document.querySelector('.nav-list');
    
//     if (menuToggle && navList) {
//         menuToggle.addEventListener('click', function() {
//             navList.classList.toggle('active');
//             const isExpanded = navList.classList.contains('active');
//             menuToggle.setAttribute('aria-expanded', isExpanded);
//         });
        
//         // Закрытие меню при клике на ссылку
//         document.querySelectorAll('.nav-link').forEach(link => {
//             link.addEventListener('click', () => {
//                 navList.classList.remove('active');
//                 menuToggle.setAttribute('aria-expanded', 'false');
//             });
//         });
        
//         // Закрытие меню при клике вне его
//         document.addEventListener('click', (e) => {
//             if (!e.target.closest('.nav-container') && navList.classList.contains('active')) {
//                 navList.classList.remove('active');
//                 menuToggle.setAttribute('aria-expanded', 'false');
//             }
//         });
//     }
// });

// // Активное состояние навигации
// document.addEventListener('DOMContentLoaded', function() {
//     const currentPage = window.location.pathname.split('/').pop() || 'index.html';
//     const navLinks = document.querySelectorAll('.nav-link');
    
//     navLinks.forEach(link => {
//         const linkHref = link.getAttribute('href');
        
//         // Определяем активную страницу
//         if ((currentPage === 'index.html' || currentPage === '') && linkHref === 'index.html') {
//             link.classList.add('active');
//         } else if (linkHref === currentPage) {
//             link.classList.add('active');
//         } else {
//             link.classList.remove('active');
//         }
//     });
// });

// // ============================================
// // ТЕХНИКА: LAZY LOADING УЛУЧШЕНИЯ
// // ============================================

// // Lazy loading улучшение
// function initLazyLoading() {
//     const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
//     const imageObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;
//                 img.classList.add('loaded');
                
//                 // Если srcset не загружен, загружаем
//                 if (img.dataset.srcset) {
//                     img.srcset = img.dataset.srcset;
//                     delete img.dataset.srcset;
//                 }
                
//                 observer.unobserve(img);
//             }
//         });
//     }, {
//         rootMargin: '50px 0px',
//         threshold: 0.1
//     });
    
//     lazyImages.forEach(img => {
//         if (img.complete) {
//             img.classList.add('loaded');
//         } else {
//             img.addEventListener('load', function() {
//                 this.classList.add('loaded');
//             });
            
//             imageObserver.observe(img);
//         }
//     });
// }

// // ============================================
// // ТЕХНИКА: ADAPTIVE IMAGES
// // ============================================

// // Загрузка разных изображений для разных экранов
// function loadAdaptiveImages() {
//     const adaptiveImages = document.querySelectorAll('picture source[media]');
    
//     adaptiveImages.forEach(source => {
//         const mediaQuery = window.matchMedia(source.getAttribute('media'));
        
//         if (mediaQuery.matches) {
//             const img = source.parentElement.querySelector('img');
//             if (img && img.src !== source.getAttribute('srcset')) {
//                 // Сохраняем текущий src на случай возврата
//                 if (!img.dataset.originalSrc) {
//                     img.dataset.originalSrc = img.src;
//                 }
//                 img.src = source.getAttribute('srcset');
//             }
//         }
//     });
// }

// // ============================================
// // ТЕХНИКА: RETINA DISPLAY ПОДДЕРЖКА
// // ============================================

// // Автоматическое определение плотности пикселей
// function checkPixelRatio() {
//     const pixelRatio = window.devicePixelRatio || 1;
//     const retinaImages = document.querySelectorAll('img[srcset]');
    
//     retinaImages.forEach(img => {
//         const srcset = img.getAttribute('srcset');
//         if (srcset) {
//             const sources = srcset.split(', ');
//             let bestSrc = img.getAttribute('src');
//             let bestDensity = 1;
            
//             sources.forEach(source => {
//                 const [url, densityStr] = source.split(' ');
//                 const density = parseFloat(densityStr) || 1;
                
//                 if (density <= pixelRatio && density > bestDensity) {
//                     bestDensity = density;
//                     bestSrc = url;
//                 }
//             });
            
//             if (bestSrc !== img.src) {
//                 img.src = bestSrc;
//             }
//         }
//     });
// }

// // ============================================
// // ТЕХНИКА: OBJECT-FIT ДЕМОНСТРАЦИЯ
// // ============================================

// // Интерактивная демонстрация object-fit
// function initObjectFitDemo() {
//     const objectFitItems = document.querySelectorAll('.object-fit-item img');
    
//     objectFitItems.forEach(img => {
//         // Добавляем обработчик клика для демонстрации
//         img.addEventListener('click', function() {
//             const currentClass = Array.from(this.classList).find(cls => cls.startsWith('object-fit-'));
//             const currentFit = currentClass ? currentClass.replace('object-fit-', '') : 'cover';
            
//             const fits = ['cover', 'contain', 'fill', 'none', 'scale-down'];
//             const currentIndex = fits.indexOf(currentFit);
//             const nextFit = fits[(currentIndex + 1) % fits.length];
            
//             // Обновляем классы
//             this.classList.remove('object-fit-cover', 'object-fit-contain', 'object-fit-fill', 'object-fit-none', 'object-fit-scale-down');
//             this.classList.add(`object-fit-${nextFit}`);
            
//             // Обновляем подпись
//             const caption = this.parentElement.querySelector('span');
//             if (caption) {
//                 caption.textContent = `object-fit: ${nextFit}`;
//             }
//         });
        
//         // Добавляем title для доступности
//         const fitType = Array.from(img.classList).find(cls => cls.startsWith('object-fit-'));
//         if (fitType) {
//             img.setAttribute('title', `Object-fit: ${fitType.replace('object-fit-', '')}. Кликните для изменения.`);
//         }
//     });
// }

// // ============================================
// // ТЕХНИКА: АДАПТИВНАЯ ГАЛЕРЕЯ
// // ============================================

// // Адаптивное изменение количества колонок
// function updateGalleryColumns() {
//     const gallery = document.querySelector('.gallery');
//     if (!gallery) return;
    
//     const width = window.innerWidth;
//     let columns = 4;
    
//     if (width <= 480) {
//         columns = 1;
//     } else if (width <= 768) {
//         columns = 2;
//     } else if (width <= 1024) {
//         columns = 3;
//     }
    
//     gallery.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
// }

// // ============================================
// // ВАЛИДАЦИЯ ФОРМ
// // ============================================

// // Валидация формы
// function initFormValidation() {
//     const contactForm = document.getElementById('contactForm');
    
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             let isValid = true;
//             const emailInput = this.querySelector('input[type="email"]');
//             const emailError = this.querySelector('#email-error');
            
//             // Проверка email
//             if (emailInput && !isValidEmail(emailInput.value)) {
//                 isValid = false;
//                 if (emailError) {
//                     emailError.textContent = 'Пожалуйста, введите корректный email адрес';
//                     emailError.classList.remove('visually-hidden');
//                 }
//                 emailInput.setAttribute('aria-invalid', 'true');
//                 emailInput.focus();
//             } else {
//                 if (emailError) {
//                     emailError.textContent = '';
//                     emailError.classList.add('visually-hidden');
//                 }
//                 if (emailInput) emailInput.setAttribute('aria-invalid', 'false');
//             }
            
//             if (isValid) {
//                 // Имитация отправки формы
//                 alert('Сообщение отправлено! (Это демо-версия)');
//                 this.reset();
//             }
//         });
//     }
// }

// // Проверка email
// function isValidEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// // ============================================
// // ОБНОВЛЕНИЕ ГОДА В ФУТЕРЕ
// // ============================================

// function updateCurrentYear() {
//     const yearElement = document.getElementById('current-year');
//     if (yearElement) {
//         yearElement.textContent = new Date().getFullYear();
//     }
// }

// // ============================================
// // ПЛАВНАЯ ПРОКРУТКА
// // ============================================

// function initSmoothScrolling() {
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function(e) {
//             const href = this.getAttribute('href');
//             if (href === '#') return;
            
//             const targetElement = document.querySelector(href);
//             if (targetElement) {
//                 e.preventDefault();
                
//                 window.scrollTo({
//                     top: targetElement.offsetTop - 80,
//                     behavior: 'smooth'
//                 });
//             }
//         });
//     });
// }

// // ============================================
// // ОБРАБОТЧИКИ СОБЫТИЙ И ЗАПУСК
// // ============================================

// // Инициализация всех функций при загрузке
// document.addEventListener('DOMContentLoaded', function() {
//     // Основные функции
//     initLazyLoading();
//     initObjectFitDemo();
//     initFormValidation();
//     initSmoothScrolling();
    
//     // Обновления
//     updateCurrentYear();
//     updateGalleryColumns();
//     checkPixelRatio();
//     loadAdaptiveImages();
    
//     // Дебаг информация
//     console.log('Адаптивные изображения инициализированы');
//     console.log('Плотность пикселей:', window.devicePixelRatio || 1);
//     console.log('Ширина экрана:', window.innerWidth, 'px');
// });

// // Обновление











// // Скрипт для доступности формы

// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('contact-form');
//     const modal = document.getElementById('success-modal');
//     const closeModalBtn = document.getElementById('close-modal');
//     let previousActiveElement;

//     // Валидация формы в реальном времени
//     const validateField = (field) => {
//         const errorElement = document.getElementById(`${field.id}-error`);
        
//         if (!field.checkValidity()) {
//             field.setAttribute('aria-invalid', 'true');
//             errorElement.textContent = getErrorMessage(field);
//             return false;
//         } else {
//             field.removeAttribute('aria-invalid');
//             errorElement.textContent = '';
//             return true;
//         }
//     };

//     // Сообщения об ошибках
//     const getErrorMessage = (field) => {
//         if (field.validity.valueMissing) {
//             return 'Это поле обязательно для заполнения';
//         }
//         if (field.validity.typeMismatch && field.type === 'email') {
//             return 'Введите корректный email адрес';
//         }
//         if (field.validity.tooShort) {
//             return `Минимальная длина: ${field.minLength} символов`;
//         }
//         if (field.validity.tooLong) {
//             return `Максимальная длина: ${field.maxLength} символов`;
//         }
//         return 'Пожалуйста, исправьте ошибку в этом поле';
//     };

//     // Делегирование событий для валидации
//     form.addEventListener('input', (e) => {
//         if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
//             validateField(e.target);
//         }
//     });

//     form.addEventListener('change', (e) => {
//         if (e.target.type === 'checkbox') {
//             validateField(e.target);
//         }
//     });

//     // Обработка отправки формы
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
        
//         let isValid = true;
//         const requiredFields = form.querySelectorAll('[required]');
        
//         requiredFields.forEach(field => {
//             if (!validateField(field)) {
//                 isValid = false;
//                 if (isValid === false) {
//                     field.focus();
//                 }
//             }
//         });

//         if (isValid) {
//             // Сохраняем активный элемент
//             previousActiveElement = document.activeElement;
            
//             // Показываем модальное окно
//             modal.removeAttribute('hidden');
//             modal.focus();
            
//             // Блокируем фоновый контент
//             document.querySelectorAll('body > *:not(.modal)').forEach(el => {
//                 if (!modal.contains(el)) {
//                     el.setAttribute('aria-hidden', 'true');
//                 }
//             });
            
//             // Сбрасываем форму
//             setTimeout(() => form.reset(), 100);
//         }
//     });

//     // Управление модальным окном
//     function closeModal() {
//         modal.setAttribute('hidden', 'true');
        
//         // Возвращаем доступность фоновому контенту
//         document.querySelectorAll('[aria-hidden="true"]').forEach(el => {
//             el.removeAttribute('aria-hidden');
//         });
        
//         // Возвращаем фокус
//         if (previousActiveElement) {
//             previousActiveElement.focus();
//         }
//     }

//     closeModalBtn.addEventListener('click', closeModal);
    
//     // Закрытие по Escape
//     modal.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape') {
//             closeModal();
//         }
//     });

//     // Захват фокуса внутри модалки
//     modal.addEventListener('keydown', trapTabFocus);

//     function trapTabFocus(e) {
//         if (e.key !== 'Tab') return;
        
//         const focusableElements = modal.querySelectorAll(
//             'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//         );
        
//         if (focusableElements.length === 0) return;
        
//         const firstElement = focusableElements[0];
//         const lastElement = focusableElements[focusableElements.length - 1];
        
//         if (e.shiftKey && document.activeElement === firstElement) {
//             e.preventDefault();
//             lastElement.focus();
//         } else if (!e.shiftKey && document.activeElement === lastElement) {
//             e.preventDefault();
//             firstElement.focus();
//         }
//     }

//     // Управление кнопкой сброса
//     form.querySelector('button[type="reset"]').addEventListener('click', () => {
//         form.querySelectorAll('[aria-invalid]').forEach(el => {
//             el.removeAttribute('aria-invalid');
//         });
//         form.querySelectorAll('.error-message').forEach(el => {
//             el.textContent = '';
//         });
//     });

//     // Улучшение навигации для fieldset
//     const fieldsets = form.querySelectorAll('fieldset');
//     fieldsets.forEach((fieldset, index) => {
//         const firstInput = fieldset.querySelector('input, textarea, select');
//         if (firstInput) {
//             fieldset.setAttribute('tabindex', '-1');
//             fieldset.addEventListener('keydown', (e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault();
//                     firstInput.focus();
//                 }
//             });
//         }
//     });

//     // Живой регион для динамических сообщений
//     const liveRegion = document.createElement('div');
//     liveRegion.setAttribute('aria-live', 'polite');
//     liveRegion.setAttribute('aria-atomic', 'true');
//     liveRegion.className = 'visually-hidden';
//     document.body.appendChild(liveRegion);

//     // Функция для объявлений
//     window.announceToScreenReader = (message) => {
//         liveRegion.textContent = message;
//         setTimeout(() => {
//             liveRegion.textContent = '';
//         }, 3000);
//     };
// });









// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Анимация прогресс-баров при скролле
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    };

    // Запуск анимации при загрузке
    animateProgressBars();
});