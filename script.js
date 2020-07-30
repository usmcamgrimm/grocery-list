let grocery = {
    data: [],
    load: function () {
        if (localStorage.list == undefined) {
            localStorgae.list = "[]";
        }

        // Parse JSON
        // [0] = Task
        // [1] = Status : 0 not done, 1 completed, 2 cancelled
        grocery.data = JSON.parse(localStorage.list);
        grocery.list();
    },
    
    list: function() {
        let container = document.getElementById("groceries");
        container.innerHTML = "";

        if (grocery.data.length > 0) {
            let row = "", e ="";
            for (var key in grocery.data) {
                row = document.createElement("div");
                row.classList.add("formList");
                row.dataset.id = key;

                //Item text
            }
        }
    }
}