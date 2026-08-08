document.addEventListener("DOMContentLoaded", function () {
    // 1. SELECTORES DOS ELEMENTOS
    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const cartItemsList = document.getElementById("cartItemsList");
    const cartEmptyState = document.getElementById("cartEmptyState");
    const cartSubtotalEl = document.getElementById("cartSubtotal");
    const cartCountBadge = document.getElementById("cartCountBadge");

    // =========================================
    // 2. FUNÇÕES DE ABRIR E FECHAR
    // =========================================
    function openCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.add("open");
            cartOverlay.classList.add("open");
            document.body.style.overflow = "hidden"; // Bloqueia a rolagem do fundo
        }
    }

    function closeCart() {
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.remove("open");
            cartOverlay.classList.remove("open");
            document.body.style.overflow = ""; // Libera a rolagem da página
        }
    }

    // Escuta cliques globais para ABRIR o carrinho (qualquer elemento com .js-cart-btn)
    document.addEventListener("click", function (event) {
        const cartTrigger = event.target.closest(".js-cart-btn");
        if (cartTrigger) {
            event.preventDefault();
            openCart();
        }
    });

    // Eventos para FECHAR o carrinho
    if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
    if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

    // Fechar ao apertar a tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeCart();
    });

    // Fechar ao clicar no botão 'Explorar Produtos' do estado vazio
    document.addEventListener("click", function (event) {
        if (event.target.closest(".js-cart-close")) {
            closeCart();
        }
    });

    // =========================================
    // 3. LÓGICA DE INTERAÇÃO COM OS PRODUTOS
    // =========================================
    if (cartDrawer) {
        cartDrawer.addEventListener("click", function (event) {
            const target = event.target;

            // AUMENTAR QUANTIDADE (+)
            const plusBtn = target.closest(".qty-btn.plus");
            if (plusBtn) {
                const qtySpan = plusBtn.parentElement.querySelector(".qty-value");
                let currentQty = parseInt(qtySpan.textContent, 10) || 1;
                qtySpan.textContent = currentQty + 1;
                updateCartTotals();
                return;
            }

            // DIMINUIR QUANTIDADE (-)
            const minusBtn = target.closest(".qty-btn.minus");
            if (minusBtn) {
                const qtySpan = minusBtn.parentElement.querySelector(".qty-value");
                let currentQty = parseInt(qtySpan.textContent, 10) || 1;
                if (currentQty > 1) {
                    qtySpan.textContent = currentQty - 1;
                    updateCartTotals();
                }
                return;
            }

            // REMOVER ITEM DA SACOLA
            const removeBtn = target.closest(".btn-remove-item");
            if (removeBtn) {
                const cartItem = removeBtn.closest(".cart-item");
                if (cartItem) {
                    // Efeito suave de saída
                    cartItem.style.transition = "all 0.25s ease";
                    cartItem.style.opacity = "0";
                    cartItem.style.transform = "translateX(20px)";
                    
                    setTimeout(() => {
                        cartItem.remove();
                        updateCartTotals();
                    }, 250);
                }
            }
        });
    }

    // =========================================
    // 4. ATUALIZAÇÃO DOS TOTAIS E BADGES
    // =========================================
    function updateCartTotals() {
        if (!cartItemsList) return;

        const items = cartItemsList.querySelectorAll(".cart-item");
        let totalItemsCount = 0;
        let subtotalPrice = 0;

        items.forEach(function (item) {
            // Pega a quantidade
            const qtySpan = item.querySelector(".qty-value");
            const qty = parseInt(qtySpan ? qtySpan.textContent : 1, 10);
            totalItemsCount += qty;

            // Pega o preço (extrai apenas os números do texto ex: "R$ 180,00" -> 180.00)
            const priceEl = item.querySelector(".cart-item-price");
            if (priceEl) {
                const rawPrice = priceEl.textContent.replace(/[^\d,]/g, "").replace(",", ".");
                const priceValue = parseFloat(rawPrice) || 0;
                subtotalPrice += priceValue * qty;
            }
        });

        // Atualiza a badge do topo do carrinho
        if (cartCountBadge) {
            cartCountBadge.textContent = totalItemsCount;
        }

        // Atualiza o subtotal formatado em R$
        if (cartSubtotalEl) {
            cartSubtotalEl.textContent = subtotalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
        }

        // Alterna entre lista de itens ou estado de carrinho vazio
        if (items.length === 0) {
            if (cartEmptyState) cartEmptyState.style.display = "flex";
            if (cartItemsList) cartItemsList.style.display = "none";
        } else {
            if (cartEmptyState) cartEmptyState.style.display = "none";
            if (cartItemsList) cartItemsList.style.display = "flex";
        }
    }

    // Executa o cálculo inicial ao carregar a página
    updateCartTotals();
});