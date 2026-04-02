document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.questions_tab');
    const contents = document.querySelectorAll('.question_content');
    
    const style = document.createElement('style');
    style.textContent = `
        .question_content {
            transition: all 0.3s ease;
            overflow: hidden;
        }
        .question_content .questions_title_subtitle,
        .question_content .questions_text,
        .question_content .questions_block__right--bottom {
            transition: opacity 0.3s ease, transform 0.3s ease;
            opacity: 0;
            transform: translateY(-10px);
        }
        .question_content.active .questions_title_subtitle,
        .question_content.active .questions_text,
        .question_content.active .questions_block__right--bottom {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    function initDesktopMode() {
        tabs.forEach(tab => {
            tab.removeEventListener('click', tab.clickHandler);
            tab.clickHandler = function() {
                const index = Array.from(tabs).indexOf(this);
                
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                contents.forEach(c => {
                    c.classList.remove('active');
                });
                if (contents[index]) {
                    contents[index].classList.add('active');
                }
            };
            tab.addEventListener('click', tab.clickHandler);
        });
    }
    
    function initMobileMode() {
        contents.forEach(content => {
            content.removeEventListener('click', content.clickHandler);
            
            content.clickHandler = function(e) {
                if (e.target.closest('.questions_block__right--bottom svg')) {
                    e.stopPropagation();
                    console.log('Открыть консультацию');
                    return;
                }
                
                contents.forEach(c => {
                    if (c !== this) {
                        c.classList.remove('active');
                    }
                });
                
                this.classList.toggle('active');
            };
            
            content.addEventListener('click', content.clickHandler);
        });
    }
    
    function checkMode() {
        const isMobile = window.innerWidth <= 1000;
        
        if (isMobile) {
            initMobileMode();
            contents.forEach((c, i) => {
                if (i === 0) c.classList.add('active');
                else c.classList.remove('active');
            });
        } else {
            initDesktopMode();
            const activeTab = document.querySelector('.questions_tab.active');
            if (activeTab) {
                const index = Array.from(tabs).indexOf(activeTab);
                contents.forEach((c, i) => {
                    if (i === index) c.classList.add('active');
                    else c.classList.remove('active');
                });
            } else {
                tabs[0]?.classList.add('active');
                contents[0]?.classList.add('active');
            }
        }
    }
    
    checkMode();
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkMode, 250);
    });
});