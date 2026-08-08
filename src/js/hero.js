// Funcionalidades para: hero.js
document.addEventListener('DOMContentLoaded', () => {
    const ticketBtn = document.getElementById('ticketBtn');
    const heroSection = document.getElementById('hero');

    // 1. Interação do Botão
    ticketBtn.addEventListener('click', () => {
        // Redirecione para a URL de compra mudando o código abaixo:
        // window.location.href = 'https://link-dos-ingressos.com';
        alert('Você será redirecionado para a página de ingressos!');
    });
    
    // ========================================================
    // ZOOM REVERSO NO SCROLL (Fundo da Hero Section)
    // ========================================================
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;

        // Só calcula o efeito enquanto a Hero estiver visível na tela (otimiza a performance)
        if (scrollY <= heroHeight) {
            // Transforma o scroll em porcentagem (de 0 a 1)
            const scrollPercent = scrollY / heroHeight;

            // Começa em 1.1 (estático) e vai crescendo até 1.35 conforme o usuário desce a página
            const newScale = 1.1 + (scrollPercent * 0.90);

            // Atualiza a variável CSS em tempo real
            heroSection.style.setProperty('--scroll-zoom', newScale);
        }
    }, { passive: true });
});

document.addEventListener("DOMContentLoaded", () => {
    /* ========================================================
       CARROSEL INFINITO DRAGGABLE (VERSÃO ULTRA-FLUIDA E ANTI-TRAVAMENTO)
       ======================================================== */
    const carousel = document.querySelector('.logos-container');

    if (carousel) {
        const originalHTML = carousel.innerHTML;

        const initCarousel = () => {
            // 1. Restaura e mede o tamanho de 1 bloco de logos original
            carousel.innerHTML = originalHTML;
            const singleSetWidth = carousel.scrollWidth;

            // 2. Multiplica as logos por 6 para criar uma pista gigante
            carousel.innerHTML = originalHTML.repeat(6);

            // 3. Centraliza o scroll no início do segundo bloco
            carousel.scrollLeft = singleSetWidth * 2;

            let isDown = false;
            let startX;
            let scrollLeft;
            let isDragging = false;
            let animationFrameId;

            // Variável virtual de posição (é ela que impede o travamento por arredondamento)
            let virtualScrollLeft = carousel.scrollLeft;

            // Ajuste a velocidade de rolagem aqui (0.8 = muito suave, 1.5 = mais rápido)
            const scrollSpeed = 0.8;

            // Função de correção de limites
            const resetBounds = () => {
                if (virtualScrollLeft >= singleSetWidth * 3) {
                    virtualScrollLeft -= singleSetWidth;
                } else if (virtualScrollLeft <= singleSetWidth) {
                    virtualScrollLeft += singleSetWidth;
                }
                carousel.scrollLeft = virtualScrollLeft;
            };

            // Função de rolagem contínua rodando a 60fps/120fps
            const autoScroll = () => {
                if (!isDragging) {
                    // Incrementamos a variável virtual (ela aceita decimais como 0.8 perfeitamente!)
                    virtualScrollLeft += scrollSpeed;
                    resetBounds();
                } else {
                    // Se o usuário estiver arrastando, sincronizamos a variável virtual com o arrasto físico
                    virtualScrollLeft = carousel.scrollLeft;
                }
                animationFrameId = requestAnimationFrame(autoScroll);
            };

            // Inicializa a rolagem contínua
            autoScroll();

            // --- Controles de Arrasto ---
            const startDrag = (e) => {
                isDown = true;
                isDragging = true;
                startX = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            };

            const stopDrag = () => {
                if (!isDown) return;
                isDown = false;
                setTimeout(() => {
                    isDragging = false;
                    // Sincroniza a posição virtual ao soltar o mouse
                    virtualScrollLeft = carousel.scrollLeft;
                }, 50);
            };

            const moveDrag = (e) => {
                if (!isDown) return;
                e.preventDefault();

                const x = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
                const walk = (x - startX) * 1.5; // Sensibilidade do mouse
                carousel.scrollLeft = scrollLeft - walk;

                virtualScrollLeft = carousel.scrollLeft;
                resetBounds();
            };

            // Eventos de Mouse (Desktop)
            carousel.addEventListener('mousedown', startDrag);
            carousel.addEventListener('mouseleave', stopDrag);
            carousel.addEventListener('mouseup', stopDrag);
            carousel.addEventListener('mousemove', moveDrag);

            // Eventos de Toque (Mobile)
            carousel.addEventListener('touchstart', startDrag, { passive: true });
            carousel.addEventListener('touchend', stopDrag);
            carousel.addEventListener('touchmove', moveDrag, { passive: false });
        };

        // Garante que as imagens já carregaram para que o tamanho medido não seja zero
        if (document.readyState === 'complete') {
            initCarousel();
        } else {
            window.addEventListener('load', initCarousel);
        }
    }
});