

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
            const produtosString = JSON.stringify(culturaContagem);

            const numerosEncontrados = produtosString.match(/\d+/g);

            numeros = numerosEncontrados.map(Number);

            console.log(culturaContagem)

        });
    });

    return numeros;

}

export { contarChavesValores };