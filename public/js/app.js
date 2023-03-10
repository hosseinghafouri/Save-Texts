//add an eventListener to the from
const form = document.querySelector('#itemForm'); // select form
const itemInput = document.querySelector('#itemInput'); // select input box from form
const itemList = document.querySelector('.item-list');
const feedback = document.querySelector('.feedback');
const clearButton = document.querySelector('#clear-list');

let todoItems = [];
let serverItems = [];
const handleItem = function (itemName) {

    const items = itemList.querySelectorAll('.item');

    items.forEach(function (item) {
        if (item.querySelector('.item-name').textContent === itemName) {
            //Golobal event listener
            item.querySelector('.golobal-item').addEventListener('click', function () {
                let text = item.firstChild.innerHTML;
                setItemListForServer(text);
            });
            //edit event listener
            item.querySelector('.edit-item').addEventListener('click', function () {
                itemInput.value = itemName;
                itemList.removeChild(item);

                todoItems = todoItems.filter(function (item) {
                    return item !== itemName;
                });
            });
            // delete event listener
            item.querySelector('.delete-item').addEventListener('click', function () {
                // debugger;

                console.log(item.firstChild.innerHTML);

                // todoItems = [];
                // getList(todoItems);
                // localStorage.removeItem(item);
                // itemList.removeChild(item);
                deleteItemListFromServer(item.firstChild.innerHTML);
                todoItems = todoItems.filter(function (item) {
                    return item !== itemName;
                });



                let localTodos = JSON.parse(localStorage.getItem("todoItems"));
                todosArray = localTodos;
                let localTodosIndex = localTodos.findIndex((index) => {
                    return index.id === item.id;
                });
                todosArray.splice(localTodosIndex, 1);
                setLocalStorage(todoItems);
                getList(todoItems);
                // showFeedback('item delete', 'success');
            })
        }
    })
}

itemInput.addEventListener("focus", () => {
    console.log(itemInput.value);
});

// const removeItem = function (item) {
//     const removeIndex = (todoItems.indexOf(item));
//     console.log(removeIndex);
//     todoItems.splice(removeIndex, 1);
// }



const getList = function (todoItems) {
    itemList.innerHTML = '';
    todoItems.forEach(function (item) {
        itemList.insertAdjacentHTML('beforeend', `<div class="item my-3"><h5 class="item-name">${item}</h5><div class="item-icons"><a href="#" class="golobal-item mx-2 item-icon" title="Edit Text"><i class="fa fa-globe" aria-hidden="true"></i></a><a href="#" class="edit-item mx-2 item-icon" title="Edit Text"><i class="far fa-edit"></i></a><a href="#" class="delete-item item-icon" title="Delete Text"><i class="far fa-times-circle"></i></a></div></div>`);
        handleItem(item);
    });
}

const getLocalStorage = function () {

    const todoStorage = localStorage.getItem('todoItems');
    if (todoStorage === 'undefined' || todoStorage === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        getList(todoItems);
    }
}

const setLocalStorage = function (todoItems) {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

let hostname = window.location.hostname;
let portocolName = window.location.protocol;

function setItemListForServer(text) {
    let body = {
        "text" : text
    }
    fetch(`${portocolName}//${hostname}/api/create`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        
    });
};

function getItemListFromServer() {
    fetch(`${portocolName}//${hostname}/api/list`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let todoItemsLocal = JSON.parse(localStorage.getItem("todoItems"));
            console.log(todoItemsLocal);
            if (todoItemsLocal === null) {
                todoItemsLocal = [];
            }
            data.texts.forEach((text) => {
                if (!todoItemsLocal.includes(text)) {
                    todoItemsLocal.push(text);
                }

            });
            localStorage.setItem('todoItems', JSON.stringify(todoItemsLocal));
            getLocalStorage();
        });
}

function golobalSet(txt) {

    apiBody = {
        text: txt
    }

    fetch(`${portocolName}//${hostname}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(apiBody)
    })
        .then(response => console.log(response))

};

function deleteItemListFromServer(text) {
    fetch(`${portocolName}//${hostname}/api/delete?t=${text}`, {
        method: "GET"
    })
    .then(res => console.log(res))
}
// get local storage from page

getItemListFromServer();

//add an item to the List, including to local storage
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const itemName = itemInput.value;

    if (itemName.length === 0) {
        feedback.innerHTML = 'Please Enter Valid Value';
        feedback.classList.add('showItem', 'alert-danger');
        setTimeout(
            function () {
                feedback.classList.remove('showItem');
            }, 3000);
    } else {
        todoItems.push(itemName);
        setLocalStorage(todoItems);
        getList(todoItems);
        //add event listeners to icons;
        //handleItem(itemName);
    }

    itemInput.value = '';

});

//clear all items from the list
clearButton.addEventListener('click', function () {
    todoItems = [];
    localStorage.clear();
    getList(todoItems);

})

