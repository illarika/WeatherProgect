// function createPost(){
//         const post = {
//             title : "foo",
//             body : "bar",
//             userId : 1,
//         }
//         fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify(post),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       })
//         .then((response) => response.json())
//         .then((json) => console.log(json));
//     }
//     function getPost(){
//     }
//     function deletePost(){
//         fetch('https://jsonplaceholder.typicode.com/posts/1', {
//             method: 'DELETE',
//           }); 
//     }
// 88167022d5d42948117b1b43909a57c3
let city = document.querySelector("#city");
let date = document.querySelector("#data");
let imgIcon  = document.querySelector("#imgIcon");
let temp = document.querySelector("#temp");
let wind = document.querySelector("#wind");
let precip = document.querySelector("#precip");
let pressure = document.querySelector("#pressure");
let weanterEveryday = document.querySelector(".weanterEveryday")
let imgInform = document.querySelector("#imgInform");
let weatherCity = document.querySelector("#weatherCity")
let btn = document.querySelector(".btn");
let blockWeather = document.querySelector(".blockWeather");


window.onload = function() {
  getPostWeather()
}

function getUrlForImg(icon){
  return `http://api.openweathermap.org/img/w/${icon}.png`
}

function getEveryDayData(str){
  return str.split(" ").substr(0);
}
function getWeekDay(dates){
  let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  return days[new Date(dates).getDay()];
}
function getReplaceData(dates){
  let d = new Date(dates);
  let dd = d.getDate();
  let mm = d.getMonth();
  let yy = d.getFullYear();
  return dd + "." + mm + "." + yy;
}
function clickButton(){
  
}
async function getPostWeather(){
  // const weatherList;
  // fetch("http://api.openweathermap.org/data/2.5/forecast?q=minsk&appid=88167022d5d42948117b1b43909a57c3")
  // .then((response) => response.json())
  // .then((json)=> {
  //   weatherList = json.list;
  //   console.log()
  // })
  const queryParams = {
    appId: "88167022d5d42948117b1b43909a57c3",
    q: weatherCity.value,
    units: "metric",
    lang: "ru",

  }

  let weatherList = [];
  let response = await fetch("http://api.openweathermap.org/data/2.5/forecast?" + new URLSearchParams(queryParams));
  let data = await response.json();
  weatherList = data.list;
  const filterWeathers = weatherList.filter(weather => weather.dt_txt.indexOf("15:00") > 0);
  // const newFilteredWeathers = [];
  // for(let weather of weatherList){
  //   if(weather.dt_text.indexOf("15:00") > 0){
  //     newFilteredWeathers.push(weather);
  //   }
  // }
  console.log(filterWeathers);
  console.log(data);
  //blockWeather.style.display = none;
  city.innerHTML = data.city.name + ", " + data.city.country;
  date.innerHTML = data.list[0].dt_txt;
  let iconImg = document.createElement("img");
  let textWeather = document.createElement("p");
  textWeather.innerHTML = data.list[0].weather[0].description;
  let icon = data.list[0].weather[0].icon;
  iconImg.src = getUrlForImg(icon);
  temp.innerHTML = Math.round(data.list[0].main.temp) + "&#8451;";
  // let imgWind = document.createElement('img');
  // let imgPrec = document.createElement("img");
  // let imgPres = document.createElement("img");
  //imgWind.src  = "/img/wind.png"
  //imgPrec.src = "/img/weather.png"
  //imgPres.scr = "/img/100.png"
  wind.innerHTML = "Ветер: " + data.list[0].wind.gust + " kph";
  precip.innerHTML = "Осадки: " + data.list[0].main.humidity + " mm";
  pressure.innerHTML = "Давление: " + data.list[0].main.pressure + "mb";
  imgInform.append(iconImg, textWeather);
  imgIcon.append(imgInform);

  btn.addEventListener("click", function(){
 
    for (let i = 0; i < 5; i++){
      let tue = document.createElement("div");
      tue.className = "blockEveryday";
      if(i === 0){
        tue.className = "blockEverydayLeft";
      }
      if(i === 4){
        tue.className = "blockEverydayRiht"
      }
     
        let dates = filterWeathers[i].dt_txt.slice(0,10);
        tue.innerHTML = getWeekDay(dates);
        //tue.innerHTML = getReplaceData(dates);
        let dateTue = document.createElement("div");
        dateTue.innerHTML = getReplaceData(dates);
        let imgTue = document.createElement("img");
        icon = filterWeathers[i].weather[0].icon;
        imgTue.src = getUrlForImg(icon);
        let tempTue = document.createElement("div");
        tempTue.innerHTML = Math.round(filterWeathers[i].main.feels_like) + "&#8451;";
        tue.append(dateTue, imgTue, tempTue);
        weanterEveryday.append(tue);
      
        if(document.querySelector('.block')){
          document.querySelector('.block').remove();
      }
      
        }

  })

  
}
  // let wed = document.createElement("div");
  // wed.className = "blockEveryday";
  // let dateWed = document.createElement("div");
  // dates = filterWeathers[1].dt_txt.slice(0,10);
  // dateWed.innerHTML = dates;
  // wed.innerHTML = getWeekDay(dates);
  // let imgWed = document.createElement("img");
  // imgWed.src = getUrlForImg(icon);
  // let tempWed = document.createElement("div");
  // tempWed.innerHTML = Math.round(filterWeathers[1].main.feels_like) + "&#8451;";
  // wed.append(dateWed, imgWed, tempWed);
  
  // let thu = document.createElement("div");
  // thu.className = "blockEveryday";
  // let dateThu = document.createElement("div");
  // dates = filterWeathers[2].dt_txt.slice(0,10);
  // dateThu.innerHTML = dates;
  // thu.innerHTML = getWeekDay(dates);
  // let imgThu = document.createElement("img");
  // imgThu.src = getUrlForImg(icon);
  // let tempThu = document.createElement("div");
  // tempThu.innerHTML = Math.round(filterWeathers[2].main.feels_like) + "&#8451;";
  // thu.append(dateThu, imgThu, tempThu);

  // let fri = document.createElement("div");
  // fri.className = "blockEveryday";
 
  // let dateFri = document.createElement("div");
  // dates = filterWeathers[3].dt_txt.slice(0,10);
  // dateFri.innerHTML = dates;
  // fri.innerHTML = getWeekDay(dates);
  // let imgFri = document.createElement("img");
  // imgFri.src = getUrlForImg(icon);
  // let tempFri = document.createElement("div");
  // tempFri.innerHTML = Math.round(filterWeathers[3].main.feels_like) + "&#8451;";
  // fri.append(dateFri, imgFri, tempFri);

  // let sat = document.createElement("div");
  // sat.className = "blockEverydayRiht";
  // sat.innerHTML = "Sat";
  // let dateSat = document.createElement("div");
  // dates = filterWeathers[4].dt_txt.slice(0,10);
  // dateSat.innerHTML = dates;
  // sat.innerHTML = getWeekDay(dates);
  // let imgSat = document.createElement("img");
  // imgSat.src = getUrlForImg(icon);
  // let tempSat = document.createElement("div");
  // tempSat.innerHTML = Math.round(filterWeathers[4].main.feels_like) + "&#8451;";
  // sat.append(dateSat, imgSat, tempSat);
  
//  weanterEveryday.append(tue, wed, thu, fri, sat);
  
  






