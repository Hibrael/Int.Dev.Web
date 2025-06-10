document.addEventListener("DOMContentLoaded", function () {
  const carrinho         = [];
  let cartCount          = 0;
  const productList      = document.querySelectorAll(".product");
  const cartItemsElement = document.getElementById("cart-items");
  const cartContainer    = document.getElementById("cart-container");
  const totalElement     = document.getElementById("cart-total");
  const cartCountElement = document.querySelector(".cart-count");
  const cartIcon         = document.querySelector(".cart-icon");
  const closeCartButton  = document.getElementById("close-cart");
  const finalizarcopra   = document.getElementById("finalizar");
  const emailBox         = document.getElementById("emailBox");
  const enviaremail      = document.getElementById("enviaremail");
  const emailinput       = document.getElementById("emailinput");
  const modalOverlay = document.getElementById("modalOverlay");
  const closebox  = document.getElementById("closebox");


  // Mostrar/ocultar carrinho
  cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("hidden");
  });
  closeCartButton.addEventListener("click", () => {
    cartContainer.classList.add("hidden");
  });

  

  // Finalizar compra: só exibe o box de e-mail (botão continua lá)
  finalizarcopra.addEventListener("click", () => {
    if (cartCount === 0) {
    alert("Seu carrinho está vazio. Adicione pelo menos um item antes de finalizar a compra.");
    return;
  }
    emailBox.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
    emailBox.style.display = "block";
    emailinput.focus();
  });
  
  closebox.addEventListener("click", () => {
    emailBox.classList.add("hidden");
    modalOverlay.classList.add("hidden");
  });

  // Enviar e-mail, alert e limpar carrinho
  enviaremail.addEventListener("click", () => {
    const email = emailinput.value.trim();
    emailBox.classList.add("hidden");
    modalOverlay.classList.add("hidden");
    if (!validateEmail(email)) {
      alert("Por favor, preencha um e-mail válido.");
      emailinput.focus();
      return;
    }
    // 1) popup de confirmação
    alert(`As informações para pagamento foram enviadas para: ${email}`);
    // 2) limpa carrinho
    carrinho.length = 0;
    cartCount = 0;
    cartCountElement.textContent = cartCount;
    atualizarCarrinho();
    // 3) esconde box de e-mail e limpa campo
    emailBox.style.display = "none";
    emailinput.value = "";
  });

  // Permite submeter com Enter
  emailinput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      enviaremail.click();
    }
  });

  function validateEmail(email) {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  }

  // === Funções do carrinho ===
  productList.forEach((product) => {
    const img = product.querySelector("img");
    img.addEventListener("click", () => {
      const nome       = product.querySelector(".product-name").textContent.trim();
      const precoText  = product.querySelector(".product-price").textContent.trim();
      const preco      = parseFloat(precoText.replace(/\./g, "").replace(",", "."));
      if (!isNaN(preco)) {
        adicionarAoCarrinho(nome, preco);
      } else {
        console.error("Erro ao converter preço:", precoText);
      }
    });
  });

  function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    cartCount++;
    cartCountElement.textContent = cartCount;
    atualizarCarrinho();
  }

  function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    cartCount--;
    cartCountElement.textContent = cartCount;
    atualizarCarrinho();
  }

  function atualizarCarrinho() {
    cartItemsElement.innerHTML = "";
    let total = 0;
    carrinho.forEach((item, idx) => {
      total += item.preco;
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
        <span class="remove-item" data-index="${idx}">&times;</span>
      `;
      cartItemsElement.appendChild(div);
    });
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", () => {
        removerDoCarrinho(parseInt(btn.dataset.index));
      });
    });
  }
});
