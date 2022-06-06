const app = {
    init: () => {
        app.getLocation();
    },
    fetchWeather: (lat, lon) => {
        let key = '3fff8dac28a76c08aceef0170c5287b6';
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${key}&units=metric`;
        // fetch the weather
        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText); // 찾아보기
                return resp.json();
            })
            .then((data) => {
                app.showWeather(data);
            })
            .catch(console.error);
    },
    getLocation: (ev) => {
        let opts = {
            enableHighAccuracy: true,
            timeout: 1000 * 10, //10sec
            maximumAge: 1000 * 60 * 5, //5min
        };
        navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
    },
    ftw: (position) => {
        // got position
        app.fetchWeather(position.coords.latitude.toFixed(4),
            position.coords.longitude.toFixed(4));
    },
    wtf: (err) => {
        // geolocation failed
        console.error(err);
    },
    showWeather: (resp) => {
        console.log(resp);
        // 현재 날씨
        document.getElementById('cTime').innerHTML = `${app.getCurrentTime(resp.current.dt)}`;
        document.getElementById('cTemp').innerHTML = `현재 기온: ${Math.floor(resp.current.temp)}º`;
        setClothesImage(Math.floor(resp.current.temp))
        document.getElementById('minTemp').innerHTML = `최저: ${Math.floor(resp.daily[0].temp.min)}º`;
        document.getElementById('maxTemp').innerHTML = `최고: ${Math.floor(resp.daily[0].temp.max)}º`;
        document.getElementById('cIcon').innerHTML = `<img src='http://openweathermap.org/img/wn/${resp.current.weather[0].icon}@4x.png' alt="icon">`;
        document.getElementById('cFeel').innerHTML = `체감 온도: ${Math.floor(resp.current.feels_like)}º`;
        document.getElementById('cPop').innerHTML = `강수 확률: ${resp.daily[0].pop}%`;
        //시간별 온도
        var i;
        for (i=0;i<=5;i++){
            document.getElementById(`${i}-time`).innerHTML = `${app.getHour(resp.hourly[i].dt)}`;
            document.getElementById(`h${i}-icon`).innerHTML = `<img src='http://openweathermap.org/img/wn/${resp.hourly[i].weather[0].icon}.png' alt="icon">`;
            document.getElementById(`${i}-temp`).innerHTML = `${Math.floor(resp.hourly[i].temp)}º`;
        }
    },
    getCurrentTime: (dt) => {
        var day = new Date(dt * 1000);
        return day.toLocaleString("ko-kr",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"}); // 1월 17일 월요일 오후 5:14
    },
    getHour: (dt) => {
        var day = new Date(dt * 1000);
        return day.toLocaleString("ko-kr", {hour: "numeric"})
    }
};
app.init();