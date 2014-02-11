// Person.js
var Person = {
  attributes: {
    name: {
      type: 'STRING',
      maxLength: 100,
      required: true
    },
    emailAddress: {
      type: 'email', // Email type will get validated by the ORM
      required: false
    },
    nationality: 'STRING',
    arrivalDate: 'DATE',
    currentHolonId: 'STRING'
  }
};

module.exports = Person;


