const seperator = "/";
export const IsNumeric = (e) => {
    var isShift = false;
    if (e.keyCode == 16) {
        isShift = true;
    }
    //Allow only Numeric Keys.
    if (((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 8 || e.keyCode <= 37 || e.keyCode <= 39 || (e.keyCode >= 96 && e.keyCode <= 105)) && isShift == false) {
        if ((e.target.value.length == 4 || e.target.value.length == 7) && e.keyCode != 8) {
            e.target.value += seperator;
        }
        return true;
    }
    else {
        return false;
    }
};

export const ValidateDateFormat = (e) => {
    var isShift = false;
    var dateString = e.target.value;
    if (e.keyCode == 16) {
        isShift = false;
    }
    //Format YYYY/MM/dd
    var regex = /(((19|20)\d\d)\/(0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1]))$/;

    if (regex.test(dateString) || dateString.length == 0) {
        return true;
    } else {
        return false;
    }
};

export const validDateFormat = (dateValue, format) => {
    if(!format){
        return false;
    }
    //Format YYYY/MM/dd
    var regex = /(((19|20)\d\d)\/(0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1]))$/;
    switch (format) {
        case "dd/mm/yyyy":
            regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
            break;

        case "yyyy/mm/dd":
            regex = /(((19|20)\d\d)\/(0[1-9]|1[0-2])\/((0|1)[0-9]|2[0-9]|3[0-1]))$/;
            break;

        default:
            break;
    }    

    if (regex.test(dateValue) || dateValue.length == 0) {
        return true;
    } else {
        return false;
    }
};