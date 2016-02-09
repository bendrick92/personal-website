$(function(){
	window.Vehicle = Backbone.Model.extend({
        defaults: {
            index: 0,
            year: 0,
            make: '',
            model: '',
            selected: false
        }
    });
    
    window.StorageZone = Backbone.Model.extend({
        defaults: {
            index: 0,
            a: 0,
            b: 0,
            c: 0,
            aspectRatio: 0,
            title: '',
            selected: false
        },
        c: function(){
            return Math.sqrt(Math.pow(this.get('a'), 2) + Math.pow(this.get('b'), 2));
        },
        aspectRatio: function(){
            return this.get('a')/this.get('b');
        }
    });
    
    window.Package = Backbone.Model.extend({
        defaults: {
            width: 0,
            length: 0,
            height: 0,
            aspectRatio: 0,
            title: '',
            willFit: false
        },
        aspectRatio: function(){
            return this.get('width')/this.get('length');
        }
    });
});