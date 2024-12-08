document.addEventListener("DOMContentLoaded", () => {
    console.log("Bienvenue sur le site aimili1!");

    const container = document.querySelector(".container");
    container.style.opacity = "0";
    container.style.transition = "opacity 1.5s ease-in-out";

    setTimeout(() => {
        container.style.opacity = "1";
    }, 500);

    const logo = document.querySelector(".project-logo");
    logo.addEventListener("mouseover", () => {
        logo.style.animation = "pulse 0.5s infinite";
    });
    logo.addEventListener("mouseout", () => {
        logo.style.animation = "pulse 2s infinite";
    });
});
