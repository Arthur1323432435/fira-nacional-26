document.addEventListener("DOMContentLoaded", function () {
    const mainImg = document.getElementById("mainProductImg");
    const thumbBtns = document.querySelectorAll(".thumb-btn");

    thumbBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Remove a classe active de todos
            thumbBtns.forEach((b) => b.classList.remove("active"));
            
            // Adiciona active na miniatura clicada
            this.classList.add("active");

            // Atualiza a foto principal
            const newImgSrc = this.querySelector("img").src;
            if (mainImg && newImgSrc) {
                mainImg.style.opacity = "0.3";
                setTimeout(() => {
                    mainImg.src = newImgSrc;
                    mainImg.style.opacity = "1";
                }, 150);
            }
        });
    });
});