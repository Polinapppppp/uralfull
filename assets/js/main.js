new Swiper('.certificate_slider', {
    slidesPerView: 1.3,
    slidesPerGroup: 1,
    spaceBetween: 16,
    loop: true,

    navigation: {
        nextEl: '.certificate_button-next',
        prevEl: '.certificate_button-prev',
    },

    breakpoints: {
        480: {
            slidesPerView: 1.3,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        }
    }
});


let buttons = document.querySelectorAll('.second_btn');

buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelectorAll('.accordion_head').forEach(head => {
    head.addEventListener('click', () => {
        const item = head.parentElement;
        const content = item.querySelector('.accordion_content');

        item.classList.toggle('active');
        content.style.maxHeight = item.classList.contains('active') ? content.scrollHeight + 'px' : '0';
    });
});

let faq = document.querySelector('.text_block__v6__faq');
if (faq) {
    faq.addEventListener('click', function (e) {
        let targetItem = e.target.closest('.faq_head');
        if (!targetItem) return;

        let faqItem = targetItem.closest('.faq_item');
        let currentText = faqItem.querySelector('.faq_content');

        if (!currentText) return;

        faqItem.classList.toggle('active');

        if (faqItem.classList.contains('active')) {
            currentText.style.maxHeight = currentText.scrollHeight + 'px';
        } else {
            currentText.style.maxHeight = '0';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
const modal = document.getElementById('myModal');
    if (!modal) {
        console.log('Модалка #myModal не найдена');
        return;
    }
    
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementById('closeModal');
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    let images = [];
    let currentIndex = 0;
    let isAnimating = false;
    let isGalleryMode = false; 
    
    function getImages() {
        images = [];
        const slides = document.querySelectorAll('.slider_block__wrapper .swiper-slide');
        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (img && img.src) {
                images.push(img.src);
            }
        });
        console.log('Найдено изображений:', images.length);
    }
    
    function changeImageWithTransition(newSrc, direction) {
        if (isAnimating) return;
        isAnimating = true;
        
        const slideOut = direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
        
        modalImg.style.transition = 'transform 0.3s ease-out';
        modalImg.style.transform = slideOut;
        
        setTimeout(() => {
            modalImg.src = newSrc;
            modalImg.style.transition = 'none';
            modalImg.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                isAnimating = false;
            }, 50);
        }, 300);
    }
    
    function openGalleryModal(index) {
        isGalleryMode = true;
        if (images.length === 0) getImages();
        if (images.length === 0) return;
        currentIndex = index;
        modalImg.style.transform = 'translateX(0)';
        modalImg.src = images[currentIndex];
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        isAnimating = false;
        
        if (prevBtn && nextBtn) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
    
    function openSingleModal(src) {
        isGalleryMode = false;
        modalImg.style.transform = 'translateX(0)';
        modalImg.src = src;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        if (prevBtn && nextBtn) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        isAnimating = false;
    }
    
    function nextSlide() {
        if (!isGalleryMode) return;
        if (images.length === 0 || isAnimating) return;
        currentIndex++;
        if (currentIndex >= images.length) currentIndex = 0;
        changeImageWithTransition(images[currentIndex], 'left');
        console.log('Слайд:', currentIndex + 1, 'из', images.length);
    }
    
    function prevSlide() {
        if (!isGalleryMode) return;
        if (images.length === 0 || isAnimating) return;
        currentIndex--;
        if (currentIndex < 0) currentIndex = images.length - 1;
        changeImageWithTransition(images[currentIndex], 'right');
        console.log('Слайд:', currentIndex + 1, 'из', images.length);
    }
    
    if (closeBtn) closeBtn.onclick = closeModal;
    if (prevBtn) prevBtn.onclick = prevSlide;
    if (nextBtn) nextBtn.onclick = nextSlide;
    
    modal.onclick = function(e) {
        if (e.target === modal) closeModal();
    };
    
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (isGalleryMode && e.key === 'ArrowLeft') prevSlide();
            if (isGalleryMode && e.key === 'ArrowRight') nextSlide();
        }
    });
    
    const fullscreenBtn = document.querySelector('.slider_block--fullscreen');
    if (fullscreenBtn) {
        fullscreenBtn.onclick = function(e) {
            e.preventDefault();
            getImages();
            
            const activeSlide = document.querySelector('.slider_block__wrapper .swiper-slide-active');
            let startIndex = 0;
            
            if (activeSlide) {
                const activeImg = activeSlide.querySelector('img');
                if (activeImg && activeImg.src) {
                    const foundIndex = images.findIndex(src => src === activeImg.src);
                    if (foundIndex !== -1) startIndex = foundIndex;
                }
            }
            
            openGalleryModal(startIndex);
        };
    }
    
    const planBtn = document.getElementById('btn');
    const planImg = document.getElementById('img');
    if (planBtn && planImg) {
        planBtn.onclick = function(e) {
            e.preventDefault();
            openSingleModal(planImg.src);
        };
    }

});

const consultBtns = document.querySelectorAll('.js-open-modal'); 
const consultModal = document.querySelector('.close-popup');
const consultClose = document.querySelector('.close-popup__form_clos');

if (consultModal) {
    consultBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            consultModal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    });

    if (consultClose) {
        consultClose.addEventListener('click', () => {
            consultModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    consultModal.addEventListener('click', (e) => {
        if (e.target === consultModal) {
            consultModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && consultModal.classList.contains('active')) {
            consultModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });




    const cookieModal = document.getElementById('cookieModal');
    const cookieClose = cookieModal?.querySelector('.cookie-modal__close');
    const cookieAcceptBtn = cookieModal?.querySelector('.js-cookie-accept');
    
    const isCookieAccepted = localStorage.getItem('cookieAccepted');
    
    if (!isCookieAccepted && cookieModal) {
        setTimeout(() => {
            cookieModal.classList.add('active');
        }, 1000);
    }
    
    function acceptCookies() {
        if (cookieModal) {
            cookieModal.classList.remove('active');
            localStorage.setItem('cookieAccepted', 'true');
        }
    }
    
    if (cookieAcceptBtn) {
        cookieAcceptBtn.addEventListener('click', acceptCookies);
    }
    
    if (cookieClose) {
        cookieClose.addEventListener('click', acceptCookies);
    }
}