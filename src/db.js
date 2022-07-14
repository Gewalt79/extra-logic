//form =
//{
//    form_name: "form_name",
//    template: [
//        {
//            type: "textarea",
//            name: "name",
//            about: "about",
//            value: "value"
//        }
//        , {
//            type: "input",
//            name: "name",
//            about: "about",
//            value: "value"
//        }
//    ]
//};

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = process.env.URI_LINK;
const baza = process.env.BAZA;
const collection = 'forms';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

client.connect(async function (err, client) {
    console.log('connected to database: ' + baza);
});

module.exports.createForm = function (form) {
    return new Promise((resolve, reject) => {
        client.connect(function (err) {
            if (err) {
                reject(err);
            }
            client.db(baza).collection('forms').insertOne(form, function (err, result) {
                if (err) {
                    reject(err);
                }
                client.close();
                resolve(result);
            });
        });
    });
};

module.exports.getForm = function (form_uid) {
    return new Promise((resolve, reject) => {
        client.connect(function (err) {
            if (err) {
                reject(err);
            }
            client.db(baza).collection(collection).findOne({ "_id": ObjectId(form_uid) }, function (err, result) {
                if (err) {
                    reject(err);
                }
                client.close();
                resolve(result);
            });
        });
    });
};