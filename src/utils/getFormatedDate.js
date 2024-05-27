import moment from "moment";

export const getFormatedDate = (date) => {
    return moment(date).format("Do MMM YY");  
}