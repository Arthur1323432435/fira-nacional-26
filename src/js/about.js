document.addEventListener('DOMContentLoaded', function () {
    /* ========================================================
       REVEAL BOTTOM (Elementos surgindo ao fazer scroll)
       ======================================================== */
    const reveals = document.querySelectorAll('.reveal-bottom');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: Se quiser que a animação aconteça apenas uma vez (não repita ao subir a tela), descomente a linha abaixo:
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.2
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    /* ========================================================
       SCROLLBAR DINÂMICA (Muda de cor ao descer)
       ======================================================== */
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        const scrollPercent = scrollTop / scrollHeight;

        const startColor = 220; 
        const colorRange = 60; 
        
        const currentHue = startColor + (scrollPercent * colorRange);

        document.documentElement.style.setProperty(
            '--scrollbar-dynamic-color', 
            `hsl(${currentHue}, 100%, 50%)`
        );
    }, { passive: true });
});