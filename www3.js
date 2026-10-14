const http = require('http');
const dateTime = require('./src/datetimeET');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Tanel Leetmaa, veebiprogrammeerimine</title>\n</head>\n<body>\n';

const pageBody = '\t<h1>Tanel Leetmaa, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';

const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8"
    });

    res.write(pageHead);
    res.write(pageBody);

    res.write('\t<p>Nädalapäev: ' + dateTime.dayET() + '</p>\n');
    res.write('\t<p>Täna on ' + dateTime.dateET(0) + ', mis on rahvakalendri järgi ' + dateTime.folkMonthET() + '.</p>\n');
    res.write('\t<p>Lehe avamise kellaaeg: ' + dateTime.timeET() + '</p>\n');

    res.write(pageFoot);
    res.end();
}).listen(5327);
