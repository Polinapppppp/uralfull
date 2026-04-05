
function initProjectSlider() {
    const sliderContainers = document.querySelectorAll('.slider_block__wrapper');
    
    if (sliderContainers.length === 0) return;
    
    sliderContainers.forEach((container, index) => {
        const prevBtn = container.querySelector('.swiper-button-prev');
        const nextBtn = container.querySelector('.swiper-button-next');
        const counterCurrent = container.querySelector('.swiper_counter .current');
        const counterTotal = container.querySelector('.swiper_counter .total');
        const tabs = container.querySelectorAll('.slider_tabs__tab');
        
        if (!prevBtn || !nextBtn) return;
        
        const swiper = new Swiper(container, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 600,
            navigation: {
                nextEl: nextBtn,  
                prevEl: prevBtn,
            },
            on: {
                init: function () {
                    updateCounter(this, counterCurrent, counterTotal, container);
                },
                slideChange: function () {
                    updateCounter(this, counterCurrent, counterTotal, container);
                },
                resize: function () {
                    this.update();
                }
            },
        });
        
        function updateCounter(swiperInstance, currentEl, totalEl, sliderContainer) {
            if (!currentEl || !totalEl) return;
            
            const allSlides = sliderContainer.querySelectorAll('.swiper-slide');
            const duplicateSlides = sliderContainer.querySelectorAll('.swiper-slide-duplicate');
            const realTotal = allSlides.length - duplicateSlides.length;
            
            const total = realTotal > 0 ? realTotal : allSlides.length;
            let current = swiperInstance.realIndex + 1;
            
            if (current > total) current = current % total;
            if (current === 0) current = total;
            
            currentEl.textContent = current;
            totalEl.textContent = total;
        }
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
        
        
    });
}

document.addEventListener('DOMContentLoaded', initProjectSlider);