document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuToggleBtn");
    const navbar = document.getElementById("main-navbar");

    // 1. Abrir/Fechar a navbar mobile no botão hamburger
    if (menuBtn) {
        menuBtn.addEventListener("click", function (event) {
            navbar.classList.toggle("expanded");
            event.stopPropagation();
        });
    }

    // 2. Controlar cliques nos links
    const navLinks = navbar.querySelectorAll(".nav-dropdown a");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const parentLi = link.closest(".has-submenu");
            const isParentLink = parentLi && link.parentElement === parentLi;
            
            // Detecta se estamos em tela Mobile/Touch
            const isTouchDevice = window.matchMedia("(max-width: 768px)").matches;

            // Se for link de submenu E estiver no celular/tablet:
            if (isParentLink && isTouchDevice) {
                event.preventDefault();   // Impede o link de navegar
                event.stopPropagation();  // Evita fechar o menu pai
                parentLi.classList.toggle("open"); // Abre/Fecha os subitens no toque
            } 
            // Se for um link de página normal (ex: "Contato" ou um subitem como "Kids"):
            else if (!isParentLink) {
                navbar.classList.remove("expanded"); // Fecha a barra no mobile
            }
        });
    });

    // 3. Fechar a navbar mobile ao clicar fora
    document.addEventListener("click", function (event) {
        if (navbar.classList.contains("expanded") && !navbar.contains(event.target)) {
            navbar.classList.remove("expanded");
        }
    });
});