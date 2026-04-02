// Аккордеон для description
document.addEventListener('DOMContentLoaded', function() {
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
            // Удаляем старый обработчик, чтобы не дублировать
            descriptionBlock.removeEventListener('click', handleClick);
            // Добавляем новый
            descriptionBlock.addEventListener('click', handleClick);
        } else {
            console.log('Десктоп режим');
            descriptionBlock.removeEventListener('click', handleClick);
            descriptionBlock.classList.remove('active');
            descriptionBlock.style.cursor = 'default';
            descriptionBlock.style.border = 'none';
            
            // На десктопе показываем текст
            const subtitle = descriptionBlock.querySelector('.description-subtitle');
            if (subtitle) {
                subtitle.style.display = 'block';
            }
        }
    }
    
    // Запускаем при загрузке
    initDescription();
    
    // При изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initDescription, 250);
    });


    const sliderProject = document.querySelector('.slider_block.container.top_pad');
    const faqProject = document.querySelector('.text_block__v6.container.top_pad');
    
    console.log('Найден слайдер:', sliderProject);
    console.log('Найден FAQ:', faqProject);
    
    if (!sliderProject || !faqProject) return;
    
    function swapProjectBlocks() {
        const isMobileView = window.innerWidth <= 1300;
        const parentContainer = sliderProject.parentNode;
        
        console.log('Ширина экрана:', window.innerWidth);
        console.log('Мобильный режим (<=1300):', isMobileView);
        
        // Проверяем порядок: если слайдер идет первым, то перед FAQ
        const isSliderFirst = sliderProject.compareDocumentPosition(faqProject) === 4;
        console.log('Слайдер первый:', isSliderFirst);
        
        if (isMobileView) {
            // На экранах <=1300: FAQ должен быть ПЕРВЫМ (слайдер после FAQ)
            if (isSliderFirst) {
                console.log('Меняем: ставим FAQ первым');
                parentContainer.insertBefore(faqProject, sliderProject);
            } else {
                console.log('Порядок уже правильный (FAQ первый)');
            }
        } else {
            // На экранах >1300: слайдер должен быть ПЕРВЫМ
            if (!isSliderFirst) {
                console.log('Меняем: ставим слайдер первым');
                parentContainer.insertBefore(sliderProject, faqProject);
            } else {
                console.log('Порядок уже правильный (слайдер первый)');
            }
        }
    }
    
    // Запускаем при загрузке
    swapProjectBlocks();
    
    // При изменении размера окна
    let resizeTimerProject;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimerProject);
        resizeTimerProject = setTimeout(swapProjectBlocks, 250);
    });
});