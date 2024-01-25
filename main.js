// wheather api key: 90743435001043998ee145417242301
// https://api.weatherapi.com/v1/current.json?key=11111111111111111&q=london

async function getData()
{
    var data = await fetch("https://api.weatherapi.com/v1/current.json?key=90743435001043998ee145417242301&q=london").then(data => data.json());
    var obj = {
        current: data.current,
        location: data.location
    }
    return obj;
}

let dataPromiss = getData();

dataPromiss.then((data) => {
    console.log(data);
});
