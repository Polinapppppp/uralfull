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

const fsBtn = document.getElementById('btn');
const imgElement = document.getElementById('img');
const imgContainer = document.querySelector('.plan_project-img');

if (fsBtn) {
    fsBtn.addEventListener('click', () => {
        if (imgContainer) {
            if (!document.fullscreenElement) {
                if (imgContainer.requestFullscreen) {
                    imgContainer.requestFullscreen();
                } else if (imgContainer.webkitRequestFullscreen) {
                    imgContainer.webkitRequestFullscreen();
                } else if (imgContainer.msRequestFullscreen) {
                    imgContainer.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }
    });
}

document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement) {
        imgContainer.style.background = '#000';
        imgContainer.style.display = 'flex';
        imgContainer.style.alignItems = 'center';
        imgContainer.style.justifyContent = 'center';
        if (imgElement) {
            imgElement.style.maxHeight = '90vh';
            imgElement.style.width = 'auto';
            imgElement.style.objectFit = 'contain';
        }
    } else {
        imgContainer.style.background = '';
        imgContainer.style.display = '';
        imgContainer.style.alignItems = '';
        imgContainer.style.justifyContent = '';
        if (imgElement) {
            imgElement.style.maxHeight = '';
            imgElement.style.width = '';
            imgElement.style.objectFit = '';
        }
    }

    
});