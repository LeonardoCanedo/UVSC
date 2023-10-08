function changeVideoSpeed(speed, currentButton) {
    videoPlayer.pause();
    videoPlayer.playbackRate = speed;
    videoPlayer.play();

    // Remove the "active-button" class from all buttons
    const buttons = document.querySelectorAll(".speed-change-button");
    buttons.forEach((button) => {
        button.classList.remove("active-button");
    });

    // Add the "active-button" class to the clicked button
    currentButton.classList.add("active-button");
}

function createSpeedButton(speed) {
    let button = document.createElement("button");
    button.innerHTML = speed + "x";
    button.classList.add("speed-change-button");
    button.addEventListener("click", () => {
        changeVideoSpeed(speed, button);
    });

    if (speed == 1.00) {
        button.click();
    }

    return button;
}

// We do an interval to check for the container every one second, in case the extension loads before the content
function waitForVideoPlayerContainer() {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            const videoPlayerContainer = document.querySelector(".selectpicker");
            if (videoPlayerContainer) {
                clearInterval(interval);
                resolve(videoPlayerContainer);
            }
        }, 1000);
    });
}

// Function for my personal link
function personalLink() {
    const link = document.createElement("a");
    link.classList.add("personal-link");
    link.href = "https://github.com/LeonardoCanedo";
    link.innerHTML = "EXTENSION BY LEONARDO CANEDO";

    return link
}

const videoPlayer = document.getElementById("azuremediaplayer_html5_api");
const videoPlayerPromise = waitForVideoPlayerContainer();

videoPlayerPromise.then((videoPlayerContainer) => {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");

    // Create buttons for different playback speeds
    const speeds = [1.00, 1.25, 1.50, 1.75, 2.00]; // Add more speeds as needed
    speeds.forEach((speed) => {
        let button = createSpeedButton(speed);
        buttonsContainer.appendChild(button);
    });

    buttonsContainer.appendChild(personalLink());
    videoPlayerContainer.appendChild(buttonsContainer);
    
});

