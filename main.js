const formularioAtividade = document.getElementById("formulario-atividade");
let linhas = '';//inicialmente, como não teremos nenhuma linha na nossa tabela por não ter inserido nenhuma nota, ela começara vazia
const atividades = [];//declarando o array onde todos os nomes das atividades serão guardados nesse array;
const notas = [];//declarando o array onde todas as notas da tabela, serão guardadas nesse array;
const imgAprovado = `<img id="img_Aprovado" src="/images/aprovado.png" alt="Festejando">`;
const imgReprovado = `<img id="img_Reprovado" src="/images/reprovado.png" alt="Triste">`;
const spanAprovado = `<span class="resultado_aprovado">Aprovado!</span>`;
const spanReprovado = `<span class="resultado_reprovado">Reprovado!</span>`;

formularioAtividade.addEventListener('submit',function(evento){
    evento.preventDefault();

    adicionaLinhas();
    atualizaTabela();
    atualizaMediaFinal();

})

function adicionaLinhas(){
    const notaAtividade = document.getElementById('nota_atv');
    const nomeAtividade = document.getElementById('nome_atv');
    const valorNota = Number.parseFloat(notaAtividade.value);

    if(atividades.includes(nomeAtividade.value)){
        alert(`A atividade ${nomeAtividade.value} já foi inserida!`)
    } else{
        //vamos definir as variáveis que irão representar a criação da linha quando for acionado o botão
    var linha = '<tr>'; //podemos literalmente criar no proprio javascript código html passando a variável como string, isso nos informa que se eu utilizar essa váriavel no método innerHTML, será inserido no corpo html essa variável
    //linha = linha + 'outro conteudo'; -> representação mais fraca de atribuir a própria variável dentro da atribuição, dessa forma no código abaixo temos a representação mais simples disso 
        linha+= `<td>${nomeAtividade.value}</td>`;//adicionar a PRIMEIRA célula que é o <td>
        linha+=`<td>${valorNota}</td>`;//adicionar a SEGUNDA célula que é o <td>
        linha+=`<td>${valorNota>=7 ? imgAprovado : imgReprovado}</td>`;//adicionar a TERCEIRA célula que é o <td>
        linha+=`</tr>`;//fechar a tag da linha <tr>
        linhas+=linha;//a variável que antes era vazia, agora vai ficar sempre adicionando as células de nome, nota e imagem na linha referente
        atividades.push(nomeAtividade.value);
        notas.push(valorNota);
    }
    nomeAtividade.value='';
    notaAtividade.value='';
}

function atualizaTabela(){
    const tBody = document.getElementById('tabela');
    tBody.innerHTML = linhas;
}

function atualizaMediaFinal (){
    const mediaFinal = calcularMediaFinal();
    const valorMedia = document.getElementById('media-final-valor');
    const resultadoApOrRp = document.getElementById('media-final-resultado');
    console.log(mediaFinal);

    valorMedia.innerHTML=mediaFinal;
    resultadoApOrRp.innerHTML= mediaFinal>=7 ? spanAprovado : spanReprovado ;
}

function calcularMediaFinal(){
    var somaNotas = 0;
    for(let i = 0;i<notas.length;i++){//enquanto i for 
        somaNotas+= notas[i];
    }
    return somaNotas/notas.length;
}