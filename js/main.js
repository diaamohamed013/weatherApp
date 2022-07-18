var searchInp = document.getElementById("searchInp");
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


async function getWeather(q) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0c0344998b34472088953515220206&q=${q}&days=3`);
    let finalRes = await res.json();
    // console.log(finalRes);
    displayWeather(finalRes);
    displayWeatherAfter(finalRes.forecast.forecastday);
};


function displayWeather(item) {
    let d = new Date();
    let cartona = ``;
    cartona += `<div class="col-lg-4">
                    <div class="card">
                        <div class="card-title d-flex justify-content-between">
                            <span>${days[d.getDay()]}</span>
                            <span>${d.getDate() + " " + monthNames[d.getMonth()]}</span>
                        </div>
                        <div class="card-body">
                            <h4>${item.location.name}</h4>
                            <div class="degree d-flex justify-content-between align-items-center">
                                <h2>${item.current.temp_c}<sup>o</sup>C</h2>
                                <span><img src="https:${item.current.condition.icon}" alt="" class=""w-90></span>
                            </div>
                            <h5>${item.current.condition.text}</h5>
                            <div class="info">
                                <span>
                                    <img src="images/icon-umberella.png" alt="">
                                    20%
                                </span>
                                <span>
                                    <img src="images/icon-wind.png" alt="">
                                    18km/h
                                </span>
                                <span>
                                    <img src="images/icon-compass.png" alt="">
                                    East
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`
    document.getElementById("myRow").innerHTML = cartona;
    // console.log(cartona);
};

function displayWeatherAfter(m) {
    let cartona = ``;
    for (let i = 1; i < m.length; i++) {
        cartona += `<div class="col-lg-4">
                        <div class="card text-center h-100">
                            <div class="card-title">
                                <span>${days[new Date(m[i].date).getDay()]}</span>
                            </div>
                            <div class="card-body d-flex align-items-center flex-column justify-content-center">
                                <img src="https:${m[i].day.condition.icon}" class="sun" alt="">
                                <h2>${m[i].day.maxtemp_c}<sup>o</sup>C</h2>
                                <h3>${m[i].day.mintemp_c}<sup>o</sup>C</h3>
                                <h5>${m[i].day.condition.text}</h5>
                            </div>
                        </div>
                    </div>`
    }
    document.getElementById("myRow").innerHTML += cartona;
    // console.log(cartona);
}

getWeather("cairo");

searchInp.addEventListener("keyup", function (e) {
    getWeather(e.target.value);
});





