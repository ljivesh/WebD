const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('amount');
let movieSelect = document.getElementById('movie');
let ticketPrize = parseInt(movieSelect.value);

function updateSelectedSeats()
{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    console.log(seatsIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrize;


}

function populateUI()
{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
   
    if(selectedSeats !== null && selectedSeats.length>0)
    {
        seats.forEach((seat, index) => 
        {
            if(selectedSeats.indexOf(index)>-1)
            {
                seat.classList.add('selected');
            }
        });
    }

    const movieIndex = +localStorage.getItem('movieIndex');
    if(movieIndex!==null) movieSelect.selectedIndex = movieIndex;

    ticketPrize = +localStorage.getItem('ticketPrize');

    updateSelectedSeats();
    
        

}   

populateUI();

movieSelect.addEventListener('change', (e) =>
{
    ticketPrize = +e.target.value;
    const movieIndex = e.target.selectedIndex;
    localStorage.setItem('movieIndex', JSON.stringify(movieIndex));
    localStorage.setItem('ticketPrize', JSON.stringify(ticketPrize));

    updateSelectedSeats();

})

container.addEventListener('click', (e) =>
{
    if(e.target.classList.contains('seat')&&!e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');
        updateSelectedSeats();
    }
    
}) 
 

