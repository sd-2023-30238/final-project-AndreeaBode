
const minLengthValidator = (value, minLength) => {
    return value.length >= minLength;
};

const requiredValidator = value => {
    return value.trim() !== ''; 
};

const emailValidator = value => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

const phoneValidator = value =>{
    const re = /^([0-9]{10})/;
    return re.test(String(value))
};

const strongPassValidator = value =>{
    let aux=minLengthValidator(value,7);
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    return aux && re.test(String(value));
}

const numberValidator = value =>{
    const re = /^[0-9]*\.?[0-9]*$/;
    return value.match(re);
}

const validate = (value, rules) => {
    let isValid = true;

    for (let rule in rules) {

        switch (rule) {
            case 'minLength': isValid = isValid && minLengthValidator(value, rules[rule]);
                break;

            case 'isRequired': isValid = isValid && requiredValidator(value);
                break;

            case 'emailValidator': isValid = isValid && emailValidator(value);
                break;

            case 'phoneValidator': isValid = isValid && phoneValidator(value);
                break;

            case 'isStrong': isValid = isValid && strongPassValidator(value);
                break;

            case 'isNumber': isValid = isValid && numberValidator(value);
                break;
                
            default: isValid = true;
        }

    }

    return isValid;
};

export default validate;
