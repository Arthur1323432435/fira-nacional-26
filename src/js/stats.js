// Funcionalidades para: stats.js
document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       1. SCROLL HIGHLIGHT TEXT (Texto da Missão)
       ======================================================== */
    const textContainer = document.querySelector('.text-faded');

    if (textContainer) {
        // Pega o texto original, separa por espaços e limpa a div
        const text = textContainer.innerText;
        textContainer.innerHTML = '';
        const words = text.split(/\s+/);

        // Recria o texto envelopando cada palavra em um <span>
        words.forEach(word => {
            const span = document.createElement('span');
            span.innerText = word + ' ';
            span.classList.add('word');
            textContainer.appendChild(span);
        });

        const wordSpans = document.querySelectorAll('.text-faded .word');

        // Função que acende as palavras com base no scroll
        const handleScroll = () => {
            const rect = textContainer.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Trigger no centro da tela (metade da altura)
            const triggerPoint = viewportHeight / 2;
            const scrollRange = 350; // Distância em pixels para completar a animação

            let progress = 0;
            const elementTop = rect.top;

            // Calcula o progresso (de 0 a 1)
            if (elementTop <= triggerPoint && elementTop >= (triggerPoint - scrollRange)) {
                progress = (triggerPoint - elementTop) / scrollRange;
            } else if (elementTop < (triggerPoint - scrollRange)) {
                progress = 1;
            }

            // Aplica a cor baseada no progresso
            wordSpans.forEach((span, index) => {
                const wordProgress = index / wordSpans.length;
                if (progress >= wordProgress) {
                    span.style.color = '#FFFFFF'; // Active color
                } else {
                    span.style.color = 'rgba(255, 255, 255, 0.2)'; // Inactive color
                }
            });
        };

        // Escuta o scroll
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Roda uma vez no carregamento
    }

    /* ========================================================
       2. NUMBER COUNTER (Grid de Estatísticas)
       ======================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    const animationDuration = 2000; // 2 segundos de animação

    // Função que faz a contagem gradativa
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerText = Math.floor(progress * (end - start) + start);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observador para iniciar animação só quando os números aparecerem na tela
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Inicia quando 50% do elemento estiver visível
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const targetValue = parseInt(targetElement.getAttribute('data-target'));

                // Inicia a animação de 0 até o valor do data-target
                animateValue(targetElement, 0, targetValue, animationDuration);

                // Desativa o observador para animar apenas uma vez
                observer.unobserve(targetElement);
            }
        });
    }, observerOptions);

    // Aplica o observador em todos os números
    statNumbers.forEach(num => {
        statsObserver.observe(num);
    });
});