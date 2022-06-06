const search = () => {
    let location = document.querySelector('#location').value;
    if(location == '') {
        alert("동네를 입력하세요.");
    } else {
        addrToXY(location);
    }
}

const addrToXY = (location) => {
    let key = 'f6d23cfd8deae9e2a6a4c287cf223bef';
    let url = `https://dapi.kakao.com/v2/local/search/address.json?query=${location}`;
    let lat, lon;

    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `KakaoAK ${key}`
        }
    }).then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    }).then((data) => {
        lat = data.documents[0].y;
        lon = data.documents[0].x;
        console.log(lat, lon);
        app.fetchWeather(lat,lon);
    });
}