let counter = 1;

document.querySelector('.order-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Останавливаем отправку на сервер

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message') || 'Нет описания'
    };


    const resultsContainer = document.getElementById('results-container');


    const resultCard = document.createElement('div');
    resultCard.classList.add('result-card');


    resultCard.innerHTML = `
        <p style="text-align: center;">------------------------------------------</p>
        <h3>Заявка №${counter}</h3>
        <p><strong>Имя:</strong> ${data.name}</p>
        <p><strong>Телефон:</strong> ${data.phone}</p>
        <p><strong>Услуга:</strong> ${this.querySelector('#service option:checked').text}</p>
        <p style="width:100%;"><strong>Детали:</strong> ${data.message}</p>
    `;

    resultsContainer.prepend(resultCard);
    counter = counter + 1;

    this.reset();
});
