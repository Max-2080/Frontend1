// Мобильное меню
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

// Валидация формы
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Простая валидация
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        
        if (!email.value.includes('@')) {
            emailError.textContent = 'Пожалуйста, введите корректный email адрес';
            emailError.classList.remove('visually-hidden');
            email.setAttribute('aria-invalid', 'true');
        } else {
            emailError.textContent = '';
            emailError.classList.add('visually-hidden');
            email.setAttribute('aria-invalid', 'false');
            
            // В реальном проекте здесь была бы отправка формы
            alert('Сообщение отправлено! (В демо-версии)');
            contactForm.reset();
        }
    });
}

// Плавная прокрутка для ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});