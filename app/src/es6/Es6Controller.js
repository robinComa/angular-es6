/**
 * Will be compiled into a function that can take the constructor parameters
 */
class Es6Controller {

    /**
     * Here you can use inject all the usual stuff, $http, $route...
     */
    constructor($scope, growl) {
        this.$scope = $scope;
        this.growl = growl;
    }

    /**
     * All methods located on the body of the class will also be available to the named controller
     */
    testDestructuring() {
        let {x, y} = {x:2, y:-5};
        this.growl.addInfoMessage(`x : ${x}`, {ttl: 3000});
        this.growl.addInfoMessage(`y : ${y}`, {ttl: 3000});
    }

    testDefaultValue(x, y=1, z=0) {
        this.growl.addInfoMessage(`x : ${x}`, {ttl: 3000});
        this.growl.addInfoMessage(`y : ${y}`, {ttl: 3000});
        this.growl.addInfoMessage(`z : ${z}`, {ttl: 3000});
    }
}