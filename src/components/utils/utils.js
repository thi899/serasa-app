

let culturaContagem = {};

let numeros = 0;

function contarChavesValores(lista, propriedade) {
    lista?.forEach(item => {

        const culturas = item?.[propriedade]?.split(',');

        culturas.forEach(cultura => {

            cultura = cultura.trim();

            if (culturaContagem[cultura]) {
                culturaContagem[cultura]++;
            } else {
                culturaContagem[cultura] = 1;
            }
        });
    });

    return convertendoParaArrayDeNumeros(culturaContagem);

}

function somarAreas(dados) {
    // Inicializamos as variáveis para somar as áreas
    let totalAreaAgricultavel = 0;
    let totalAreaVegetacao = 0;

    // Percorremos cada fazenda no array
    for (const fazenda of dados) {
        // Convertendo os valores de string para número antes de somar
        totalAreaAgricultavel += Number(fazenda.area_agricultavel_hectares);
        totalAreaVegetacao += Number(fazenda.area_vegetacao_hectares);
    }

    // Retornamos um objeto com os totais
    const totais = {
        totalAreaAgricultavel,
        totalAreaVegetacao
    };

    return convertendoParaArrayDeNumeros(totais);
}

function convertendoParaArrayDeNumeros(valor) {
    const produtosString = JSON.stringify(valor);

    const numerosEncontrados = produtosString.match(/\d+/g);

    numeros = numerosEncontrados.map(Number);

    return numeros;
}

export { contarChavesValores };
export { somarAreas };