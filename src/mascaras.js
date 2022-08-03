import moment from "moment";


export const mascaraData = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

export function dateBrToUsa(value) {
    return moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
  }
  
  export function dateUsaToBr(value) {
    return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }


export const mascaraCPF = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

export const mascaraCEP = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

export const mascaraCel = ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
  

export function apenasNumeros(value) {
    return value.replace(/[^0-9]/gi, '')
  }
  
