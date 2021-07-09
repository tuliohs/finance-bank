
export function onChangeObject(event, set, state) {
    const { name, id, checked } = event.target;

    //const value = formataValue(event.target)
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