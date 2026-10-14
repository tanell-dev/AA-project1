const fs = require('fs');
const datetimeET = require('./src/datetimeET.js');

const textRef = 'txt/vanasonad.txt';

function showText(rawText) {
    // Teeme tekstist listi, kasutades eraldajana ';' märki
    let folkWisdom = rawText.split(';');

    // Loosin, kas väljastada üks juhuslik või kõik vanasõnad
    if (Math.round(Math.random()) == 0) {

        // Väljastan ühe juhusliku vanasõna
        let wisdomNum = Math.round(
            Math.random() * (folkWisdom.length - 1)
        );

        console.log('Täna on ' + datetimeET.dateET());
        console.log('Kell on ' + datetimeET.timeET());
        console.log('Tänane vanasõna: ' + folkWisdom[wisdomNum]);

    } else {

        // Väljastan kõik vanasõnad nummerdatult
        for (let i = 0; i < folkWisdom.length; i++) {

            if (folkWisdom[i].trim() != '') {
                console.log((i + 1) + '. ' + folkWisdom[i]);
            }
        }
    }
}

function readTextFile(fileRef) {
    fs.readFile(fileRef, 'utf8', (err, data) => {

        if (err) {
            console.log('Viga: ' + err);
        } else {
            showText(data);
        }

    });
}

readTextFile(textRef);
console.log('Hakkame vabasõnadega tutvuma.');