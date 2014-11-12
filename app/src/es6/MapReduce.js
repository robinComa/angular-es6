module.exports =  class MapReduce {

    constructor(data, map, reduce) {
        this.data = data;
        this.map = map;
        this.reduce = reduce;
    }

    sync(){
        return this.data.map(this.map).reduce(this.reduce);
    }

    async(){

        var data = this.data;
        var map = this.map;
        var reduce = this.reduce;

        return new Promise(function(resolveReduce) {
            var promises = data.map(function(value){
                return new Promise(function(resolveMap){
                    setTimeout(function(){
                        resolveMap(map(value));
                    }, 1);
                });
            });

            Promise.all(promises).then(function(values){
                resolveReduce(values.reduce(reduce));
            });
        });
    }

}