const cputempbox = document.getElementById("cputempbox")

function setTemp() {
    fetch("/api/info/cpu/temperature")
        .then(res => res.json())
        .then(json => {
            if (json.temperature) {
                cputempbox.innerHTML = json.temperature
            }
        })
}

if (cputempbox) {
    setInterval(setTemp, 3000)
}