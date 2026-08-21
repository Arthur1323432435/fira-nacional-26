document.addEventListener("DOMContentLoaded", function () {
    const formEmail = document.getElementById("form-email");
    const formWhatsapp = document.getElementById("form-whatsapp");

    // Lógica para o formulário de Email
    if (formEmail) {
        formEmail.addEventListener("submit", function (e) {
            e.preventDefault(); 
            // Captura dos dados pode ser feita aqui
            alert("Solicitação de email enviada com sucesso!");
        });
    }

    // Lógica para o formulário de WhatsApp
    if (formWhatsapp) {
        formWhatsapp.addEventListener("submit", function (e) {
            e.preventDefault();
            // Aqui futuramente você pode montar o link da API do WhatsApp
            // Ex: window.open(`https://wa.me/SEUNUMERO?text=Olá...`)
            alert("Redirecionando para o WhatsApp...");
        });
    }
});