// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const API="d1845658f92b31c64bd94f06f7188c9c";

const display=document.querySelector(".display");
const loc=document.querySelector('.location');
const display_location=document.querySelector('#display-location');
const search_bar=document.querySelector('.search_bar');
const search_btn=document.querySelector('.search_btn');
const temp=document.querySelector(".temp");
const weather_img=document.querySelector(".weather_img");
const loader=document.querySelector(".loader");
const search=document.querySelector('.search');
const city_btn=document.querySelector('.city_btn');
const coords_btn=document.querySelector('.coords_btn');
const get_weather=document.querySelector('.get_weather');
const coords=document.querySelector('.coords');
const error=document.querySelector('.error');

city_btn.addEventListener('click',()=>{
    city_btn.classList.add('change_color');
    error.classList.remove('visible');
    coords.classList.remove('visible');
    coords_btn.classList.remove('change_color');
    search.classList.add('visible');
    display.classList.remove("active");
    document.querySelector('#lat').value="";
    document.querySelector('#lon').value="";
});

coords_btn.addEventListener('click',()=>{
    coords_btn.classList.add('change_color');
    error.classList.remove('visible');
    search.classList.remove('visible');
    city_btn.classList.remove('change_color');
    coords.classList.add('visible');
    display.classList.remove("active");
    search_bar.value="";
});

let flag=document.createElement('img');

search_btn.addEventListener('click',()=>{
    if(!search_bar.value){
    alert('Please enter city name');
    return;
    }
    let city_name=search_bar.value;
    loader.classList.add('visible');
    if(flag)
    flag.remove();
    display.classList.remove("active");
    update(city_name);
});

get_weather.addEventListener('click',()=>{
    let lat=document.querySelector('#lat').value;
    let lon=document.querySelector('#lon').value;
    if(!lat || !lon){
        alert('Please Enter both the coordinates');
        return;
    }
    if(lat && lon){
    loader.classList.add('visible');
    if(flag)
    flag.remove();
    display.classList.remove("active");
    update2(lat,lon);
    }
});

async function update(city)
{
    try{
    let data=await getData(city);
    display_location.innerText=city.toUpperCase();
    let country=await data.sys.country;
    country=country.toLowerCase();
    if(country){
        flag.src=`https://flagcdn.com/48x36/${country}.png`; 
        await loc.appendChild(flag);
    }
    let main=await data.weather[0].main;
    let icon=await data.weather[0].icon;
    let temperature=await (data.main.temp-273.15).toFixed(1);
    temp.innerText=`${main}, ${temperature}`;
    weather_img.src=`https://openweathermap.org/img/wn/${icon}.png`;
    
    display.classList.add("active");
    }
    catch(err){
        // console.log("error aaya hai",err);
        error.classList.add('visible');
    }
}

async function update2(lat,lan)
{
    try{
    let data=await getCustomWeatherDetails(lat,lan);
    display_location.innerText=data.name.toUpperCase();
    let country=await data.sys.country;
    if(country){
        flag.src=await `https://flagsapi.com/${country}/flat/64.png`;
        loc.appendChild(flag);
    }
    let main=await data.weather[0].main;
    let icon=await data.weather[0].icon;
    let temperature=await (data.main.temp-273.15).toFixed(1);
    temp.innerText=`${main}, ${temperature}`;
    weather_img.src=` https://openweathermap.org/img/wn/${icon}.png`;
    
    display.classList.add("active");
    }
    catch(err){
        // console.log("error aaya hai",err);
        error.classList.add('visible');
    }
}


async function getData(city){
    try{
    const result= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`);
    const data=await result.json();
    
    console.log(data);
    loader.classList.remove('visible');
    return data;
    // renderWeatherInfo(data);
    }
    catch(err){
        // console.log("Error found",err);
    }
}


async function getCustomWeatherDetails(lat,lon){
    try{
    let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`);
    let data=await res.json();

    console.log(data);
    loader.classList.remove('visible');
    return data;
    }
    catch(err){
        console.log("Error found",err);
    }
}

// To get my current location we had used HTML geolocation api.The HTML Geolocation API is used to locate a user's position.

// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//       console.log('No geolocation supported');
//     }
//   }
  
//   async function showPosition(position) {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;

//     const data=await getCustomWeatherDetails(lat,lon);
//   }
// Get flags-> https://flagsapi.com/BE/flat/64.png