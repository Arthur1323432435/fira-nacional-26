// 1. DADOS SIMULADOS

// Dados Estaduais (Depende da seleção)
const dataResultadosEstaduais = {
    maranhao: [
        { year: "2026", url: "#ma-2026" },
        { year: "2025", url: "#ma-2025" },
        { year: "2024", url: "#ma-2024" }
    ],
    rio: [
        { year: "2026", url: "#rj-2026" }
    ]
};

// Dados Nacionais (Lista única)
const dataResultadosNacionais = [
    { year: "2026", url: "#nac-2026" },
    { year: "2025", url: "#nac-2025" },
    { year: "2024", url: "#nac-2024" },
    { year: "2023", url: "#nac-2023" }
];

// Dados Mundiais (Lista única)
const dataResultadosMundiais = [
    { year: "2026", url: "#mun-2026" },
    { year: "2025", url: "#mun-2025" }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // --- FUNÇÃO GENÉRICA DE RENDERIZAÇÃO ---
    // Cria os botões recebendo a lista de dados e onde eles devem aparecer
    function renderYearsList(dataArray, targetGrid) {
        targetGrid.innerHTML = ""; // Limpa a grade

        if (!dataArray || dataArray.length === 0) {
            targetGrid.innerHTML = `<span style="color: #888; font-size: 13px;">Nenhum resultado disponível.</span>`;
            return;
        }

        dataArray.forEach((item) => {
            const btn = document.createElement("a");
            btn.href = item.url;
            btn.className = "year-btn";
            btn.textContent = item.year;
            btn.setAttribute("download", "");
            targetGrid.appendChild(btn);
        });
    }

    /* ==========================================
       LÓGICA DO CARD: ESTADUAIS
       ========================================== */
    const cardEstadual = document.getElementById("estaduaisCard");
    const btnEstadual = document.getElementById("btnToggleResults");
    const gridEstadual = document.getElementById("yearsGrid");
    
    // Dropdown
    const dropdown = document.getElementById("stateDropdown");
    const trigger = document.getElementById("dropdownTrigger");
    const selectedText = document.getElementById("selectedStateText");
    const items = document.querySelectorAll(".dropdown-item");
    let currentState = "maranhao"; 

    if (btnEstadual) {
        // Abrir card estadual
        btnEstadual.addEventListener("click", () => {
            cardEstadual.classList.add("expanded");
            renderYearsList(dataResultadosEstaduais[currentState], gridEstadual);
        });

        // Controles do Dropdown
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle("open");
            trigger.setAttribute("aria-expanded", isOpen);
        });

        items.forEach(item => {
            item.addEventListener("click", () => {
                items.forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                
                currentState = item.getAttribute("data-value");
                selectedText.textContent = item.textContent;
                dropdown.classList.remove("open");

                if (cardEstadual.classList.contains("expanded")) {
                    renderYearsList(dataResultadosEstaduais[currentState], gridEstadual);
                }
            });
        });

        document.addEventListener("click", () => {
            if(dropdown) dropdown.classList.remove("open");
            if(trigger) trigger.setAttribute("aria-expanded", "false");
        });
    }

    /* ==========================================
       LÓGICA DO CARD: NACIONAIS
       ========================================== */
    const cardNacional = document.getElementById("nacionaisCard");
    const btnNacional = document.getElementById("btnToggleNacionais");
    const gridNacional = document.getElementById("yearsGridNacionais");

    if (btnNacional) {
        btnNacional.addEventListener("click", () => {
            cardNacional.classList.add("expanded");
            renderYearsList(dataResultadosNacionais, gridNacional);
        });
    }

    /* ==========================================
       LÓGICA DO CARD: MUNDIAIS
       ========================================== */
    const cardMundial = document.getElementById("mundiaisCard");
    const btnMundial = document.getElementById("btnToggleMundiais");
    const gridMundial = document.getElementById("yearsGridMundiais");

    if (btnMundial) {
        btnMundial.addEventListener("click", () => {
            cardMundial.classList.add("expanded");
            renderYearsList(dataResultadosMundiais, gridMundial);
        });
    }

});