
/*Inicia a página definindo o foco no 1º input, que é a pergunta da distância entre a residência e
o trabalho*/

document.getElementById("distance_hometojob").focus();

/*Oculta os grupos (divs) do consumo médio e quantidade de postos pesquisados, pois serão exibidos
apenas quando um valor válido de distância entre residência vs trabalho for preenchido. */
document.getElementById("document-avg_consumption").style.display = "none";
document.getElementById("document-count_Stations").style.display = "none";
document.getElementById("bttn_verify_inputs_container").style.display = "none";
document.getElementById("result_group").style.display = "none";
//apenas para visualização no console do tamanho da tela do dispositivo atual.
console.log(window.innerWidth+" px");

/*função pegar distância, que será chamada no HTML quando o botão avançar (disponível no primeiro grupo)
for clicado*/
function pegarDistancia() {
    let distancia_Percorrida = document.getElementById("distance_hometojob").value.trim().replace(",", ".");

    // Verifica se foi digitado algo válido
    if (!distancia_Percorrida || isNaN(distancia_Percorrida) || Number(distancia_Percorrida) <= 0) {
        alert("Você digitou um valor inválido. Por favor, informe a distância em km (ex.: 20.88).");
        document.getElementById("distance_hometojob").value = "";
        document.getElementById("distance_hometojob").focus();
        return null;
    }

    document.getElementById("document-avg_consumption").style.display = "block";
    document.getElementById("avg_consumption").focus();
    document.getElementById("distance_hometojob").disabled = true;
    
    return parseFloat(distancia_Percorrida);
}

/*função de verificar o consumo médio do veículo, que será chamada no HTML quando o botão avançar 
(disponível no segundo grupo) for clicado*/

function verifyConsumption() {
    let consumo_Medio = document.getElementById("avg_consumption").value.trim().replace(",", ".");

    if (!consumo_Medio || isNaN(consumo_Medio) || Number(consumo_Medio) <= 0) {
        alert("Valor inválido. Informe o consumo médio do veículo (ex.: 12,50 km/l).");
        document.getElementById("avg_consumption").value = "";
        document.getElementById("avg_consumption").focus();
        return null;

    } else {
        document.getElementById("document-count_Stations").style.display = "block";
    }


    let distancia_Percorrida_km = pegarDistancia();
    let consumo_Medio_gasolina = Number(consumo_Medio);

    if (distancia_Percorrida_km !== null) {
        let consumo_Necessario_Litros = (distancia_Percorrida_km / consumo_Medio_gasolina).toFixed(2);
        console.log(`Consumo necessário: ${consumo_Necessario_Litros} litros para o consumo de ${consumo_Medio_gasolina}L.`);
        document.getElementById("avg_consumption").disabled = true;
        document.getElementById("count_Stations").focus();

        return {
            consumo_Medio_gasolina,
            consumo_Necessario_Litros,
            distancia_Percorrida_km
        };
    }
    
    document.getElementById("count_Stations").focus();
    return null;
    
}

/*função de verificar a quantidade de postos pesquisados preenchida, que será usada para exibir um número
x de inputs de preços dos postos, com base na quantidade que o usuário informar*/


function verifyCountStations() {

    let count_Stations = document.getElementById("count_Stations").value;

    if (!count_Stations || count_Stations <=0 || count_Stations%1 != 0){
        alert("Você informou uma quantidade inválida. Por favor, informe um número inteiro e positivo com relação à quantidade de postos pesquisados.")
        document.getElementById("count_Stations").value = null;
        document.getElementById("count_Stations").focus();

    } else {
    //Oculta os três primeiros grupos, para melhor exibição
    document.getElementById("document-distance_hometojob").style.display = "none";
    document.getElementById("document-avg_consumption").style.display = "none";
    document.getElementById("document-count_Stations").style.display = "none";


    //Mostra a quantidade X de inputs de preços dos postos pesquisados.
    const qtd_postos = document.getElementById("count_Stations").value;
    const container = document.getElementById("inputsContainer");

    container.innerHTML = "";

    for (let i= 0; i < qtd_postos; i++){

        const input = document.createElement("input");
        input.min = 1;
        input.type = "number";
        input.placeholder = `Valor pesquisado no ${i+1}º posto.`;
        input.id = `input${i+1}`;
        input.style.width = "210px";
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
        input.style.marginBottom = "10px"; // Adiciona espaço abaixo do input
      
        }
    
    document.getElementById("input1").focus();
    document.getElementById("bttn_verify_inputs_container").style.display = "flex";

}
}




function verifyInputsContainer() {
    let inputs = document.querySelectorAll("#inputsContainer input");
    let qtd_inputs = inputs.length;
    let inputs_validos = 0;
    let sum_values = 0;
    var cheaper_station = "";
    var cheaper_value = Infinity;

    // Verificar a validade dos inputs
    for (let i = 0; i < qtd_inputs; i++) {
        let input_atual = document.getElementById(`input${i+1}`).value.trim(); // Remove espaços extras
        let valor = Number(input_atual);

        if (!isNaN(valor) && valor > 0) {
            inputs_validos += 1;
            sum_values += valor;

            if (valor < cheaper_value) {
                cheaper_value = valor;
                cheaper_station = `${i + 1}º`;
            }
        }
    }

    // Garantir que todos os inputs são válidos antes de continuar
    if (inputs_validos === qtd_inputs && qtd_inputs > 0) {
        let resultado = verifyConsumption();
        let avg_price = sum_values / qtd_inputs;

        document.getElementById("result_group").style.display = "block";
        document.getElementById("bttn_verify_inputs_container").style.display = "none";
        document.getElementById("document-avg_consumption").style.display = "none";
        document.getElementById("document-count_Stations").style.display = "none";
        document.getElementById("inputsContainer").style.display = "none";


        document.getElementById("qtd_postos").innerText = document.getElementById("count_Stations").value;
        document.getElementById("avg_price_html").innerText = avg_price.toFixed(2);
        document.getElementById("distance").innerText = document.getElementById("distance_hometojob").value;
   
    } else {
        alert("Um ou mais inputs não estão válidos.");
    }
    
}



