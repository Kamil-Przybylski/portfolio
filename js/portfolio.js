(function() {

    
})();


var btn = document.querySelector("#app1"),
    xhr = new XMLHttpRequest(),
    appWindow = document.querySelector(".portfolio-window"),
    app1,
    error;

btn.addEventListener("click", function() {

    xhr.open("GET", "app1.html");
    xhr.send();

    xhr.onreadystatechange = function() {

        if(document.querySelector("#error")) {
            document.querySelector("#error").remove(); 
        }

        if (this.readyState == 4 && this.status == 200) {

            app1 = document.createElement('div');
            app1.id = "app1"
            app1.innerHTML = xhr.response;
            appWindow.appendChild(app1);   

        } else if (this.readyState == 4) {

            if (!appWindow.firstElementChild) {
                error = document.createElement('div');
                error.id = error;
                error.innerHTML = "<h1>Wystąpił błąd serwera...</h1>"
                error.classList.add("text-center");
                appWindow.appendChild(error);
            }

        }
    }

});