window.onload = () => {
    document.getElementById("submit").addEventListener("click", () => {
        var private_key = document.getElementById("private_key").value;

        if (private_key != "") {

            if (private_key.substring(0, 2) != '0x') {
                private_key = '0x' + private_key;
            }

            sessionStorage.private_key = private_key;

            window.location.replace("register.html");
        }
    });
}