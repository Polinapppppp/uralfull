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
    
    // 1. Создаем разметку модалки (один раз)
    const modalHTML = `
        <div class="universal-modal" id="universalModal">
            <div class="universal-modal__content">
                <button class="universal-modal__close" aria-label="Закрыть">&times;</button>
                <img src="" alt="">
                <div class="universal-modal__nav" style="display:none;">
                    <button class="prev-btn">&lsaquo;</button>
                    <button class="next-btn">&rsaquo;</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('universalModal');
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.universal-modal__close');
    const navContainer = modal.querySelector('.universal-modal__nav');
    const prevBtn = modal.querySelector('.prev-btn');
    const nextBtn = modal.querySelector('.next-btn');
    
    let currentSliderImages = []; 
    let currentIndex = 0;

    function openModal(src, imagesArray = null, index = 0) {
        modalImg.src = src;
        
        if (imagesArray && imagesArray.length > 1) {
            currentSliderImages = imagesArray;
            currentIndex = index;
            navContainer.style.display = 'flex';
        } else {
            currentSliderImages = [];
            navContainer.style.display = 'none';
        }
        
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { modalImg.src = ''; }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('universal-modal__content')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    function updateModalImage() {
        if (currentSliderImages.length > 0) {
            modalImg.src = currentSliderImages[currentIndex].src;
        }
    }

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentSliderImages.length) % currentSliderImages.length;
        updateModalImage();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentSliderImages.length;
        updateModalImage();
    });


    const planBtn = document.getElementById('btn');
    const planImgOriginal = document.getElementById('img');

    if (planBtn && planImgOriginal) {
        planBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(planImgOriginal.src); 
        });
    }


    const fsBtn = document.querySelector('.slider_block--fullscreen');
    
    if (fsBtn) {
        const newFsBtn = fsBtn.cloneNode(true);
        fsBtn.parentNode.replaceChild(newFsBtn, fsBtn);
        
        newFsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const wrapper = document.querySelector('.slider_block__wrapper');
            if (!wrapper) return;
            
            const activeImg = wrapper.querySelector('.swiper-slide-active img') || wrapper.querySelector('.swiper-slide img');
            
            if (activeImg) {
                openModal(activeImg.src);
            }
        });
    }
    
});