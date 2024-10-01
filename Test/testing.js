async function GetData(){
  const url = 'https://iterar-mapi-us.p.rapidapi.com/api/reserpine/substances.json';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'eaff105cbcmsh3cea2386107c767p1284aajsn3db7d558371b',
		'x-rapidapi-host': 'iterar-mapi-us.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}

GetData();