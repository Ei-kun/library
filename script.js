let myLibrary=[];

function Book(title,author,page,cover,read,pagesRead){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.page=Number(page);
    this.read=read;
    this.pagesRead=(read==="false")? Number(pagesRead):Number(page);
    this.cover= (cover==="")? "":cover;
}

function addBookToLibrary(item){
    myLibrary.push(item);

    const collection=document.querySelector(".collection");
    const container=document.createElement("div");
    container.classList.add("book");
    const overlay=document.createElement("div");
    overlay.classList.add("overlay");
    const del=document.createElement("button");
    del.classList.add("delete");
    const delImg=document.createElement("img");
    delImg.src="images/delete.svg";
    const edit=document.createElement("button");
    edit.classList.add("edit");
    const editImg=document.createElement("img");
    editImg.src="images/edit.svg";
    const image=document.createElement("img");
    image.src=(item.cover!=="")?item.cover:something;
    const outerBar=document.createElement("div");
    outerBar.classList.add("outer-bar");
    const innerBar=document.createElement("div");
    innerBar.classList.add("inner-bar");
    innerBar.style.width=(item.read==="false")? 
    `${(Number(item.pagesRead)*100)/Number(item.page)}%`: `100%`;

    del.appendChild(delImg);
    edit.appendChild(editImg);
    overlay.appendChild(del);
    overlay.appendChild(edit);
    outerBar.appendChild(innerBar);
    container.appendChild(overlay);
    container.appendChild(image);
    container.appendChild(outerBar);
    collection.appendChild(container);
}

const showInputDialog=document.querySelector(".add-button");
const closeInputDialog=document.querySelectorAll(".dialog-close")
const dialog=document.querySelector("#add-form");
const form=document.querySelectorAll("form");
const submit=document.getElementById("add-book");

showInputDialog.addEventListener("click",() =>{
    dialog.showModal();
});

closeInputDialog.forEach(button =>{
    button.addEventListener("click",()=>{
        dialog.close();
    });
});

dialog.addEventListener("close", () => {
    form.forEach(item => {
        item.reset();
    })
});

function toggle(){
    const pagesRead=document.getElementById("pages-read");
    if(readNo.checked){
        pagesRead.required=true;
    }
    else{
        pagesRead.required=false;
    }
}

const readYes=document.getElementById("read-yes");
const readNo=document.getElementById("read-no");

readYes.addEventListener("change",toggle);
readNo.addEventListener("change",toggle);

form.forEach(item =>{
    item.addEventListener("submit",(e)=>{
        e.preventDefault();
        const title= item.elements["title"].value;
        const author=item.elements["author"].value;
        const page=item.elements["page"].value;
        const cover=item.elements["cover"].value;
        const read=item.elements["read"].value;
        const pagesRead=item.elements["pages-read"].value;
        addBookToLibrary(new Book(title,author,page,cover,read,pagesRead));
        item.reset();
        dialog.close();
    });
});