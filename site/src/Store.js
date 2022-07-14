let store = {
    template: [],
    addToTemplate: function (obj) {
        this.template.push(obj);
    },
    getTemplate: function () {
        return this.template;
    },
};

export default store;