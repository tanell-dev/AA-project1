const http = require('http');
//moodul URL päringu parsimiseks
const url = require('url');
//moodul failitee haldamiseks
const path = require('path');
//const fs = require('fs');
const fs = require('fs').promises;
const dateET = require('./src/dateTimeET');
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Tanel Leetmaa, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '\t<img src="veebiprogrammeerimine_2026_AA.png" alt="banner">\n';
const pageBody = '\t<h1>Tanel Leetmaa, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>\n';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	console.log(req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	const fileExt = path.extname(currentURL.pathname);
	
	if(currentURL.pathname === '/'){
		res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\t<p>Täna on ' + dateET.dayET() + ', ' + dateET.dateET(0) + ', mis on rahvakalendri järgi ' + dateET.folkMonthET() + ', kell oli lehe avamise hetkel: ' + dateET.timeET() + '.</p>\n');
		res.write('\t<p><img src="avaleht.jpg" alt="Avalehe foto" width="480"></p>\n');
		res.write('\t<ul>\n');
		res.write('\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>\n');
		res.write('\t\t<li><a href="/minust">Miks tulin TLÜ-sse</a></li>\n');
		res.write('\t</ul>\n');
		res.write(pageFoot);
		return res.end();
	}
	else if(currentURL.pathname === '/vanasona'){
		res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write('\t<h1>Tänase päeva vanasõna</h1>\n\t<p>Siin näed tänseks loositud Eesti vanasõna.</p>\n\t<hr>\n');
		try {
			const rawText = await fs.readFile(path.join(__dirname, 'txt', 'vanasonad.txt'), 'utf8');
			let folkWisdom = rawText.split(';');
			let usableWisdom = [];
			for (let i = 0; i < folkWisdom.length; i++) {
				if (folkWisdom[i].trim() != '') {
					usableWisdom.push(folkWisdom[i].trim());
				}
			}
			let wisdomNum = Math.round(Math.random() * (usableWisdom.length - 1));
			res.write('\t<p>' + usableWisdom[wisdomNum] + '</p>\n');
		} catch (err) {
			console.log(err);
			res.write('\t<p>Vanasõna faili ei õnnestunud lugeda.</p>\n');
		}
		res.write('\t<p><a href="/">Avaleht</a></p>\n');
		res.write(pageFoot);
		return res.end();
	}
	else if(currentURL.pathname === '/minust'){
		res.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write('\t<h1>Miks tulin TLÜ-sse õppima</h1>\n\t<hr>\n');
		res.write('\t<p>Tulin Tallinna Ülikooli, et õppida informaatikat ja veebiprogrammeerimist praktiliselt: HTML, CSS, JavaScript ja Node.js.</p>\n');
		res.write('\t<p>TLÜ-s saan need oskused kohe päris veebiserveris proovile panna ja arendada neid edasi oma töös.</p>\n');
		res.write('\t<p><img src="juhis.jpg" alt="Foto uuel lehel" width="480"></p>\n');
		res.write('\t<p><a href="/">Avaleht</a></p>\n');
		res.write(pageFoot);
		return res.end();
	}
	else if(fileExt === '.jpg'){
		//universaalne marsruut kõigile .jpg failidele
		let filePath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(filePath);
			res.writeHead(200, {"Content-type": "image/jpeg"});
			return res.end(data);
		} catch (err) {
			console.log(err);
			res.writeHead(404, {"Content-type": "text/plain; charset=utf-8"});
			return res.end('Pilti ei leitud!');
		}
	}
	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_AA.png'){
		//liidame virtuaalse serveri päris kataloogidega
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(bannerPath);
			res.writeHead(200, {"Content-type": "image/png"});
			return res.end(data);
		} catch (err) {
			res.writeHead(404, {"Content-type": "text/plain; charset=utf-8"});
			return res.end('Pilti ei leitud!');
		}
	}
	else {
		res.writeHead(404, {"Content-type": "text/html; charset=utf-8"});
		res.write(pageHead);
		res.end('\t<p>Viga 404! Ei leia sellist lehte!</p>\n\t<p><a href="/">Avaleht</a></p>' + pageFoot);
	}
}).listen(5327);
