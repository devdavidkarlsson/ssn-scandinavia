const coMocha = require('co-mocha')
const assert = require('chai').assert
const validators = require('../index.js')

const testCredentials = {
    no: {
        valid: {
            ssn: '01087000571',
            firstName: 'Testperson-no',
            lastName: 'Approved',
            street: 'Sæffleberggate 56',
            zip: '0563',
            city: 'Oslo',
            phoneNumber: '40123456',
            email: 'youremail@email.com',
        },
        invalid: {
            ssn: '01087000141',
            firstName: 'Testperson-no',
            lastName: 'Denied',
            street: 'Sæffleberggate 56',
            zip: '0563',
            city: 'Oslo',
            phoneNumber: '40123456',
            email: 'youremail@email.com',
        }
    },
    se: {
        valid: {
            ssn: '4103219202',
            firstName: 'Testperson-se',
            lastName: 'Approved',
            street: 'Stårgatan 1',
            zip: '12345',
            city: 'Ankeborg',
            phoneNumber: '0765260000',
            email: 'youremail@email.com',
        },
        invalid: {
            ssn: '4103219203',
            firstName: 'Testperson-se',
            lastName: 'Denied',
            street: 'Stårgatan 1',
            zip: '12345',
            city: 'Ankeborg',
            phoneNumber: '0765260000',
            email: 'youremail@email.com',
        }
    },

    dk: {
        valid: {
            ssn: '0102880064',
            firstName: 'Testperson-dk',
            lastName: 'Approved',
            street: 'Sæffleberggate 56,1 mf',
            zip: '6800',
            city: 'Varde',
            phoneNumber: '20123456',
            email: 'youremail@email.com',
        },
        invalid: {
            ssn: '3121373501',
            firstName: 'Testperson-dk',
            lastName: 'Denied',
            street: '	Sæffleberggate 56,1 mf',
            zip: '6800',
            city: 'Varde',
            phoneNumber: '20123456',
            email: 'youremail@email.com',
        }
    },
};


it('Nothing input to the validator', () => {
  const origin = validators.validateSSN();
  assert.equal(origin, undefined, "Nothing supplied, nothing should be returned");
});

it('SE input to the validator', () => {
  const origin = validators.validateSSN(testCredentials.se.valid.ssn, 'SE');
  assert.equal(origin, true, "SE number supplied SE should be returned. " + testCredentials.se.valid.ssn);
});
it('false SE input to the validator', () => {
  const origin = validators.validateSSN(testCredentials.se.invalid.ssn, 'SE');
  assert.equal(origin, false, "non valid SE number supplied null should be returned. " + testCredentials.se.invalid.ssn);
});

it('NO input to the validator', () => {
  const origin = validators.validateSSN(testCredentials.no.valid.ssn, 'NO');
  assert.equal(origin, true, "NO number supplied NO should be returned. " + testCredentials.no.valid.ssn);
});
it('false NO input to the validator', () => {
  const origin = validators.validateSSN(testCredentials.no.invalid.ssn, 'NO');
  assert.equal(origin, false, "non valid NO number supplied null should be returned. " + testCredentials.no.invalid.ssn);
});

it('DK input to the validator', () => {
  const origin = validators.validateSSN(testCredentials.dk.valid.ssn, 'DK');
  assert.equal(origin, true, "DK number supplied DK should be returned. " + testCredentials.dk.valid.ssn);
});
it('false DK input to the validator', () => {
  const origin = validators.validateSSN(testCredentials.dk.invalid.ssn, 'DK');
  assert.equal(origin, false, "non valid DK number supplied null should be returned. " + testCredentials.dk.invalid.ssn);
});
