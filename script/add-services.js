
const USD_TO_BYN = 3.25; 

async function loadServices() {
    const response = await fetch('data/services.xml');
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const nodes = xmlDoc.getElementsByTagName("service");

    allServices = Array.from(nodes).map(s => {
        const val = s.getElementsByTagName("price")[0].textContent;
        const Price = parseFloat(val)||0;
            
        return {
            title: s.getElementsByTagName("title")[0].textContent,
            desc: s.getElementsByTagName("description")[0].textContent,
            priceBYN: Price,
            cat: s.getElementsByTagName("category")[0].textContent
        };
    });

    renderServices(allServices);
}

function renderServices(data) {
    const grid = document.getElementById("services-grid");
    grid.innerHTML = '';

    data.forEach(s => {
        let priceHTML = '';

        if (s.priceBYN > 0) {
            const usd = (s.priceBYN / USD_TO_BYN).toFixed(0);
            
            priceHTML = `
                <div class="main-price">от ${s.priceBYN} BYN</div>
                <div class="alt-price">\u{2248}${usd}$</div>
            `;
        } else {
            priceHTML = '<div class="main-price">Индивидуальный расчет</div>';
        }

        grid.innerHTML += `
            <div class="service-card">
                <span class="service-card__category">${s.cat}</span>
                <h3 class="service-card__name">${s.title}</h3>
                <p class="service-card__text">${s.desc}</p>
                <div class="service-card__price">${priceHTML}</div>
            </div>
        `;
    });
}


function sortServices(type) {
    let sorted = [...allServices];
    if (type === 'asc') sorted.sort((a, b) => a.priceBYN - b.priceBYN);
    else if (type === 'desc') sorted.sort((a, b) => b.priceBYN - a.priceBYN);
    renderServices(sorted);
}

document.addEventListener("DOMContentLoaded", loadServices);
