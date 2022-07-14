'use strict';

const db = require('./db');

let methods = {
    createForm: {
        description: 'creates a new form, and returns the details of the new form',
        params: ['form: the form object'],
        returns: ['form'],
        exec(formObj) {
            return new Promise((resolve) => {
                if (typeof (formObj) !== 'object') {
                    throw new Error('Expecting an object');
                }

                let _formObject = JSON.parse(JSON.stringify(formObj));
                _formObject.id = (Math.random() * 10000000) | 0;
                resolve(db.createForm(_formObject))
            })
        }
    },
    getForm: {
        description: 'Returns form by an form_uid',
        params: ['id: the id of the form were looking for'],
        returns: ['form'],
        exec(formObj) {
            return new Promise((resolve) => {
                if (typeof (formObj) !== 'object') {
                    throw new Error('Expecting an object');
                }
                resolve(db.getForm(formObj.params.id) || {})
            })
        }
    }
}

module.exports = methods;