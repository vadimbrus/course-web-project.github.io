/**
 * КУРСОВА РОБОТА: Основний скрипт сайту "COURSE"
 * Чистий Vanilla JS без сторонніх бібліотек
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. ДАНІ КУРСІВ (Масив об'єктів з українізованим текстом та твоїми картинками)
    // ==========================================================================
    const coursesData = [
        { 
            title: "Повний практичний посібник з дизайну", 
            author: "Дженні Гілл", 
            price: "$15", 
            category: "design", 
            displayCategory: "Дизайн",
            image: "1.jpg" 
        },
        { 
            title: "Посібник для початківців з HTML та CSS", 
            author: "Дженні Гілл", 
            price: "$20", 
            category: "development", 
            displayCategory: "Розробка",
            image: "2.jpg" 
        },
        { 
            title: "Посібник з просунутого Photoshop та Illustrator", 
            author: "Дженні Гілл", 
            price: "$25", 
            category: "design", 
            displayCategory: "Дизайн",
            image: "3.jpg" 
        },
        { 
            title: "JavaScript для сучасної веб-розробки", 
            author: "Джон Доу", 
            price: "$30", 
            category: "development", 
            displayCategory: "Розробка",
            image: "4.jpg" 
        },
        { 
            title: "UI/UX дизайн мобільних додатків", 
            author: "Сара Коннор", 
            price: "$18", 
            category: "design", 
            displayCategory: "Дизайн",
            image: "5.jpg" 
        },
        { 
            title: "React.js: Комплексний практичний курс", 
            author: "Алекс Сміт", 
            price: "$35", 
            category: "development", 
            displayCategory: "Розробка",
            image: "6.jpg" 
        }
    ];

    // ==========================================================================
    // 2. ДИНАМІЧНИЙ ВИВІД КУРСІВ ТА ФІЛЬТРАЦІЯ (DOM-маніпуляції)
    // ==========================================================================
    const homeContainer = document.getElementById('coursesGrid');
    const catalogContainer = document.getElementById('coursesCatalogGrid');

    // Функція генерації HTML-структури для кожної картки
    function generateCoursesHTML(courses) {
        let htmlContent = '';
        courses.forEach(course => {
            htmlContent += `
                <article class="course-card" data-category="${course.category}">
                    <div class="course-card__img-wrapper">
                        <img src="${course.image}" alt="${course.title}" onerror="this.parentNode.style.backgroundColor='#eaeaea'; this.style.display='none';">
                    </div>
                    <div class="course-card__content">
                        <span class="course-card__badge" style="font-size: 12px; color: #ffbc09; font-weight: bold; text-transform: uppercase;">${course.displayCategory}</span>
                        <h3 style="margin-top: 5px;">${course.title}</h3>
                        <p>Унікальна програма навчання для швидкого старту в професії під керівництвом досвідчених менторів.</p>
                        <div class="course-card__footer">
                            <span class="course-card__author">Автор: ${course.author}</span>
                            <span class="course-card__price">${course.price}</span>
                        </div>
                    </div>
                </article>
            `;
        });
        return htmlContent;
    }

    // Вивід 3-х популярних курсів на Головній сторінці (index.html)
    if (homeContainer) {
        const popularCourses = coursesData.slice(0, 3);
        homeContainer.innerHTML = generateCoursesHTML(popularCourses);
    }

    // Вивід усіх курсів та фільтрація на сторінці каталогу (courses.html)
    if (catalogContainer) {
        catalogContainer.innerHTML = generateCoursesHTML(coursesData);

        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                if (filterValue === 'all') {
                    catalogContainer.innerHTML = generateCoursesHTML(coursesData);
                } else {
                    const filtered = coursesData.filter(course => course.category === filterValue);
                    catalogContainer.innerHTML = generateCoursesHTML(filtered);
                }
            });
        });
    }

    // ==========================================================================
    // 3. ФУНКЦІОНАЛ МОБІЛЬНОГО МЕНЮ ("BURGER MENU")
    // ==========================================================================
    const burgerBtn = document.getElementById('burgerBtn');
    const mainNav = document.getElementById('mainNav');

    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            burgerBtn.classList.toggle('active');
        });

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                burgerBtn.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 4. МОДАЛЬНЕ ВІКНО З ФУНКЦІОНАЛОМ "MISS CLICK"
    // ==========================================================================
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('modalCloseBtn');
    const openModalBtnHeader = document.querySelector('.header__action .btn-yellow');
    const callbackForm = document.getElementById('callbackForm');

    function openModal(e) {
        if (e) e.preventDefault();
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (openModalBtnHeader) openModalBtnHeader.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // Закриття вікна при кліку на затемнену область навколо форми (Miss Click)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Закриття модального вікна кнопкою Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    if (callbackForm) {
        callbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Дякуємо! Вашу заявку успішно прийнято. Менеджер зателефонує вам.');
            callbackForm.reset();
            closeModal();
        });
    }

    // ==========================================================================
    // 5. ФУНКЦІОНАЛ СЛАЙДЕРА ВІДГУКІВ
    // ==========================================================================
    let currentSlide = 0;
    const slides = document.querySelectorAll('.custom-slide');
    const nextBtn = document.getElementById('slideNext');
    const prevBtn = document.getElementById('slidePrev');

    function showSlide(index) {
        if (slides.length === 0) return;
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        slides.forEach((slide, i) => {
            slide.style.display = (i === currentSlide) ? 'block' : 'none';
        });
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });
        showSlide(currentSlide);
    }

    // ==========================================================================
    // 6. ОБРОБКА ФОРМИ НА СТОРІНЦІ КОНТАКТІВ
    // ==========================================================================
    const contactPageForm = document.getElementById('contactPageForm');
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Дякуємо! Ваше повідомлення успішно надіслано. Ми відповімо на вказаний Email.');
            contactPageForm.reset();
        });
    }
});