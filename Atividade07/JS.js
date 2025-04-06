let a = document.querySelector("#btn");
a.addEventListener("click", mudarcor);

let impr = document.querySelector("#Enviar")
impr.addEventListener("click", imprima)


function mudarcor(){
    let cor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
document.body.style.background= cor;
}

function imprima(){
    let text = document.querySelector("#textbox").value;
    document.getElementById("resultado").innerText = text;
    
}
