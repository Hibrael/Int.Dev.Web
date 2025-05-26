    const carrinho = [];

    const productList = document.querySelectorAll(".product");
    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    // Adiciona eventos aos botões de "Adicionar"
    productList.forEach(product => {
      const addButton = product.querySelector(".add-btn");

      addButton.addEventListener("click", () => {
        const nome = product.getAttribute("data-name");
        const preco = parseFloat(product.getAttribute("data-price"));
        adicionarAoCarrinho(nome, preco);
      });
    });

    function adicionarAoCarrinho(nome, preco) {
      carrinho.push({ nome, preco });
      atualizarCarrinho();
    }

    function removerDoCarrinho(index) {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    }

    function atualizarCarrinho() {
      cartContainer.innerHTML = "";
      let total = 0;

      carrinho.forEach((item, index) => {
        total += item.preco;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
          <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
          <button class="remove-btn" data-index="${index}">Remover</button>
        `;

        cartContainer.appendChild(div);
      });

      totalElement.textContent = total.toFixed(2);

      // Adiciona eventos aos botões de "Remover"
      document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", () => {
          const index = parseInt(button.getAttribute("data-index"));
          removerDoCarrinho(index);
        });
      });
    }
 
