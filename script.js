/*
    Declaração das Variaveis para o traçamento de entrada dos dados
*/
const TemplateListaProdutos = document.getElementById("TemplateListaProdutos")
var ContadorDeItens = 0;

const Quantidade = document.getElementsByClassName("Quantidade");
const Descricao = document.getElementsByClassName("Descricao");
const ValorUNIT = document.getElementsByClassName("ValorUNIT");
const ValorFINAL = document.getElementsByClassName("ValorFINAL");
var Array_Quantidade = Array();
var Array_Descricao = Array();
var Array_ValorUNIT = Array();
var Array_ValorFINAL = Array();
//Função para adicionar cada item que existir
function Adicionar(){
    ContadorDeItens++;
    var Template = "";
    for(i = 0; i<ContadorDeItens; i++){
        Template+=`<input type="number" class="Box_QuantidadeTwo Quantidade" placeholder="0" oninput="Set()">
                   <input type="text" list="DescricaoProdutos" class="Box_DescricaoTwo Descricao" placeholder = "Produto">
                   <input type="number" class="Box_ValorUnitarioTwo ValorUNIT" placeholder="0" oninput="Set()">
                   <p class="Box_ValorTotal ValorFINAL"></p>`
    }
    TemplateListaProdutos.innerHTML = Template;
    Atualizacao_BancodeDados();
}

//Função que faz o Set em Arrays como Banco de Dados
function Set(){
    for(i=0;i<ContadorDeItens;i++){
        Array_Quantidade[i] = parseInt(Quantidade[i].value);
        Array_Descricao[i] = Descricao[i].value;
        Array_ValorUNIT[i] = parseInt(ValorUNIT[i].value);
        Array_ValorFINAL[i] = parseInt(Array_Quantidade[i] * Array_ValorUNIT[i]);
        if(Array_Quantidade[i] > 0 && Array_ValorUNIT[i] > 0){
            ValorFINAL[i].innerHTML = Array_ValorFINAL[i] + ",00";
        }
        else{
            ValorFINAL[i].innerHTML = "0,00"
            Array_ValorFINAL[i] = 0;
        }
    }
}

//Função que faz o desenvolvimento de Atualização dos termos do Banco de Dados
function Atualizacao_BancodeDados(){
    for(i=0; i < ContadorDeItens; i++){
        Quantidade[i].value = parseInt(Array_Quantidade[i]);
        Descricao[i].value = Array_Descricao[i];
        if(Descricao[i].value == "undefined"){
            Descricao[i].value = "";
        } 
        ValorUNIT[i].value = parseInt(Array_ValorUNIT[i]);
        if(Array_Quantidade[i] > 0 && Array_ValorUNIT[i] > 0){
            ValorFINAL[i].innerHTML = Array_ValorFINAL[i] + ",00";
        }
        else{
            ValorFINAL[i].innerHTML = "0,00";
            Array_ValorFINAL[i] = 0;
        }
    }
}

//Função setInterval que atualiza constantemente os valores somados dos itens da nota
var Auxiliar;
setInterval(()=>{
    var soma = 0;
    for(i=0; i< ContadorDeItens ; i++){
        soma+= Array_ValorFINAL[i];
    }
    document.getElementById("Box_Results").innerText = soma + ",00";
    Auxiliar = soma;
},10);


var ContadorDeClientes = 0;
var cont = 0;
const printar = document.getElementsByClassName("print");
const Notas = document.getElementsByClassName("Notas");
const Nome = document.getElementById("NomeDoCliente");
const Lugar = document.getElementById("LocalizacaoDoCliente");
const Data = document.getElementById("Data");

