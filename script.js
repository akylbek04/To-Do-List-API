const url = "https://649ab9c2bf7c145d02396134.mockapi.io/users";
const todoList = document.querySelector("#todo-list");
const addToDoInput = document.querySelector("#input")
const addToDoBtn = document.querySelector("#btn")

// option 1
// const fetchData = () => {
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             displayData(data)
//         })
//         .catch(err => console.log(err))
// }

//option 2
// const fetchData = async () => {
//     try{
//         const res = await fetch(url)
//         const data = await res.json()
//         displayData(data);
//     }
//     catch(err){
//         console.log(`Error occured -> ${err}`)
//     }
// }


// with AXIOS(promise-based library) -> 3rd party library to work with api. 


const fetchData = () => {
    axios
        .get(url)
        .then(res => {
            console.log(res.data);
            displayData(res.data)
        })
        .catch(function(err){
            console.log(err)
        })

}


fetchData();

function displayData(todos){

    todoList.innerHTML = '';

    todos.forEach((todo) => {
        const listItem = document.createElement("li");
        const inputEl = document.createElement("input");
        const listItemTxt = document.createElement("span");
        const listItemDelBtn = document.createElement("button");
        const listItemEditBtn = document.createElement("button");

        listItemDelBtn.innerText = "Delete";
        listItemEditBtn.innerText = "Edit";

        inputEl.type = "checkbox";


        //DELETE
        listItemDelBtn.addEventListener("click", (e) => {
            // console.log(`Succefully deleted ${todo.id}`);
            const deletedUrl = url + "/" + todo.id
            fetch(deletedUrl, {
                method: "DELETE",
                headers: {"Content-Type" : "application/json"}
            })
            .then(res => res.json())
            .then(data => {
                console.log("Data deleted successfully", data);
                fetchData();
            })
            .catch(err => console.log(err))
        
        });

        //UPDATE
        listItemEditBtn.addEventListener("click", (e) => {
            //static
            // listItemTxt.innerText = addToDoInput.value ;
            // if(listItemTxt.contentEditable = false){
            //     listItemTxt.contentEditable = true;
            // }
            // 

            //dynamic

            if(listItemEditBtn.innerText === "Done!"){
                listItemTxt.contentEditable = false;
                listItemEditBtn.innerText = "Edit"
                const editUrl = url +"/"+ todo.id;
    
    
                fetch(editUrl, {
                    method: "PUT",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify({
                        title: listItemTxt.innerText
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    fetchData();
                    addToDoInput.value = "";
                })
                .catch(err => console.log(err))

            } else {
                listItemEditBtn.innerText = "Done!"
                listItemTxt.contentEditable = true;
            }


        });


        inputEl.addEventListener("change", (e) => {
            if(todo.completed === false){
                todo.completed = true;
                listItemTxt.style.textDecorationLine = "line-through";
                console.log( todo.completed);
            } else {
                listItemTxt.style.textDecorationLine = "none";
                todo.completed = false;
                console.log( todo.completed);
            }
        });

        listItemTxt.innerText = todo.title;


        listItem.append(inputEl, listItemTxt, listItemEditBtn, listItemDelBtn);
        //or
        // listItem.appendChild(inputEl);
        // listItem.appendChild(listItemTxt);

        todoList.appendChild(listItem)
    });
};

addToDoBtn.addEventListener("click", (e) => {

    console.log(addToDoInput.value);
    
    const newTodo =  {
        title: addToDoInput.value,
        completed: false
    }
    
    fetch(url, {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(newTodo)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        fetchData();
        addToDoInput.value = "";
    })
    .catch(err => console.log(err))



})