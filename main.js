// wheather api key: 90743435001043998ee145417242301
// https://api.weatherapi.com/v1/current.json?key=11111111111111111&q=london
const searchSubmit = document.querySelector("[name=city]");
const changeTypeOfDegree = document.querySelector("#degree #changeTypeDegree");
const errorMsg = document.querySelector(".error-msg");

let controller = false; // flase it means that the value should be in C not in F.
let eventListnerFunction;
function changeTheDegree(temp_c, temp_f, tempElement, feelLikeEle, feelsLike_c, feelsLike_f)
{
    if (controller === false)
        controller = true;
    else
        controller = false;
    console.log("contorller: " + controller);
    if (controller === false)
    {
        tempElement.textContent = temp_c + " °C";
        feelLikeEle.textContent = feelsLike_c + " °C";
        changeTypeOfDegree.textContent = "Display °F";
    }
    else
    {
        tempElement.textContent = temp_f + " °F";
        feelLikeEle.textContent = feelsLike_f + " °F";
        changeTypeOfDegree.textContent = "Display °C";
    }
}

async function getData(city = "marrakech")
{
    var data = await fetch(`https://api.weatherapi.com/v1/current.json?key=90743435001043998ee145417242301&q=${city}`).then(data => data.json());
    var obj = {
        current: data.current,
        location: data.location
    }
    return obj;
}

let city = "";
let dataPromiss;
dataPromiss = getData();
searchSubmit.addEventListener('keydown', (e) => {

    if (e.key === 'Enter' || e.keyCode === 13)
    {
        changeTypeOfDegree.removeEventListener('click', eventListnerFunction);
        
        city = searchSubmit.value;
        //console.log(city);
        dataPromiss = getData(city);
        //console.log("here is the searched object: " + dataPromiss);
        dataPromiss.then((data) => {
            buildComponent(data);
        })
        .catch(err => {
            errorMsg.textContent = "Error: Invalid place";
        })
        searchSubmit.value = "";
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
    const humidity = data.current.humidity;
    const windSpeed = data.current.vis_km;
    const windDir = data.current.wind_dir;
    let time = data.location.localtime;
    time = time.split(' ')[1];
    time = time.split(':')[0];

    if (time >= 7 && time <= 19)
    {
        document.body.style.background = "url(background/morning.jpg)";
    }
    else
        document.body.style.background = "url(background/night.jpg)";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
        

    const statusElement = document.querySelector(".top h1");
    statusElement.textContent = status;

    const dateElement = document.querySelector("#time");
    dateElement.textContent = date;

    const locationElement = document.querySelector("#location");
    locationElement.textContent = nameOfTheCity;

    // need to check if we want °C or °F
    const tempElement = document.querySelector("#degree h2");
    tempElement.textContent = temp_c + " °C";

    const feelLikeEle = document.querySelector(".bottom .feelsLike .value");
    feelLikeEle.textContent = feelsLike_c + " °C";

    const humidityElement = document.querySelector(".bottom .humidity .value");
    humidityElement.textContent = humidity + " %";

    const windSpeedElement = document.querySelector(".windSpeed .value");
    windSpeedElement.textContent = windSpeed + " km/h";

    const windDirElement = document.querySelector(".windDir .value");
    windDirElement.textContent = windDir;

    // add an event listner to change the type of degree from C to F or the oposite.
    
    eventListnerFunction = () => {
        changeTheDegree(temp_c, temp_f, tempElement, feelLikeEle, feelsLike_c, feelsLike_f);
    }
    changeTypeOfDegree.addEventListener('click', eventListnerFunction); 
    console.log(data);
}