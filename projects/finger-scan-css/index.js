//constructor
function Book(name,author,type){
    this.name=name;
    this.author=author;
    this.type=type;

}
function Display()




let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit,libraryFormSubmit');

function libraryFormSubmit(e){
    e.preventDefault();
    console.log('You have submitted your form');
}