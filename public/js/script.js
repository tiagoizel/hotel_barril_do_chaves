const navBtn = document.getElementById('nav-btn');
const cancelBtn = document.getElementById('cancel-btn');
const sideNav = document.getElementById('sidenav');
const modal = document.getElementById('modal');

navBtn.addEventListener("click", function(){
    sideNav.classList.add('show');
    modal.classList.add('showModal');
});

cancelBtn.addEventListener('click', function(){
    sideNav.classList.remove('show');
    modal.classList.remove('showModal');
});

window.addEventListener('click', function(event){
    if(event.target === modal){
        sideNav.classList.remove('show');
        modal.classList.remove('showModal');
    }
});

$('#modalQuarto71').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) 
    var idQuarto = button.data('id') 
    var nomeQuarto = button.data('nome') 
    
    var modal = $(this)
    modal.find('.modal-title').text('Reservar quarto: ' + nomeQuarto)
});

$('#modalQuarto72').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) 
    var idQuarto = button.data('id') 
    var nomeQuarto = button.data('nome') 

    var modal = $(this)
    modal.find('.modal-title').text('Reservar quarto: ' + nomeQuarto)
});

$('#modalQuarto14').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) 
    var idQuarto = button.data('id') 
    var nomeQuarto = button.data('nome') 
    
    var modal = $(this)
    modal.find('.modal-title').text('Reservar quarto: ' + nomeQuarto)
});