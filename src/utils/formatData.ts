import Moment from 'moment'

export const formatDate = (format = 'DD-MM-YYYY') =>{
    return Moment().format(format)
}