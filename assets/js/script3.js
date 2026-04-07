document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.questions_tab');
    const contents = document.querySelectorAll('.question_content');

    function initDesktopMode() {
        tabs.forEach((tab, index) => {
            tab.removeEventListener('click', tab.clickHandler);
            
            tab.clickHandler = function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                contents.forEach(c => c.classList.remove('active'));
                if (contents[index]) {
                    contents[index].classList.add('active');
                    resetMobileStyles(contents[index]);
                }
            };
            tab.addEventListener('click', tab.clickHandler);
        });
    }

    function resetMobileStyles(content) {
        const texts = content.querySelectorAll('.questions_title_subtitle, .questions_text, .questions_block__right--bottom');
        texts.forEach(text => {
            text.style.maxHeight = '';
            text.style.opacity = '';
            text.style.transition = '';
        });
    }

    function initMobileMode() {
        contents.forEach(content => {
            content.classList.remove('active');
            resetMobileStyles(content);

            content.removeEventListener('click', content.clickHandler);

            content.clickHandler = function(e) {
                if (e.target.closest('svg')) return;

                const isActive = this.classList.contains('active');

                contents.forEach(c => {
                    if (c !== this && c.classList.contains('active')) {
                        c.classList.remove('active');
                        closeItem(c);
                    }
                });

                if (isActive) {
                    this.classList.remove('active');
                    closeItem(this);
                } else {
                    this.classList.add('active');
                    openItem(this);
                }
            };

            content.addEventListener('click', content.clickHandler);
        });

        if (contents[0]) {
            contents[0].classList.add('active');
            openItem(contents[0]);
        }
    }

    function closeItem(item) {
        const texts = item.querySelectorAll('.questions_title_subtitle, .questions_text, .questions_block__right--bottom');
        texts.forEach(text => {
            text.style.transition = 'max-height 0.4s ease-out, opacity 0.3s ease-out';
            text.style.maxHeight = '0px';
            text.style.opacity = '0';
        });
    }

    function openItem(item) {
        const texts = item.querySelectorAll('.questions_title_subtitle, .questions_text, .questions_block__right--bottom');

        texts.forEach(text => {
            text.style.transition = 'none'; 
            text.style.maxHeight = 'none';  
            text.style.opacity = '1';       
        });

        item.offsetHeight; 

        requestAnimationFrame(() => {
            texts.forEach(text => {
                const height = text.scrollHeight; 
                
                text.style.transition = 'max-height 0.4s ease-out, opacity 0.3s ease-out';
                text.style.maxHeight = height + 'px';
            });
        });
    }

    function checkMode() {
        const isMobile = window.innerWidth <= 1100;

        if (isMobile) {
            initMobileMode();
        } else {
            initDesktopMode();
            
            const activeTab = document.querySelector('.questions_tab.active');
            const activeIndex = activeTab ? Array.from(tabs).indexOf(activeTab) : 0;

            contents.forEach((c, i) => {
                resetMobileStyles(c); 
                if (i === activeIndex) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });
        }
    }

    checkMode();

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkMode, 250);
    });
});