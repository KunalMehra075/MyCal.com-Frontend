localStorage.setItem("OrangeGoogleAuth", true);
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
if (params.successId) {
    let id = params.successId.trim().split(`"`)[1];
    console.log(id);
    let LetsGoButton = document.getElementById("LetsGoButton");
    LetsGoButton.addEventListener("click", () => {
        GoogleLoginFunction(id);
    });

} else {
    //? <!----------------------------------------------- < failed> ----------------------------------------------->
    let LetsGoButtonFailed = document.getElementById("LetsGoButtonFailed")
    if (LetsGoButtonFailed) {
        LetsGoButtonFailed.addEventListener("click", () => {
            window.location.href = "index.html"
        })

    }
}


async function GoogleLoginFunction(id) {
    let baseURL = "https://my-cal-com-backend.vercel.app";
    try {
        let res = await fetch(`${baseURL}/google/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ userID: id }),
        });

        let response = await res.json();
        console.log(response);
        if (response.Wrong) {
            swal("Login Unsuccessful!", `${response.Message}`, "error");
        } else {
            localStorage.setItem("accessToken", response.token);
            localStorage.setItem("username", response.user.name);
            localStorage.setItem("userAvatar", response.user.image);
            localStorage.setItem("collecton_name", response.user.email);
            swal("Login Successful!", "You are logged in, Lets Explore!", "success");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
    } catch (error) {
        console.log(error);
    }
}