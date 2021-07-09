
export const { format: formatBR } = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export const formatPrice = (value) => {
    const newV = value?.toString()?.replace(',', '.')
    return formatBR(newV)
}

function formataValue(target) {
    var valor = target?.value;
    if (target.name === 'valor') {
        console.log('fdf')
        var v = target.value.replace(/\D/g, '');
        v = (v / 100).toFixed(2) + '';
        v = v.replace(".", ",");
        v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
        return formatPrice(v);
    }
    return valor
}
export function onChangeObject(event, set, state) {
    const { name, id, checked } = event.target;

    const value = event.target.value

    //Verifica o tipo de CAMPO
    switch (event.target.type) {
        case 'checkbox':
            set({ ...state, [name]: checked })
            break;
        //tipo default : texto, dropdown
        default:
            //não deve ser mudado porque é usado em alguns casos com o name e  em outros com o id
            switch ((name || id).split('.').length) {
                case 1:
                    set({ ...state, [name || id]: value })
                    break;
                case 2:
                    let subObject = (name || id).split('.')[0]
                    let subSubObject = (name || id).split('.')[1]
                    set({
                        ...state, [subObject]: { ...state[subObject], [subSubObject]: value }
                    })
                    break;
            }
    }
}