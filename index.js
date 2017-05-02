// Procedures used to validate ssn for different countries.
const moment = require('moment');
const algs = {
  nossn(birthNumber) {
    birthNumber = birthNumber.toString();

    if (!birthNumber || birthNumber.length !== 11) {
      return false;
    }

    const _sum = function(birthNumber, factors) {
      let sum = 0;
      for (let i = 0, l = factors.length; i < l; ++i) {
        sum += parseInt(birthNumber.charAt(i), 10) * factors[i];
      }
      return sum;
    };

    const checksum1 = 11 - (_sum(birthNumber, [3, 7, 6, 1, 8, 9, 4, 5, 2]) % 11);

    if (checksum1 === 11) {
      checksum1 = 0;
    }

    const checksum2 = 11 - (_sum(birthNumber, [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]) % 11);
    if (checksum2 === 11) {
      checksum2 = 0;
    }
    return checksum1 === parseInt(birthNumber.charAt(9), 10) && checksum2 === parseInt(birthNumber.charAt(10), 10);
  },
  dkssn(input) {
    if (!input) {
      return false;
    }

    if (input.indexOf('-') === -1) {
      if (input.length === 10) {
        input = input.slice(0, 6) + '-' + input.slice(6);
      } else {
        input = input.slice(0, 8) + '-' + input.slice(8);
      }
    }
    if (!input.match(/^(\d{2})(\d{2})(\d{2})\-(\d{4})|(\d{4})(\d{2})(\d{2})\-(\d{4})$/)) {
      return false;
    }

    // Clean input
    input = input.replace('-', '');
    if (input.length === 12) {
      input = input.substring(2);
    }

    // Declare variables
    return moment(input.substring(0,6), "DDMMYY").isValid();
  },
  sessn(ssn) {
  	
    if (/[^0-9-\s]+/.test(ssn)) {
      return false;
    }

    let nCheck, nDigit, bEven;
    nCheck = 0;
    nDigit = 0;
    bEven = false;

    ssn = ssn.replace(/\D/g, '');
    for (let n = ssn.length - 1; n >= 0; n--) {
      let cDigit;
      cDigit = ssn.charAt(n);
      nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return (nCheck % 10) == 0;
  }
};
const validateSSN = (ssn, country) =>{
  if(ssn !== void 0 && typeof ssn !== 'string'){
  	ssn = ssn.toString()
  }

  switch(country){
    case 'SE':
      return (algs.sessn(ssn) === true);
      break;
    case 'DK':
      return (algs.dkssn(ssn) === true);
      break;
    case 'NO':
      return (algs.nossn(ssn) === true);
      break;
  }
};


module.exports = {validateSSN};
