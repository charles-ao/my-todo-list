const month =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']
const date = new Date();
const id = ''

let editElementValue;
let editFlag = false;
let editID ='';

const addBtn = document.querySelector('.add-btn');
const form = document.querySelector('form')
const welcomeInfo = document.querySelector('.welcome-info');
const note = document.getElementById("note");
const noteList = document.querySelector('.notes-list')
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.notes-container');
const alert = document.querySelector('.alert');
const clearBtn = document.querySelector('.clear-btn')

addBtn.addEventListener('click', loadForm);
submitBtn.addEventListener('click', submit);
clearBtn.addEventListener('click', clearAll)

function loadForm () {
    form.classList.add('show-form')
    welcomeInfo.classList.add('hide-info')
    submitBtn.textContent = 'submit';
}

function unLoadForm () {
    form.classList.remove('show-form')
}

function submit(e) {
    e.preventDefault();
    const value = note.value;
    const id = date.getTime().toString();

    if (value  && editFlag === false) {
        const element = document.createElement('article');
        element.classList.add('note-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `
            <div class="panel">
                <p class="note-title"><i class="ico far fa-dot-circle"></i>  ${value}</p>
                <div class="btn-container">
                    <button type="button" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            `
        noteList.appendChild(element);

        container.classList.add('show-container');

        const deleteBtn = element.querySelector('.delete-btn')
        deleteBtn.addEventListener('click', deleteItem)
        const editBtn = element.querySelector('.edit-btn')
        editBtn.addEventListener('click', editItem)

        displayAlert('Successfully Added', 'success');

        returnToDefault();

        unLoadForm();
    }

    else if (value && editFlag === true) {
         editElementValue.innerHTML = value
        
        displayAlert('Edited', 'success');

        returnToDefault();

        unLoadForm();
    } 
    
    else {
        displayAlert('Please fill up all Inputs', 'danger');

        returnToDefault();
    }
}

function displayAlert(text, param) {
    alert.textContent = text;
    alert.classList.add(`alert-${param}`);

    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${param}`);
    }, 1000)
}


function clearAll() {
    const items = document.querySelectorAll('.note-item')
    if (items.length > 0) {
        items.forEach( item => {
            noteList.removeChild(item)
        })
    }
    welcomeInfo.classList.remove('hide-info')
    container.classList.remove('show-container');
}

function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement.parentElement
    noteList.removeChild(element);
    displayAlert('Item Removed', 'danger');

    if (noteList.children.length === 0){
        welcomeInfo.classList.remove('hide-info')
        container.classList.remove('show-container');
    }

    returnToDefault();
}

function editItem(e) {
    submitBtn.textContent = 'Edit';
    form.classList.add('show-form')


    editElementValue = e.currentTarget.parentElement.previousElementSibling;
    note.value =  editElementValue.textContent
    editFlag = true

    editID = e.currentTarget.parentElement.parentElement.parentElement.dataset.id
}


function returnToDefault() {
    note.value = ''
    editFlag = false;
    editID = ""
}
