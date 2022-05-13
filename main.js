var total_item = 0;
var index = 0;
var todos = {};
var mode = 0;
var btn_list = [document.getElementById("one"), document.getElementById("two"), document.getElementById("three")];
var item_box = document.getElementById("todo-list");
var inp = document.getElementsByClassName("todo-app__input")[0];
inp.placeholder = "What needs to be done?";
inp.addEventListener("keydown", function(e) {
    if (e.code == "Enter" && inp.value.trim() !== "") {
        total_item += 1;
        index += 1;
        item_box.appendChild(new Item(inp.value.trim(), index).item_node); 
        inp.value = "";
        footer_control();
        show_clear_completed_btn();
        if (mode == 2) {
            show_completed();
        }
    }
});

class Item {
    constructor(todo, index) {
        // item
        this.li = document.createElement("li");
        this.li.classList.add("todo-app__item");
        this.li.setAttribute("idx", index);
        // left
        let check_box = document.createElement("div");
        check_box.classList.add("todo-app__checkbox");
        let inp = document.createElement("input");
        inp.id = index;
        inp.type = "checkbox";
        inp.addEventListener("click", function(e) {
            let count_screen = document.getElementsByClassName("todo-app__total");
            count_screen[0].innerHTML = `${count_left()} left`;
            if (e.target.checked) {
                e.target.parentNode.nextSibling.classList.add("done");
            } else {
                e.target.parentNode.nextSibling.classList.remove("done");
            }
            if (mode == 1) {
                show_active();
            } else if (mode == 2) {
                show_completed();
            }
            show_clear_completed_btn();
        });
        let lab = document.createElement("label");
        lab.setAttribute("for", index);
        check_box.appendChild(inp);
        check_box.appendChild(lab);
        // mid
        let item_detail = document.createElement("h1");
        item_detail.className = "todo-app__item-detail";
        item_detail.innerHTML = todo;
        // right
        let img = document.createElement("img");
        img.className = "todo-app__item-x";
        img.src = "./img/x.png";
        img.addEventListener("click", function(e) {
            let Pnode = e.target.parentNode;
            delete todos[`${Pnode.getAttribute("idx")}`];
            Pnode.remove();
            total_item -= 1;
            footer_control();
            show_clear_completed_btn();
        });
        // append
        this.li.appendChild(check_box);
        this.li.appendChild(item_detail);
        this.li.appendChild(img);
        // todos
        todos[`${index}`] = this.li;
    }

    get item_node() {
        return this.li;
    }
};

function footer_control() {
    let footer = document.getElementById("todo-footer");
    if (total_item) {
        footer.style.display = "flex";
    } else {
        footer.style.display = "none";
    }

    let count_screen = document.getElementsByClassName("todo-app__total");
    count_screen[0].innerHTML = `${count_left()} left`;
};

function count_left() {
    let left_item = 0;
    for ([key, value] of Object.entries(todos)) {    
        if (!value.firstChild.firstChild.checked) {
            left_item++;
        }
    }

    return left_item;
};

function show_all() {
    mode = 0;
    btn_highlight(mode);
    for ([key, value] of Object.entries(todos)) {     
        value.style.display = "flex";
    }
};

function show_active() {
    mode = 1;
    btn_highlight(mode);
    for ([key, value] of Object.entries(todos)) {  
        if (!value.firstChild.firstChild.checked) {
            value.style.display = "flex";
        } else {
            value.style.display = "none";
        }
    }
};

function show_completed() {
    mode = 2;
    btn_highlight(mode);
    for ([key, value] of Object.entries(todos)) {  
        if (value.firstChild.firstChild.checked) {
            value.style.display = "flex";
        } else {
            value.style.display = "none";
        }
    }
};

function clear_completed() {
    for ([key, value] of Object.entries(todos)) {  
        if (value.firstChild.firstChild.checked) {
            delete todos[`${value.getAttribute("idx")}`];
            value.remove();
            total_item -= 1;
        }
    }
    footer_control();
    show_clear_completed_btn();
};

function show_clear_completed_btn() {
    let clean = document.getElementById("clean");
    if (total_item == count_left()) {
        clean.style.visibility = "hidden";
    } else {
        clean.style.visibility = "visible";
    }
};

function btn_highlight(N) {
    for (i = 0; i <= 2; i++) {
        if (i == N) {
            btn_list[i].style.outline = "solid red"; 
        } else {
            btn_list[i].style.outline = "0px"; 
        }
    }
};

footer_control();
btn_highlight(mode);