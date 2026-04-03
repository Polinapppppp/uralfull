document.addEventListener('DOMContentLoaded', function () {
    const descriptionBlock = document.querySelector('.description');

    if (!descriptionBlock) {
        console.log('Блок description не найден');
        return;
    }

    function handleClick(e) {
        e.stopPropagation();
        console.log('Клик сработал, ширина экрана:', window.innerWidth);
        this.classList.toggle('active');
    }

    function initDescription() {
        const width = window.innerWidth;
        console.log('Инициализация, ширина:', width);

        if (width <= 1100) {
            console.log('Аккордеон активен');
            descriptionBlock.style.cursor = 'pointer';
            descriptionBlock.removeEventListener('click', handleClick);
            descriptionBlock.addEventListener('click', handleClick);
        } else {
            console.log('Десктоп режим');
            descriptionBlock.removeEventListener('click', handleClick);
            descriptionBlock.classList.remove('active');
            descriptionBlock.style.cursor = 'default';
            descriptionBlock.style.border = 'none';

            const subtitle = descriptionBlock.querySelector('.description-subtitle');
            if (subtitle) {
                subtitle.style.display = 'block';
            }
        }
    }

    initDescription();

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initDescription, 250);
    });


    const sliderProject = document.querySelector('.slider_block.container.top_pad');
    const leadSection = document.querySelector('.lead_section.card');

    console.log('Найден слайдер:', sliderProject);
    console.log('Найден lead:', leadSection);

    if (!sliderProject || !leadSection) return;

    function swapProjectBlocks() {
        const isMobileView = window.innerWidth <= 1300;
        const mainContainer = document.querySelector('#primary') || document.querySelector('main');

        const allSections = Array.from(mainContainer.children).filter(el =>
            el.classList.contains('section') ||
            el.classList.contains('lead_section') ||
            (el.children.length > 0 && (el.children[0].classList.contains('lead_section') || el.children[0].classList.contains('section')))
        );

        const sliderIndex = allSections.indexOf(sliderProject);
        const leadIndex = allSections.indexOf(leadSection.parentElement); // Используем parentElement для lead_section

        console.log('Все секции:', allSections);
        console.log('Индекс слайдера:', sliderIndex);
        console.log('Индекс lead:', leadIndex);

        if (isMobileView) {
            if (sliderIndex > leadIndex) {
                console.log('Меняем: ставим слайдер перед lead');
                mainContainer.insertBefore(sliderProject, leadSection.parentElement);
            } else {
                console.log('Порядок уже правильный (слайдер перед lead)');
            }
        } else {
            if (leadIndex > sliderIndex) {
                console.log('Меняем: ставим lead перед слайдером');
                mainContainer.insertBefore(leadSection.parentElement, sliderProject);
            } else {
                console.log('Порядок уже правильный (lead перед слайдером)');
            }
        }
    }

    swapProjectBlocks();

    let resizeTimerProject;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimerProject);
        resizeTimerProject = setTimeout(swapProjectBlocks, 250);
    });
});