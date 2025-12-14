// Скрипт для доступности формы

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    let previousActiveElement;

    // Валидация формы в реальном времени
    const validateField = (field) => {
        const errorElement = document.getElementById(`${field.id}-error`);
        
        if (!field.checkValidity()) {
            field.setAttribute('aria-invalid', 'true');
            errorElement.textContent = getErrorMessage(field);
            return false;
        } else {
            field.removeAttribute('aria-invalid');
            errorElement.textContent = '';
            return true;
        }
    };

    // Сообщения об ошибках
    const getErrorMessage = (field) => {
        if (field.validity.valueMissing) {
            return 'Это поле обязательно для заполнения';
        }
        if (field.validity.typeMismatch && field.type === 'email') {
            return 'Введите корректный email адрес';
        }
        if (field.validity.tooShort) {
            return `Минимальная длина: ${field.minLength} символов`;
        }
        if (field.validity.tooLong) {
            return `Максимальная длина: ${field.maxLength} символов`;
        }
        return 'Пожалуйста, исправьте ошибку в этом поле';
    };

    // Делегирование событий для валидации
    form.addEventListener('input', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            validateField(e.target);
        }
    });

    form.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            validateField(e.target);
        }
    });

    // Обработка отправки формы
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
                if (isValid === false) {
                    field.focus();
                }
            }
        });

        if (isValid) {
            // Сохраняем активный элемент
            previousActiveElement = document.activeElement;
            
            // Показываем модальное окно
            modal.removeAttribute('hidden');
            modal.focus();
            
            // Блокируем фоновый контент
            document.querySelectorAll('body > *:not(.modal)').forEach(el => {
                if (!modal.contains(el)) {
                    el.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Сбрасываем форму
            setTimeout(() => form.reset(), 100);
        }
    });

    // Управление модальным окном
    function closeModal() {
        modal.setAttribute('hidden', 'true');
        
        // Возвращаем доступность фоновому контенту
        document.querySelectorAll('[aria-hidden="true"]').forEach(el => {
            el.removeAttribute('aria-hidden');
        });
        
        // Возвращаем фокус
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
    }

    closeModalBtn.addEventListener('click', closeModal);
    
    // Закрытие по Escape
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Захват фокуса внутри модалки
    modal.addEventListener('keydown', trapTabFocus);

    function trapTabFocus(e) {
        if (e.key !== 'Tab') return;
        
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // Управление кнопкой сброса
    form.querySelector('button[type="reset"]').addEventListener('click', () => {
        form.querySelectorAll('[aria-invalid]').forEach(el => {
            el.removeAttribute('aria-invalid');
        });
        form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
    });

    // Улучшение навигации для fieldset
    const fieldsets = form.querySelectorAll('fieldset');
    fieldsets.forEach((fieldset, index) => {
        const firstInput = fieldset.querySelector('input, textarea, select');
        if (firstInput) {
            fieldset.setAttribute('tabindex', '-1');
            fieldset.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    firstInput.focus();
                }
            });
        }
    });

    // Живой регион для динамических сообщений
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'visually-hidden';
    document.body.appendChild(liveRegion);

    // Функция для объявлений
    window.announceToScreenReader = (message) => {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 3000);
    };
});