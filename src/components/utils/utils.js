
let numbers = 0;

function countKeysAndValues(list, property, object) {
    list?.forEach(item => {

        const cultures = item?.[property]?.split(',');

        cultures.forEach(culture => {

            culture = culture.trim();

            if (object[culture]) {
                object[culture]++;
            } else {
                object[culture] = 1;
            }
        });
    });

    return convertToArrayNumbers(object);

}

function sumAreas(data) {
    let totalAreaArable = 0;
    let totalAreaVegetation = 0;

    for (const farm of data) {
        totalAreaArable += Number(farm.area_agricultavel_hectares);
        totalAreaVegetation += Number(farm.area_vegetacao_hectares);
    }

    const totais = {
        totalAreaArable,
        totalAreaVegetation
    };

    return convertToArrayNumbers(totais);
}

function convertToArrayNumbers(valor) {
    const produtosString = JSON.stringify(valor);

    const numerosEncontrados = produtosString.match(/\d+/g);

    numbers = numerosEncontrados.map(Number);

    return numbers;
}


export { countKeysAndValues };
export { sumAreas };