document.addEventListener('DOMContentLoaded', function () {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const headerInner = document.querySelector('.header__inner');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');

        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            headerInner.style.background = '#131B1FB2';
            document.body.style.overflow = 'hidden';
        } else {
            headerInner.style.background = '#00000025';
            document.body.style.overflow = '';
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('.nav__link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            headerInner.style.background = '#00000025';
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!burgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            headerInner.style.background = '#00000025';
            document.body.style.overflow = '';
        }
    });
    const swiper = new Swiper('.slider_block__wrapper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            init: function () {
                updateCounter(this);
            },
            slideChange: function () {
                updateCounter(this);
            },
        },
    });

    function updateCounter(swiperInstance) {
        const currentEl = document.querySelector('.swiper_counter .current');
        const totalEl = document.querySelector('.swiper_counter .total');

        if (currentEl && totalEl && swiperInstance.slides) {
            let current = swiperInstance.realIndex + 1;
            let total = swiperInstance.slides.length;

            currentEl.textContent = current;
            totalEl.textContent = total;
        }
    }

    const tabs = document.querySelectorAll('.slider_tabs__tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    

    let faq = document.querySelector('.text_block__v6__faq');
    if (faq) {
        faq.addEventListener('click', function (e) {
            let targetItem = e.target.closest('.faq_head');
            if (!targetItem) return;

            let faqItem = targetItem.closest('.faq_item');
            let currentText = faqItem.querySelector('.faq_content');

            faqItem.classList.toggle('active');

            if (faqItem.classList.contains('active')) {
                currentText.style.maxHeight = currentText.scrollHeight + 'px';
            } else {
                currentText.style.maxHeight = '0';
            }

            const hasActiveItem = document.querySelector('.faq_item.active');
            const faqImage = document.querySelector('.text_block__v6 img');

            if (faqImage) {
                if (hasActiveItem) {
                    faqImage.style.maxHeight = '496px';
                } else {
                    faqImage.style.maxHeight = '251px';
                }
            }
        });
    }

    const tabs2 = Array.from(document.querySelectorAll('.questions_tab'));
    const contents = Array.from(document.querySelectorAll('.question_content'));

    tabs2.forEach((tab, index) => {
        tab.addEventListener('click', function () {
            document.querySelector('.questions_tab.active')?.classList.remove('active');
            tab.classList.add('active');
            document.querySelector('.question_content.active')?.classList.remove('active');
            if (contents[index]) {
                contents[index].classList.add('active');
            }
        });
    });


    function isMobile() {
        return window.innerWidth <= 950;
    }

    function initAccordion() {
        const textCards = document.querySelectorAll('.text_block__v1--card.card-1, .text_block__v1--card.card-2');
        
        if (isMobile()) {
            textCards.forEach(card => {
                card.removeEventListener('click', cardClickHandler);
                card.addEventListener('click', cardClickHandler);
                card.classList.remove('active');
            });
        } else {
            textCards.forEach(card => {
                card.removeEventListener('click', cardClickHandler);
                card.classList.remove('active');
            });
        }
    }

    function cardClickHandler(event) {
        if (event.target.classList.contains('text_block__v1--btn')) {
            event.stopPropagation();
            return;
        }
        this.classList.toggle('active');
    }

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initAccordion, 250);
    });

    initAccordion();


    const modal = document.createElement('div');
    modal.className = 'cert-modal';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'cert-modal-close';
    closeBtn.innerHTML = '&times;';
    
    const modalImg = document.createElement('img');
    modalImg.alt = 'Сертификат';
    
    const caption = document.createElement('p');
    caption.className = 'cert-modal-caption';
    
    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    modal.appendChild(caption);
    document.body.appendChild(modal);

    const slides = document.querySelectorAll('.certificate_slide');
    
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            const imgInside = this.querySelector('img');
            const subtitle = this.querySelector('.slide_subtitle');
            
            if (imgInside) {
                modalImg.src = imgInside.src;
                caption.textContent = subtitle ? subtitle.textContent : '';
                
                modal.classList.add('open');
            }
        });
    });

    function closeModal() {
        modal.classList.remove('open');
        setTimeout(() => { modalImg.src = ''; }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});