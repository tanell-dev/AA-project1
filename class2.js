const firstName = 'Tanel';
const lastName = 'Leetmaa';
// vanasti olid muutujad var
let value1 = 7;
let value2 = 6;


function authorName(){
	console.log('Programmeeris ' + firstName + ' ' + lastName);
	// see polegi õige funktsioon vaid hoopis protseduur
}

function totalValue(){
	return value1 + value2;
}

function randomValue(limit){
	return Math.round(Math.random() * limit);
}

function myMath(limit){
	// lokaalsed muutujad
	let value1 = randomValue(limit);
	let value2 = randomValue(limit);
	return value1 + value2;
}

function timeFormattedET(){
		let timeNow = new Date();
		let hourNow = timeNow.getHours();
		let minuteNow = timeNow.getMinutes();
		let secondNow = timeNow.getSeconds();
		if(minuteNow < 10){
			minuteNow = '0' + minuteNow;
		}
		if(secondNow < 10){
			secondNow = '0' + secondNow;
		}
		return hourNow + ':' + minuteNow + ':' + secondNow;
}

function dateFormattedET(){
		let timeNow = new Date();
		let dateNow = timeNow.getDate();
		let monthNow = timeNow.getMonth();
		let yearNow = timeNow.getFullYear();
		const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
		//return dateNow + '.' + (monthNow + 1) + '.' + yearNow;
		return dateNow + '. ' + monthNamesET[monthNow] + ' ' + yearNow;
}

function weekDayET(){
		let timeNow = new Date();
		let dayNow = timeNow.getDay();
		const dayNamesET = ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'];
		return dayNamesET[dayNow];
}

function dayPart(){
		let partOfday = 'suvaline hetk';
		let timeNow = new Date();
		let hourNow = timeNow.getHours();
		let dayNow = timeNow.getDay();
		if(dayNow >= 1 && dayNow <= 5){
			if(hourNow < 6){
				partOfday = 'uneaeg';
			}
			if(hourNow >= 6 && hourNow < 8){
				partOfday = 'hommikune ärkamine';
			}
			if(hourNow >= 8 && hourNow < 10){
				partOfday = 'kooliks valmistumine';
			}
			if(hourNow >= 10 && hourNow < 18){
				partOfday = 'koolipäev';
			}
			if(hourNow >= 18 && hourNow < 22){
				partOfday = 'vaba aeg';
			}
			if(hourNow >= 22){
				partOfday = 'uneaeg';
			}
		}
		if(dayNow == 0 || dayNow == 6){
			if(hourNow < 9){
				partOfday = 'uneaeg';
			}
			if(hourNow >= 9 && hourNow < 12){
				partOfday = 'hommikune ärkamine';
			}
			if(hourNow >= 12 && hourNow < 18){
				partOfday = 'vaba päev';
			}
			if(hourNow >= 18 && hourNow < 23){
				partOfday = 'õhtune vaba aeg';
			}
			if(hourNow >= 23){
				partOfday = 'uneaeg';
			}
		}
		return partOfday;
}

authorName();
console.log('Kahe eelnevalt määratud arvu summa on ' + totalValue() + '.');
console.log('Juhuslik arv on: ' + randomValue(5));
console.log('Loositud arvude summa on: ' + myMath(10));
authorName();
console.log('Kahe eelnevalt määratud arvu summa on ' + totalValue() + '.');
console.log('Täna on: ' + weekDayET() + ', ' + dateFormattedET());
console.log('Kell on: ' + timeFormattedET());
console.log('Praegu on ' + dayPart() + '.');

// ssh greeny.cs.tlu.ee -l greenykasutajanimi
// lisade nädalapäev get day, esmaspäev, massiiv 7 päevaga.
// päeva osa lõpetada, et terve päev on kaetud saab teha topelt if, et argipäeviti on ühte moodi ja nädalavahetusel teisiti
// kellaaja formaati muuta, et kui sekundeid on vähem kui 10 siis panna 0 ette
//secondnow = 0 && secondNow