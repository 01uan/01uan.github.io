function renderFooter() {

        const footer = document.createElement('footer');
        
        footer.innerHTML = `
            <h3>Where you can find me</h3>
            <section>
            <u><a href="https://github.com/01uan">Github</a></u> -
            <u><a href="https://www.linkedin.com/in/gia-d-93695a220/">LinkedIn</a></u>
            </section>
            <p>Contact me at: <u><a href="mailto: diep.thuan@hotmail.com">diep.thuan@hotmail.com</u></a>
        `;

        document.body.appendChild(footer);
}

function renderFavicon() {
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png"; 
    favicon.href = "/images/favicon.ico"; 
    document.head.appendChild(favicon);
}


document.addEventListener('DOMContentLoaded', renderFooter);
window.addEventListener("DOMContentLoaded", renderFavicon);