// Funcionalidades para: faq.js
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha todos os outros itens ao abrir um novo
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Se o item clicado não estava ativo, abre ele
            if (!isActive) {
                item.classList.add('active');
                // Calcula dinamicamente a altura real do conteúdo para animar suavemente
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});