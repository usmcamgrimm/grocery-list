let grocery = {
    data: [],
    load: function () {
        if (localStorage.list == undefined) {
            localStorage.list = "[]";
        }

        // Parse JSON
        // [0] = Task
        // [1] = Status : 0 not done, 1 completed, 2 cancelled
        grocery.data = JSON.parse(localStorage.list);
        grocery.list();
    },

    save: function () {
        //Save list items to local storage
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
                row.classList.add("formList");
                row.dataset.id = key;

                //Item text
                e = document.createElement("div");
                e.classList.add("item");
                if (grocery.data[key][1] == 1) {
                    e.classList.add("done");
                }
                if (grocery.data[key][1] == 2) {
                    e.classList.add("done");
                }
                e.innerHTML = grocery.data[key][0];
                row.appendChild(e);

                //Cancel button
                e = document.createElement("input");
                e.setAttribute("type", "button");
                e.value = "\u2716";
                e.classList.add("delBtn");
                e.addEventListener("click", function () {
                    grocery.status(this, 2);
                });
                row.appendChild(e);

                //Completed button
                e = document.createElement("input");
                e.setAttribute("type", "button");
                e.value = "\u2714";
                e.classList.add("compBtn");
                e.addEventListener("click", function () {
                    grocery.status(this, 1);
                });
                row.appendChild(e);

                //Add row to list
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
        //Update item status
        let parent = e.parentElement;
        grocery.data[parent.dataset.id][1] = stat;
        grocery.save();
    },

    del: function (type) {
        //delete items from list
        if (confirm("Delete items?")) {
            //delete ALL
            if (type == 0) {
                grocery.data = [];
                grocery.save();
            }
            //delete all completed
            grocery.data = grocery.data.filter(row => row[1] == 0);
            grocery.save();
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
    document.getElementById("groceryForm").addEventListener("submit", function (task) {
        task.preventDefault();
        grocery.add();
    });
    grocery.load();
});