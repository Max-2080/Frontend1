// Мобильное меню (для всех страниц)
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', 
            navList.classList.contains('active'));
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

// Валидация формы на главной
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        validateAndSubmitForm(contactForm);
    });
}

// Валидация формы на странице контактов
const contactFormPage = document.getElementById('contactFormPage');
if (contactFormPage) {
    contactFormPage.addEventListener('submit', (e) => {
        e.preventDefault();
        validateAndSubmitForm(contactFormPage);
    });
}

// Общая функция валидации
function validateAndSubmitForm(form) {
    let isValid = true;
    
    // Проверка email
    const emailInput = form.querySelector('input[type="email"]');
    const emailError = form.querySelector('#email-error, #email-error-page');
    
    if (emailInput && !emailInput.value.includes('@')) {
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
    
    // Проверка чекбокса согласия (если есть)
    const consentCheckbox = form.querySelector('input[type="checkbox"]');
    if (consentCheckbox && !consentCheckbox.checked) {
        isValid = false;
        consentCheckbox.focus();
    }
    
    if (isValid) {
        // В реальном проекте здесь AJAX-отправка
        alert('Сообщение отправлено! (В демо-версии форма не отправляет данные)');
        form.reset();
    }
}

// Плавная прокрутка для якорных ссылок (только на одной странице)
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Автоматическое определение активной страницы в навигации
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Добавление года в футер
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('footer p:first-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
});