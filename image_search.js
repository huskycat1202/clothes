window.onload = () => {
    console.log(window)
    const cTemp = document.getElementById("cTemp");
    console.log(cTemp)
    if (window.location.pathname === '/clothes/aside_1.html') {
        setClothesImage(28)
    }
    else if (window.location.pathname === '/clothes/aside_2.html') {
        setClothesImage(23)
    }
    else if (window.location.pathname === '/clothes/aside_3.html') {
        setClothesImage(20)
    }
    else if (window.location.pathname === '/clothes/aside_4.html') {
        setClothesImage(17)
    }
    else if (window.location.pathname === '/clothes/aside_5.html') {
        setClothesImage(12)
    }
    else if (window.location.pathname === '/clothes/aside_6.html') {
        setClothesImage(9)
    }
    else if (window.location.pathname === '/clothes/aside_7.html') {
        setClothesImage(5)
    }
    else if (window.location.pathname === '/clothes/aside_8.html') {
        setClothesImage(4)
    }
}

async function setClothesImage(t) {
    console.log(t);
    const setJson = await fetch("clothes.json");
    const temps = await setJson.json();
    const arr = [];

    // console.log(temps)

    for (let temp of temps) {
        if (temp.temperature > t) continue;
            if (t < 18) {
                for (let i = 0; i < temp.content.outer.length; i++) {
                    arr.push(temp.content.outer[i])
                }
            }

            for (let i = 0; i < temp.content.upper.length; i++) {
                arr.push(temp.content.upper[i])
            }

            for (let i = 0; i < temp.content.lower.length; i++) {
                arr.push(temp.content.lower[i])
            }

            console.log(arr)
    }

    const config = {
        headers: {
            'Authorization': 'KakaoAK b62c85ae2923afa9548cf2e7734d7508'
        }
    };

    for (let i = 0; i < arr.length; i++) {
        fetch(`https://dapi.kakao.com/v2/search/image?query=${arr[i]}&size=1`, config)
            .then(response => response.json())
            .then(response => {
                console.log("image", response)
                document.getElementById(`clothes${i + 1}`).setAttribute("src", response.documents[0].thumbnail_url);
            })
            .catch(error => console.log(error));
    }
}


