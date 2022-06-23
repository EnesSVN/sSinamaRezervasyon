const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie")
const seats = document.querySelectorAll(".seat:not(.reserved)")

getFromLocalStorage();
calculateTotal();

container.addEventListener("click",function (e) {  
    if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved")){
        e.target.classList.toggle('selected');

        calculateTotal();
    }
})

select.addEventListener('change',function(e){
    calculateTotal();

})

function calculateTotal( ) {
    const selectedSeat = container.querySelectorAll(".seat.selected");

    const selectedSeatArr = [...selectedSeat];
    const seatArr = [...seats];

   // selectedSeat.forEach(function(seat) {
     //   selectedSeatArr.push(seat)
   // })

    //seats.forEach(function(seat){
    //    seatArr.push(seat)
    //})

    let selectedSeatIndexs = selectedSeatArr.map(function(seat) {
        return seatArr.indexOf(seat)
    })
    console.log(selectedSeatIndexs);

    let selectedSeatCount = selectedSeat.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeat'))

    if (selectedSeats !=null && selectedSeats.length > 0) {
        seats.forEach(function(seat,index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovieIndex =JSON.parse(localStorage.getItem('selectedMovieIndex'))

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem("selectedSeat",JSON.stringify(indexs))
    localStorage.setItem("selectedMovieIndex",select.selectedIndex)
}