function Save(){
    if(ContadorDeClientes<9){
        document.getElementById("Contador").innerText = "0"+(ContadorDeClientes+1);    
    }
    else{
        document.getElementById("Contador").innerText = ContadorDeClientes+1;
    }
    if((ContadorDeClientes % 3 == 0)){
        printar[cont].style.display="flex";
        cont++;
    }
    Notas[ContadorDeClientes].style.display="flex";
    //Formatar valor da Data para impressão correta
    var ImpressaoData = Data.value.substring(8,10) + "/" + Data.value.substring(5,7) + "/" + Data.value.substring(0,4);
    var Texto = `<div class="Dados">
                    <h1>Comercial Lima</h1>
                    <span>Rua Dom Vital, 260 - Centro - CEP:57300-230 - Arapiraca - AL</span>
                    <h2>Telefone: (82)99919-7070</h2>
                    <strong>CNPJ: 19.097.170/0001-64 - INSC. EST. 242.94829-4</strong>
                </div>`;
    Texto+=`<div class="Informacoes">
                    <h2 class="h2">Cliente: ${Nome.value}</h2>
                    <h2 class="H2">${ImpressaoData}</h2>
                    <h2 class="h2">Localização: ${Lugar.value}</h2>
            </div>`;
    Texto+=`<div class="ImpressaoProdutos">
                <div class="Formatacao">
                    <p class="NotasOne">Quantidade</p>
                    <p class="NotasTwo">Descrição</p>
                    <p class="NotasOne">Valor Unitário</p>
                    <p class="NotasOne">Valor Total</p>
                </div>`
    for(i=0;i<ContadorDeItens;i++){
        if(parseInt(Array_Quantidade[i])>0){
            Texto+=`<div class="Formatacao">`;
            if(parseInt(Array_Quantidade[i]) >= 10){
                Texto+=`<p class="NotasOne">${Array_Quantidade[i]}</p>`;
            }
            else{
                Texto+=`<p class="NotasOne">${"0"+Array_Quantidade[i]}</p>`;
            }
            Texto+=`<p class="NotasTwo">${Array_Descricao[i]}</p>
                    <p class="NotasOne">${Array_ValorUNIT[i]+",00"}</p>`;


            if(Array_ValorFINAL[i]>=1000){
                var resto = Array_ValorFINAL[i] % 1000;
                var inteiro = (Array_ValorFINAL[i] - (resto))/1000;
                if(parseInt(resto) >=100){
                    Texto+=`<p class="NotasOne">${inteiro+"."+resto+",00"} </p>`;
                }
                else if(parseInt(resto) < 100 && parseInt(resto) >=10){
                    Texto+=`<p class="NotasOne">${inteiro+".0"+resto+",00"} </p>`;
                }
                else{
                    Texto+=`<p class="NotasOne">${inteiro+".00"+resto+",00"} </p>`;
                }
            }
            else{
                Texto+=`<p class="NotasOne">${Array_ValorFINAL[i]+",00"}</p>`;
            }
            Texto+=`</div>`;
        }
    }
    Texto+=`</div>`;
    //Autenticação dos resultados corretamente
    var imprimir ="";
    Auxiliar = parseInt(Auxiliar);
    if(Auxiliar>=1000){
        var resto = Auxiliar % 1000;
        var inteiro = (Auxiliar - (resto))/1000;
        if(parseInt(resto) >=100){
            imprimir = inteiro+"."+resto+",00";
        }
        else if(parseInt(resto) < 100 && parseInt(resto) >=10){
            imprimir = inteiro+".0"+resto+",00";
        }
        else{
            imprimir = inteiro+".00"+resto+",00";
        }
    }
    else{
        imprimir = Auxiliar+",00";
    }
    Texto+=`<div class="Footer">
                <h1 class="Result">Total:</h1>
                <h1 class="Result">${imprimir}</h1>
            </div>`;
    //Conceito de inscricao do html
    Notas[ContadorDeClientes].innerHTML = Texto;
    ContadorDeClientes++;

    //Area de reset do header;
    Nome.value ="";
    Lugar.value="";
    for(i=0;i<ContadorDeItens;i++){
        Array_Quantidade[i]="";
        Array_Descricao[i]="";
        Array_ValorUNIT[i]="";
        Array_ValorFINAL[i]="";
        TemplateListaProdutos.innerHTML ="";
    }
    Auxiliar=0;
    ContadorDeItens=0;
}



