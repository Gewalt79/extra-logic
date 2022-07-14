'use strict';

let types = {
    form: {
        description: 'details of the form',
        props: {
            form_uid: 'uid',
            form_name:['string', 'required'],
            template: ['array', 'required']
        },
    }
}

module.exports = types;