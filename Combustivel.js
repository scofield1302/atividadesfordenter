//Inicia o programa dando boas vindas ao usuário e faz pergunta inicial, que é a distância entre a residência e o trabalho do usuário.
alert("Boas vindas ao sistema de cálculo de combustível. Espero que goste.");
let distancia_Percorrida = prompt("Qual a distância em km da sua residência até o seu trabalho?");

/*Recebe o valor da quilometragem e substitui espaços em branco por nada e vírgulas por ponto, para o caso de o usuário digitar 10,55, por exemplo,
o que não funcionaria numa operação matemática.*/
distancia_Percorrida = distancia_Percorrida.replace(" ","").replace(",",".");

/*Inicia um laço while que verifica se o valor digitado para a distância percorrida da residência ao trabalho é um valor em branco ou um valor não numérico. Caso positivo, pede ao usuário que digite o valor correto. E fica nisso até que um
valor numérico seja digitado, e substitui espaços em branco por nada e vírgulas por ponto.*/
while (!distancia_Percorrida || isNaN(distancia_Percorrida) || distancia_Percorrida <= 0){
    distancia_Percorrida = prompt("Você digitou um valor em branco ou um valor não numérico. Por favor informe a distância em km (apenas números) da sua residência ao seu trabalho. (Ex.: 20.88)");
    distancia_Percorrida = distancia_Percorrida.replace(" ","").replace(",",".");

}
//Faz as mesmas verificações na variável do consumo médio.
let consumo_Medio = prompt("Qual o consumo médio do seu veículo em km/L");
consumo_Medio = consumo_Medio.replace(" ","").replace(",",".");
while (!consumo_Medio || isNaN(consumo_Medio) || consumo_Medio <=0){
    consumo_Medio = prompt("Você digitou um valor em branco ou um valor não numérico. Por favor, informe quantos km em média o seu veículo consome com um litro de combustível. (Ex.: 12.50).");
    consumo_Medio = consumo_Medio.replace(" ","").replace(",",".");
}

//Transforma as variáveis distância e consumo médio em valor decimal
const distancia_Percorrida_km = Number(distancia_Percorrida); consumo_Medio_gasolina = Number(consumo_Medio);

//Faz o cálculo do consumo médio, depois arredonda o valor para 2 casas decimais
let  consumo_Necessario_Litros = distancia_Percorrida_km/consumo_Medio_gasolina;
consumo_Necessario_Litros = consumo_Necessario_Litros.toFixed(2);


//Pergunta ao usuário em quantos postos ele pesquisou o preço do combustível e faz as tratativas de erro
quantidade_Postos = prompt("Em quantos postos você pesquisou o preço do abastecimento?");
quantidade_Postos = quantidade_Postos.replace(" ","").replace(",","");
while (!quantidade_Postos || isNaN(quantidade_Postos) || quantidade_Postos <=0 || quantidade_Postos%1 !=0) {
    quantidade_Postos = prompt("Você informou um valor inválido. Digite um valor inteiro com relação a quantos postos você pesquisou o preço do abastecimento. (Ex.:4)");
    quantidade_Postos = quantidade_Postos.replace(" ","").replace(",",".");

}

/*Transformo o valor da quantidade de postos em um valor inteiro, para facilitar os cálculos futuros e
definir a boa prática, já que a quantidade de postos sempre será um número inteiro*/
quantidade_Postos = parseInt(quantidade_Postos);

// Define algumas variáveis que serão preenchidas no laço for
let menor_valor = Infinity; posto_Maisbarato = ""; soma_Valores = 0;

for (let i=0 ; i < quantidade_Postos;i++){
    //Pergunta ao usuário o valor pago pela gasolina no posto atual da iteração do laço for e trata os possíveis erros
    valor_atual = prompt(`Qual foi o valor pesquisado no ${i+1}º posto?`);
    valor_atual = valor_atual.replace(" ","").replace(",",".");
    while (!valor_atual || isNaN(valor_atual) || valor_atual <=0){
        valor_atual = prompt(`Você digitou um valor inválido. Por favor, informe o valor que o ${i+1}º posto cobra por litro de combustível.`);
        valor_atual = valor_atual.replace(" ","").replace(",",".");
        }
        /*Como eu defini que o manor valor já inicia em 0, verifica que a iteração atual está encontrando 0 nessa variável. Se sim, 
        quer dizer que é a primeira iteração do laço for, então qualquer valor que o usuário informar de preço de combustível
        será o primeiro, porque qualquer valor digitado será maior que zero.*/
        if (i == 0){
            menor_valor = valor_atual;
            posto_Maisbarato = i+1;
        }
        //Se o valor em menor_valor não for zero, quer dizer que já tem alguma coisa lá, então faz 
        else {
            /*Ainda na condicional se o valor não for zero, ou seja, não for o primeiro valor, verifica também se
            esse valor é menor que o menor valor já registrado na variável. Se sim, atualiza a variável menor_valor
            com esse valor atual, e registra na variável posto_Maisbarato*/
            if (valor_atual < menor_valor){
                menor_valor = valor_atual;
                posto_Maisbarato = i+1;
            }
        }

/*Ao final do laço for, adiciono o valor do combustível atual à variável soma_Valores para, ao final de tudo, poder
fazer a média dos valores nos postos (Soma total/quantidade de postos).*/
soma_Valores = Number(soma_Valores) + Number(valor_atual);

}

/*Armazeno em uma variável o resultado da multiplicação do menor valor encontrado pelo consumo em litros
//necessário para o deslocamente da residência ao trabalho (apenas de ida)*/
valor_TotalCombustivel = menor_valor * consumo_Necessario_Litros;

//Recebo esse valor e transformo-o em um valor com duas casas decimais
valor_TotalCombustivel = Number(valor_TotalCombustivel).toFixed(2);
/*Registro em uma variável a média dos valores cobrados nos postos, já com duas casas decimais
Como as variáveis soma_Valores e quantidade_postos já estão tratadas para serem valores numéricos,
A variável não apresentará erros. E já transformo o valor em duas casas decimais também.*/

media_Valores = (soma_Valores/quantidade_Postos).toFixed(2);


const consumo_Estimado_msg = `Para percorrer ${distancia_Percorrida} km, serão necessários ${consumo_Necessario_Litros} litros de combustível.`;
const valor_MaisBarato_msg = `O posto mais barato foi o posto ${posto_Maisbarato}, onde a gasolina custava R$${menor_valor}.`;
const media_Valores_msg = `A Média dos valores pesquisados é R$${media_Valores}.`;
const gasto_Diario_msg = `O gasto diário (ida e volta) é de R$${valor_TotalCombustivel*2}.`;
document.getElementById("consumo_Estimado_msg").innerText = consumo_Estimado_msg;
document.getElementById("valor_MaisBarato_msg").innerText = valor_MaisBarato_msg;
document.getElementById("media_Valores_msg").innerText = media_Valores_msg;
document.getElementById("gasto_Diario_msg").innerText = gasto_Diario_msg;
