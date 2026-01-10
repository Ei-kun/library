let myLibrary=[];

function Book(author,title,page,read){

}

function addBookToLibrary(){
    
}

const showInputDialog=document.querySelector(".add-button");
const closeInputDialog=document.querySelectorAll(".dialog-close")
const dialog=document.querySelector("#add-form");
const form=document.querySelectorAll("form");

showInputDialog.addEventListener("click",() =>{
    dialog.showModal();
});

closeInputDialog.forEach(button =>{
    button.addEventListener("click",()=>{
        dialog.close();
    })
});

dialog.addEventListener("close", () => {
    form.forEach(item => {
        item.reset();
    })
});