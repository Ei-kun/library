let myLibrary=[{id: '30d1baa1-bffe-4b71-b256-b8bf0d4c16f0', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', page: 208, read: 'false', pagesRead: 56, cover:"./images/gatsby.jpg"},
    {id: 'c02bc95b-db06-4daf-9f58-ededbe124b4b', title: 'Harry Potter', author: 'J.K. Rowling', page: 327, read: 'true', pagesRead: 327, cover:"./images/potter.jpg"},
    {id: '096f92b5-ecb8-444e-b515-e19fbc561b9f', title: 'Truly Madly Guilty', author: 'Liane Moriarty', page: 432, read: 'false', pagesRead: 218, cover:"./images/truly-madly.jpg"},
    {id: 'cfe31631-35b2-498b-b605-fadd2cc85349', title: 'Streetcar Named Desire', author: 'Tennessee Williams', page: 128, read: 'false', pagesRead: 91, cover:"./images/a-street-car.jpg"}
];

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
    updateStats(true,item);
    myLibrary.push(item);

    const collection=document.querySelector(".collection");
    const container=document.createElement("div");
    container.classList.add("book");
    container.id=item.id;
    const overlay=document.createElement("div");
    overlay.classList.add("overlay");
    const del=document.createElement("button");
    del.classList.add("delete");
    del.setAttribute("title","delete");
    const delImg=document.createElement("img");
    delImg.src="images/delete.svg";
    const checkBox=document.createElement("input");
    checkBox.classList.add("check");
    checkBox.setAttribute("title","Mark as complete");
    checkBox.setAttribute("type","checkbox");
    if(item.page === item.pagesRead){
        checkBox.disabled=true;
        checkBox.checked=true;
    }
    const image=document.createElement("img");
    image.src=(item.cover!=="")?item.cover:something;
    const outerBar=document.createElement("div");
    outerBar.classList.add("outer-bar");
    const innerBar=document.createElement("div");
    innerBar.classList.add("inner-bar");
    innerBar.style.width=(item.read==="false")? 
        `${(Number(item.pagesRead)*100)/Number(item.page)}%`: `100%`;

    del.appendChild(delImg);
    overlay.appendChild(del);
    overlay.appendChild(checkBox);
    outerBar.appendChild(innerBar);
    container.appendChild(overlay);
    container.appendChild(image);
    container.appendChild(outerBar);
    collection.appendChild(container);
}

function updateStats(add,item){
    const statsRead=document.querySelector(".stats-read");
    const statsAuthor=document.querySelector(".stats-author");
    const statsReading=document.querySelector(".stats-reading");
    if(add===true){
        if(item.pagesRead===item.page){
            statsRead.textContent=Number(statsRead.textContent)+1;
        }
        else{
            statsReading.textContent=Number(statsReading.textContent)+1;
        }
        if(!myLibrary.find(book => book.author===item.author)){
            statsAuthor.textContent=Number(statsAuthor.textContent)+1;
        }
    }
    else{
        if(item.pagesRead===item.page){
            statsRead.textContent=Number(statsRead.textContent)-1;
        }
        else{
            statsReading.textContent=Number(statsReading.textContent)-1;
        }
        if(!myLibrary.find(book => book.author===item.author && (book.id!==item.id))){
            statsAuthor.textContent=Number(statsAuthor.textContent)-1;
        }
    }
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
        const cover=(item.elements["cover"].value==="")?
            ("./images/book-cover.jpg"):(item.elements["cover"].value);
        const read=item.elements["read"].value;
        const pagesRead=item.elements["pages-read"].value;
        addBookToLibrary(new Book(title,author,page,cover,read,pagesRead));
        item.reset();
        dialog.close();
    });
});

const bookList=document.querySelector(".books");

bookList.addEventListener("click",(e) => {
    if(e.target.closest(".delete")){
        const id=e.target.closest(".book").id;
        const removedBook=myLibrary.find( book => book.id===id);
        updateStats(false,removedBook);
        myLibrary=myLibrary.filter(book => book.id!==id);
        e.target.closest(".book").remove();
    }
});

bookList.addEventListener("change", (e) =>{
    if(e.target.closest(".check")){
        const statsRead=document.querySelector(".stats-read");
        const statsReading=document.querySelector(".stats-reading");
        statsRead.textContent=Number(statsRead.textContent)+1;
        statsReading.textContent=Number(statsReading.textContent)-1;
        const book=e.target.closest(".book");
        const bookObject=myLibrary.find(item => item.id===book.id);
        bookObject.pagesRead=bookObject.page;
        const innerBar=book.querySelector(".inner-bar");
        innerBar.style.width="100%";
        e.target.disabled=true;
    }
});