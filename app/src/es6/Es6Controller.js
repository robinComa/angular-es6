import MapReduce from './MapReduce';

module.exports =  class Es6Controller {

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
    testDefineBlockLocal() {
        if(true){
            let x = undefined;
            var y = 20;
        }
        this.growl.addSuccessMessage(`x : ${x}`, {ttl: 3000});
        this.growl.addSuccessMessage(`y : ${y}`, {ttl: 3000});
    }
    testDestructuring() {
        let {x, y} = {x:2, y:-5};
        this.growl.addSuccessMessage(`x : ${x}`, {ttl: 3000});
        this.growl.addSuccessMessage(`y : ${y}`, {ttl: 3000});
    }

    testDefaultValue(x, y=1, z=0) {
        this.growl.addSuccessMessage(`x : ${x}`, {ttl: 3000});
        this.growl.addSuccessMessage(`y : ${y}`, {ttl: 3000});
        this.growl.addSuccessMessage(`z : ${z}`, {ttl: 3000});
    }

    testInheritance(){
        class Animal {
            constructor(name) {
                this.name = name;
            }
            toString() {
                return `{Animal : ${this.name}}`;
            }
        }
        class Dog extends Animal {
            constructor(name) {
                super(name);
            }
            toString() {
                return `{Dog : ${this.name}}`;
            }
        }
        var animal = new Animal('An animal')
        var dog = new Dog('Bill');
        this.growl.addSuccessMessage(`animal : ${animal}`, {ttl: 3000});
        this.growl.addSuccessMessage(`dog : ${dog}`, {ttl: 3000});
    }

    testPromise(){
        var promise = new Promise(function(resolve, reject) {
            setTimeout(function(){
                resolve('Promise resolved!');
            }, 500);
        });

        promise.then(function(message){
            alert(message);
            this.growl.addSuccessMessage(`message : ${message}`, {ttl: 3000});
        });
    }

    testPromiseAll(){

        var map = function(text){
            var words = {};
            for (var word of text.split(' ')){
                if(!words[word]){
                    words[word] = 0;
                }
                words[word]++;
            }
            return words;
        };

        var reduce = function(context, value){
            for(var word in value){
                if(context[word]){
                    context[word] += value[word];
                }else{
                    context[word] = value[word];
                }
            }
            return context;
        };

        var mapReduce = new MapReduce([
            'toto tutu titi',
            'toto tata titi',
            'tete tutu titi'
        ], map, reduce);

        var result = mapReduce.sync();

        console.log(result);

        mapReduce.async().then(function(result){
            console.log(result);
        });

        //['toto tutu titi','toto tata titi','tete tutu titi'].stream().map(map).reduce(reduce);
        //['toto tutu titi','toto tata titi','tete tutu titi'].parallelStream().map(map).reduce(reduce);

    }
}