import moment from 'moment'
const obtenerFechaActual = () => {
    return moment().format("YYYY-MM-DDTHH:mm");
}

const obtenerFechaLimite = () => {
    return moment().format("YYYY-MM-DDT23:59")
}

export {
    obtenerFechaActual,
    obtenerFechaLimite,
}