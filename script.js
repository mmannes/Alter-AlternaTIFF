var page_count = 0;
window.addEventListener("load", function (event) {
    if (!window.name || window.name.length == 0) {
        alert(
            "You must provide a valid TIFF image path in the name attribute of the iframe."
        );
    }

    Tiff.initialize({ TOTAL_MEMORY: 16777216 * 10 });
    var xhr = new XMLHttpRequest();
    xhr.open("GET", window.name);
    xhr.responseType = "arraybuffer";
    xhr.onload = function (e) {
        var buffer = xhr.response;
        var tiff = new Tiff({ buffer: buffer });
        let limit_in_miliseconds = 10000;
        let start = new Date().getTime();
        for (var i = 0, len = tiff.countDirectory(); i < len; ++i) {
            let end = new Date().getTime();
            if (end - start > limit_in_miliseconds) {
                alert(
                    "This document is too big and it will be presented until page " +
                        i +
                        ". You can click download to be able to view it entirely in your favorite TIFF viewer application."
                );
                break;
            }
            tiff.setDirectory(i);
            var canvas = tiff.toCanvas();
            page_count++;
            canvas.setAttribute("class", "canvas-page");
            canvas.setAttribute("id", "page_" + page_count);
            document.querySelector("div#viewer").append(canvas);
        }
        setScale();
    };
    xhr.send();
    document
        .querySelector("#scaleSelect")
        .addEventListener("change", function (event) {
            setScale();
        });
    document
        .querySelector("#zoomIn")
        .addEventListener("click", function (event) {
            showCustomScaleOption();
            incrementScale();
        });
    document
        .querySelector("#zoomOut")
        .addEventListener("click", function (event) {
            showCustomScaleOption();
            decrementScale();
        });
    document.querySelector("#download").addEventListener("click", function () {
        location.replace(window.name);
    });
    let page_number = document.querySelector("#pageNumber");
    page_number.addEventListener("change", function () {
        let url = location.href;
        location.href = "#page_" + this.value;
        history.replaceState(null, null, url);
    });
    document.querySelector("#previous").addEventListener("click", function () {
        if (page_number.value <= 1) {
            return;
        }
        page_number.value--;
        page_number.dispatchEvent(new Event("change"));
    });
    document.querySelector("#next").addEventListener("click", function () {
        if (page_number.value >= page_count) {
            return;
        }
        page_number.value++;
        page_number.dispatchEvent(new Event("change"));
    });
});

function showCustomScaleOption() {
    let customOption = document.querySelector("#customScaleOption");
    customOption.hidden = false;
    customOption.selected = true;
}

function hideCustomScaleOption() {
    let customOption = document.querySelector("#customScaleOption");
    customOption.hidden = true;
}

var scale = 0.5;

function incrementScale() {
    scale = scale + 0.2;
    showCustomScaleOption();
    let pages = document.querySelectorAll("canvas.canvas-page");
    pages.forEach(function (canvas) {
        let new_width = parseInt(canvas.width) / (1 / parseFloat(scale)) + "px";
        canvas.style.width = new_width;
        canvas.style.height = "auto";
    });
}

function decrementScale() {
    scale = scale - 0.2;
    showCustomScaleOption();
    let pages = document.querySelectorAll("canvas.canvas-page");
    pages.forEach(function (canvas) {
        let new_width = parseInt(canvas.width) / (1 / parseFloat(scale)) + "px";
        canvas.style.width = new_width;
        canvas.style.height = "auto";
    });
}

function setScale() {
    hideCustomScaleOption();
    let ui = document.querySelector("#scaleSelect");
    let selected = ui.options[ui.selectedIndex];
    let transform = selected.dataset.l10nId;
    let pages = document.querySelectorAll("canvas.canvas-page");
    switch (transform) {
        case "page_scale_auto":
            pages.forEach(function (canvas) {
                canvas.style.height = "100vh";
                canvas.style.width = "auto";
                scale = 0.5;
            });
            break;
        case "page_scale_actual":
            pages.forEach(function (canvas) {
                canvas.style.height = "auto";
                canvas.style.width = "auto";
                scale = 0.5;
            });
            break;
        case "page_scale_width":
            pages.forEach(function (canvas) {
                canvas.style.width = "100vw";
                canvas.style.height = "auto";
                scale = 0.5;
            });
            break;
        case "page_scale_percent":
            document;
            pages.forEach(function (canvas) {
                let new_width =
                    parseInt(canvas.width) / (1 / parseFloat(selected.value)) +
                    "px";
                canvas.style.width = new_width;
                canvas.style.height = "auto";
            });
            break;
        default:
            console.log("Transform not applied: " + transform);
            break;
    }
}
