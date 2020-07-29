let grocery = {
    data: [],
    load: function () {
        //load list from local storage
        if (localStorage.list == undefined) {
            localStorage.list = "[]";
        }
        grocery.data = JSON.parse(localStorage.list);
        grocery.list();
    },

    save: function () {
        localStorage.list = JSON.stringify(grocery.data);
        grocery.list();
    },

    list: function () {
        let container = document.getElementById("groceries");
        container.innerHTML = "";

        if (grocery.data.length > 0) {
            let row = "",
                e = "";
            for (var key in grocery.data) {
                row = document.createElement("div");
                row.classList.add("list");
                row.dataset.id = key;

                e = document.createElement("div");
                e.classList.add("item");
                if (grocery.data[key][1] == 1) {
                    e.classList.add("done");
                }
                if (grocery.data[key][1] == 2) {
                    e.classList.add("cx");
                }
                e.innerHTML = grocery.data[key][0];
                row.appendChild(e);

                e = document.createElement("input");
                e.setAttribute("type", "button");
                e.value = "\u2716";
                e.classList.add("del");
                e.addEventListener("click", function () {
                    grocery.status(this, 1);
                });
                row.appendChild(e);

                e = document.createElement("input");
                e.setAttribute("type", "button");
                e.value = "\u2714";
                e.classList.add("comp");
                e.addEventListener("click", function () {
                    grocery.status(this, 1);
                });
                row.appendChild(e);

                container.appendChild(row);
            }
        }
    },

    add: function () {
        //Add a new item
        grocery.data.push([
            document.getElementById("groceryAdd").value, 0
        ]);
        document.getElementById("groceryAdd").value = "";
        grocery.save();
    },

    status: function (e, stat) {
        let parent = e.parentElement;
        grocery.data[parent.dataset.id][1] = stat;
        grocery.save();
    },

    del: function (type) {
        if (confirm("Clear List?")) {
            //delete all items
            if (type == 0) {
                grocery.data = [];
                grocery.save();
            } else {
                grocery.data = grocery.data.filter(row => row[1] == 0);
                grocery.save();
            }
        }
    }
};

window.addEventListener("load", function () {
    document.getElementById("clearList").addEventListener("click", function () {
        grocery.del(0);
    });
    document.getElementById("clearChecked").addEventListener("click", function () {
        grocery.del(1);
    });
    document.getElementById("groceryForm").addEventListener("submit", function (evt) {
        evt.preventDefault();
        grocery.add();
    });
    grocery.load();
})