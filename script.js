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


}