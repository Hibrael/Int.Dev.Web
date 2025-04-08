let a = document.querySelector("#btn");
a.addEventListener("click", mudarcor);

let impr = document.querySelector("#Enviar")
impr.addEventListener("click", imprima)

let sm = document.querySelector("#mais")
sm.addEventListener("click", somar)

let dm = document.querySelector("#menos")
dm.addEventListener("click", subtrair)

let alterarcor = document.querySelector("#send")
alterarcor.addEventListener("click", cor)

let formulario = document.querySelector("#enviar")
formulario.addEventListener("click", send)



function mudarcor(){
    let cor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
document.body.style.background= cor;

    let cor1 = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
document.getElementById("h1master").style.color = cor1
}

function imprima(){
    let text = document.querySelector("#textbox").value;
    let novo = document.createElement("p");
    novo.innerText = text;
    document.getElementById("resultado").appendChild(novo);
    // document.getElementById("resultado").innerText = text;
    
}

function somar(){
    let contador = document.querySelector("#contador");
    let contagem = parseFloat(contador.innerText);
    contagem += 1;
    contador.innerText = contagem
}

function subtrair(){
    let contador = document.querySelector("#contador");
    let contagem = parseFloat(contador.innerText);
    contagem -= 1;
    contador.innerText = contagem
}

function cor(){
    let corusuario = document.querySelector("#corusuario").value;
    document.body.style.backgroundColor = corusuario;
}

function send(){
    let name = document.querySelector("#namebox").value;
    document.getElementById("name").innerText = "Nome: " + name;

    let email = document.querySelector("#emailbox").value;
    document.getElementById("E-mail").innerText = "E-mail: " + email;

    let msg = document.querySelector("#msgbox").value;
    document.getElementById("mesage").innerText = "Mensagem: " + msg;

}