function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

document.getElementById("log-me-in").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await fetch("https://ets-pemrograman-web-f.cyclic.app/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then((response) => {
    if (response.ok) { // code stat 200
        return response.json();
    } else {
        throw new Error("Request failed with status: " + response.status);
    }
    })
    .then((data) => {
    console.log("Received data:", data);
    const accessToken = data.data.access_token;
    setCookie("token", accessToken, 1);
    location = "/flappynyan.html";

    })
    .catch((error) => {
    console.error("Error:", error);
    });
});