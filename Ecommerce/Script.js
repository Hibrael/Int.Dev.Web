document.addEventListener("DOMContentLoaded", function () {
  const carrinho = [];
  let cartCount = 0;

  const productList = document.querySelectorAll(".product");
  const cartItemsElement = document.getElementById("cart-items");
  const cartContainer = document.getElementById("cart-container");
  const totalElement = document.getElementById("cart-total");
  const cartCountElement = document.querySelector(".cart-count");
  const cartIcon = document.querySelector(".cart-icon");
  const closeCartButton = document.getElementById("close-cart");

  // Mostrar/ocultar carrinho
  cartIcon.addEventListener('click', () => {
    cartContainer.classList.toggle('hidden');
  });
  closeCartButton.addEventListener("click", () => {
  cartContainer.classList.add("hidden");
});

  productList.forEach(product => {
    const imagem = product.querySelector("img");

    imagem.addEventListener("click", () => {
      const nome = product.querySelector(".product-name").textContent.trim();
      const precoTexto = product.querySelector(".product-price").textContent.trim();
      const preco = parseFloat(precoTexto.replace(/\./g, '').replace(',', '.'));

      if (!isNaN(preco)) {
        adicionarAoCarrinho(nome, preco);
      } else {
        console.error("Erro ao converter preço:", precoTexto);
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

    carrinho.forEach((item, index) => {
      total += item.preco;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
        <span class="remove-item" data-index="${index}">&times</span>
      `;

      cartItemsElement.appendChild(div);
    });

    // Corrigido: usar o elemento certo
    const totalElementDisplay = document.getElementById("cart-total");
    totalElementDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;

    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", () => {
        const index = parseInt(button.getAttribute("data-index"));
        removerDoCarrinho(index);
      });
    });
  }
});
