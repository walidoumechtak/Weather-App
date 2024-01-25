// wheather api key: 90743435001043998ee145417242301
// https://api.weatherapi.com/v1/current.json?key=11111111111111111&q=london

async function getData(city = "marrakech")
{
    var data = await fetch(`https://api.weatherapi.com/v1/current.json?key=90743435001043998ee145417242301&q=${city}`).then(data => data.json());
    var obj = {
        current: data.current,
        location: data.location
    }
    return obj;
}

const searchSubmit = document.querySelector("[name=city]");
let city = "";
let dataPromiss;
dataPromiss = getData();
searchSubmit.addEventListener('keydown', (e) => {

    if (e.key === 'Enter' || e.keyCode === 13)
    {
        city = searchSubmit.value;
        console.log(city);
        dataPromiss = getData(city);
        dataPromiss.then((data) => {
            buildComponent(data);
        });
    }
})


dataPromiss.then((data) => {
    buildComponent(data);     
});


function buildComponent(data)
{
    const status = data.current.condition.text;
    const date = data.current.last_updated;
    const nameOfTheCity = data.location.name;
    const temp_c = data.current.temp_c; 
    const temp_f = data.current.temp_f;
    const feelsLike_c = data.current.feelslike_c; 
    const feelsLike_f = data.current.feelslike_f;
    console.log(data);
}