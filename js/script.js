document.addEventListener('DOMContentLoaded', () => {
    let tickets = [];
    let lastNumero = [];

    async function fetchLastDraw() {
        try {
            const response = await fetch('https://loteriascaixa-api.herokuapp.com/api/megasena/latest');
            const data = await response.json();
            lastNumero = data.dezenas.map(num => parseInt(num, 10));
            console.log('Último sorteio:', lastNumero);
        } catch (error) {
            console.error('Erro ao buscar o último sorteio:', error);
        }
    }

    function checkIfWinner(ticket) {
        return lastNumero.every(num => ticket.includes(num));
    }

    function handleSubmit(event) {
        event.preventDefault();
        const numbers = [
            parseInt(document.getElementById('num1').value, 10),
            parseInt(document.getElementById('num2').value, 10),
            parseInt(document.getElementById('num3').value, 10),
            parseInt(document.getElementById('num4').value, 10),
            parseInt(document.getElementById('num5').value, 10),
            parseInt(document.getElementById('num6').value, 10),
        ];
        tickets.push(numbers);
        updateTicketList();
    }

    function updateTicketList() {
        const ticketList = document.getElementById('ticketList');
        ticketList.innerHTML = '';
        tickets.forEach((ticket, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Ticket ${index + 1}: ${ticket.join(', ')}`;
            ticketList.appendChild(listItem);
        });
    }

    function handleDraw() {
        setTimeout(() => {
            const winners = tickets.filter(ticket => checkIfWinner(ticket));
            const result = document.getElementById('result');
            if (winners.length > 0) {
                result.textContent = `Tickets ganhadores: ${winners.map(ticket => ticket.join(', ')).join(' | ')}`;
            } else {
                result.textContent = 'Nenhum ticket ganhou.';
            }
        }, 2000);
    }

    document.getElementById('Form').addEventListener('submit', handleSubmit);
    document.getElementById('Butao').addEventListener('click', handleDraw);

    fetchLastDraw();
});