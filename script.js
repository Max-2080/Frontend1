// ============================================
// ОСНОВНЫЕ ФУНКЦИИ ДЛЯ САЙТА
// ============================================

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            const isExpanded = navList.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// Активное состояние навигации
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Определяем активную страницу
        if ((currentPage === 'index.html' || currentPage === '') && linkHref === 'index.html') {
            link.classList.add('active');
        } else if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ============================================
// ТЕХНИКА: LAZY LOADING УЛУЧШЕНИЯ
// ============================================

// Lazy loading улучшение
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                
                // Если srcset не загружен, загружаем
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    delete img.dataset.srcset;
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            imageObserver.observe(img);
        }
    });
}

// ============================================
// ТЕХНИКА: ADAPTIVE IMAGES
// ============================================

// Загрузка разных изображений для разных экранов
function loadAdaptiveImages() {
    const adaptiveImages = document.querySelectorAll('picture source[media]');
    
    adaptiveImages.forEach(source => {
        const mediaQuery = window.matchMedia(source.getAttribute('media'));
        
        if (mediaQuery.matches) {
            const img = source.parentElement.querySelector('img');
            if (img && img.src !== source.getAttribute('srcset')) {
                // Сохраняем текущий src на случай возврата
                if (!img.dataset.originalSrc) {
                    img.dataset.originalSrc = img.src;
                }
                img.src = source.getAttribute('srcset');
            }
        }
    });
}

// ============================================
// ТЕХНИКА: RETINA DISPLAY ПОДДЕРЖКА
// ============================================

// Автоматическое определение плотности пикселей
function checkPixelRatio() {
    const pixelRatio = window.devicePixelRatio || 1;
    const retinaImages = document.querySelectorAll('img[srcset]');
    
    retinaImages.forEach(img => {
        const srcset = img.getAttribute('srcset');
        if (srcset) {
            const sources = srcset.split(', ');
            let bestSrc = img.getAttribute('src');
            let bestDensity = 1;
            
            sources.forEach(source => {
                const [url, densityStr] = source.split(' ');
                const density = parseFloat(densityStr) || 1;
                
                if (density <= pixelRatio && density > bestDensity) {
                    bestDensity = density;
                    bestSrc = url;
                }
            });
            
            if (bestSrc !== img.src) {
                img.src = bestSrc;
            }
        }
    });
}

// ============================================
// ТЕХНИКА: OBJECT-FIT ДЕМОНСТРАЦИЯ
// ============================================

// Интерактивная демонстрация object-fit
function initObjectFitDemo() {
    const objectFitItems = document.querySelectorAll('.object-fit-item img');
    
    objectFitItems.forEach(img => {
        // Добавляем обработчик клика для демонстрации
        img.addEventListener('click', function() {
            const currentClass = Array.from(this.classList).find(cls => cls.startsWith('object-fit-'));
            const currentFit = currentClass ? currentClass.replace('object-fit-', '') : 'cover';
            
            const fits = ['cover', 'contain', 'fill', 'none', 'scale-down'];
            const currentIndex = fits.indexOf(currentFit);
            const nextFit = fits[(currentIndex + 1) % fits.length];
            
            // Обновляем классы
            this.classList.remove('object-fit-cover', 'object-fit-contain', 'object-fit-fill', 'object-fit-none', 'object-fit-scale-down');
            this.classList.add(`object-fit-${nextFit}`);
            
            // Обновляем подпись
            const caption = this.parentElement.querySelector('span');
            if (caption) {
                caption.textContent = `object-fit: ${nextFit}`;
            }
        });
        
        // Добавляем title для доступности
        const fitType = Array.from(img.classList).find(cls => cls.startsWith('object-fit-'));
        if (fitType) {
            img.setAttribute('title', `Object-fit: ${fitType.replace('object-fit-', '')}. Кликните для изменения.`);
        }
    });
}

// ============================================
// ТЕХНИКА: АДАПТИВНАЯ ГАЛЕРЕЯ
// ============================================

// Адаптивное изменение количества колонок
function updateGalleryColumns() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;
    
    const width = window.innerWidth;
    let columns = 4;
    
    if (width <= 480) {
        columns = 1;
    } else if (width <= 768) {
        columns = 2;
    } else if (width <= 1024) {
        columns = 3;
    }
    
    gallery.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

// ============================================
// ВАЛИДАЦИЯ ФОРМ
// ============================================

// Валидация формы
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const emailInput = this.querySelector('input[type="email"]');
            const emailError = this.querySelector('#email-error');
            
            // Проверка email
            if (emailInput && !isValidEmail(emailInput.value)) {
                isValid = false;
                if (emailError) {
                    emailError.textContent = 'Пожалуйста, введите корректный email адрес';
                    emailError.classList.remove('visually-hidden');
                }
                emailInput.setAttribute('aria-invalid', 'true');
                emailInput.focus();
            } else {
                if (emailError) {
                    emailError.textContent = '';
                    emailError.classList.add('visually-hidden');
                }
                if (emailInput) emailInput.setAttribute('aria-invalid', 'false');
            }
            
            if (isValid) {
                // Имитация отправки формы
                alert('Сообщение отправлено! (Это демо-версия)');
                this.reset();
            }
        });
    }
}

// Проверка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// ОБНОВЛЕНИЕ ГОДА В ФУТЕРЕ
// ============================================

function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// ПЛАВНАЯ ПРОКРУТКА
// ============================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ОБРАБОТЧИКИ СОБЫТИЙ И ЗАПУСК
// ============================================

// Инициализация всех функций при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Основные функции
    initLazyLoading();
    initObjectFitDemo();
    initFormValidation();
    initSmoothScrolling();
    
    // Обновления
    updateCurrentYear();
    updateGalleryColumns();
    checkPixelRatio();
    loadAdaptiveImages();
    
    // Дебаг информация
    console.log('Адаптивные изображения инициализированы');
    console.log('Плотность пикселей:', window.devicePixelRatio || 1);
    console.log('Ширина экрана:', window.innerWidth, 'px');
});

// Обновление