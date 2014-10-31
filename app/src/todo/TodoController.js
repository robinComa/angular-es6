/**
 * Will be compiled into a function that can take the constructor parameters
 */
class TodoController {

    /**
     * Here you can use inject all the usual stuff, $http, $route...
     */
    constructor($scope, growl) {
        this.$scope = $scope;
        this.growl = growl;

        // Everything living on 'this' will be available to the templates as 'main'
        this.newTodo = '';
        this.items = [new TodoItem('This is a demo todo.', true)];
    }

    /**
     * All methods located on the body of the class will also be available to the named controller
     */
    addTodo() {
        // notice `Template String` syntax
        this.growl.addInfoMessage(`${this.newTodo}...added`, {ttl: 3000});
        this.items.push(new TodoItem(this.newTodo, false));
        this.newTodo = '';
    }

    removeTodo(index) {
        let anItem = this.items.splice(index, 1);
        this.growl.addWarnMessage(`${anItem[0].text}...removed`, {ttl: 3000});
    }

    clearAll() {
        this.items = [];
        this.growl.addErrorMessage('All Clear', {ttl: 3000});
    }
}