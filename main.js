const form = document.getElementById("form");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    //Objeto de itens
    const itemAtual = {"nome": nome.value,"quantidade": quantidade.value};
    
    const existe = itens.find(elemento => elemento.nome === nome.value);

    if(existe){
        itemAtual.id = existe.id;
        //Função que atualiza a interface da página
        atualizaElemento(itemAtual);
        //Atualiza o local storage modificando o array na posição do item a ser atualizado
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id+1 : 0;
        //Chamada da função para criar novos itens na lista
        criaElemento(itemAtual);
        //Armazenagem dos itens
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));
    //Limpando os campos do formulário
    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item){
    //Criando um elemento da Lista
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    //Criando um elemento Strong para exibit a quantidade
    const novoNumero = document.createElement('strong');
    novoNumero.dataset.id = item.id;
    novoNumero.innerHTML = item.quantidade;
    
    //Criando elemento completo da Lista
    novoItem.appendChild(novoNumero);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id))
    //Inserindo o elemento LI dentro da lista UL
    lista.appendChild(novoItem);
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const botao = document.createElement('button');
    botao.innerText = "X";

    botao.addEventListener('click', function(){
        deletaElemento(this.parentNode, id)
    })

    return botao
}

function deletaElemento(tag, id){
    tag.remove();

    //Removendo item do Array de elementos
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    //Atualizando o localStorage
    localStorage.setItem("itens", JSON.stringify(itens));
}