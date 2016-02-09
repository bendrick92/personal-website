$(function(){
    window.VehicleCollection = Backbone.Collection.extend({
        model: Vehicle
        /*initialize: function(models, options){
            _.extend(this, _.pick(options, 'selectedIndex'));
        }*/
    });
    
    window.StorageZoneCollection = Backbone.Collection.extend({
        model: StorageZone
        /*initialize: function(models, options){
            _.extend(this, _.pick(options, 'selectedIndex'));
        }*/
    });
});