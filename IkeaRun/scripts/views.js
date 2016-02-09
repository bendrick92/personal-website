$(function() {
	window.VehicleView = Backbone.View.extend({
        tagName: 'option',
        model: Vehicle,
        render: function(){
            this.$el.attr('value', this.model.get('index'));
            this.$el.html(this.model.get('year') + ' ' + this.model.get('make') + ' ' + this.model.get('model'));
            return this;
        }
    });
    
    window.VehicleListView = Backbone.View.extend({
        model: VehicleCollection,
        events: {
            'change #vehicleList': 'changeOptionEvent'
        },
        changeOptionEvent: function(event){
            var optionIndex = event.target.value;
            for(var i=0; i<this.model.length; ++i){
                var vehicleIterator = this.model.at(i);
                if (vehicleIterator.get('index') == optionIndex){
                    vehicleIterator.set('selected', true);
                }
                else {
                    vehicleIterator.set('selected', false);
                }
            }
        },
        setSelectedOption: function(optionIndex){
            for(var i=0; i<this.model.length; ++i){
                var vehicleIterator = this.model.at(i);
                if (vehicleIterator.get('index') == optionIndex){
                    vehicleIterator.set('selected', true);
                }
                else {
                    vehicleIterator.set('selected', false);
                }
            }
            $('#vehicleList option[value="' + optionIndex + '"]').attr('selected', 'selected'); 
        },
        render: function(){
            //this.$el.html();
            //var self = this;
            for(var i=0; i<this.model.length; ++i){
                var m_VehicleView = new VehicleView({model: this.model.at(i)});
                $("#vehicleList").append(m_VehicleView.$el);
                m_VehicleView.render();
            }
            return this;
        }
    });
    
    window.StorageZoneView = Backbone.View.extend({
        tagName: 'option',
        model: StorageZone,
        render: function(){
            this.$el.attr('value', this.model.get('index'));
            this.$el.html(this.model.get('title'));
            return this;
        }
    });
    
    window.StorageZoneListView = Backbone.View.extend({
        model: StorageZoneCollection,
        events: {
            'change #storageZoneList': 'changeOptionEvent'
        },
        changeOptionEvent: function(event){
            var optionIndex = event.target.value;
            for(var i=0; i<this.model.length; ++i){
                var storageZoneIterator = this.model.at(i);
                if (storageZoneIterator.get('index') == optionIndex){
                    storageZoneIterator.set('selected', true);
                }
                else {
                    storageZoneIterator.set('selected', false);
                }
            }
        },
        setSelectedOption: function(optionIndex){
            for(var i=0; i<this.model.length; ++i){
                var storageZoneIterator = this.model.at(i);
                if (storageZoneIterator.get('index') == optionIndex){
                    storageZoneIterator.set('selected', true);
                }
                else {
                    storageZoneIterator.set('selected', false);
                }
            }
            $('#storageZoneList option[value="' + optionIndex + '"]').attr('selected', 'selected');
        },
        getSelectedStorageZone: function(){
            for(var i=0; i<this.model.length; ++i){
                var storageZoneIterator = this.model.at(i);
                if (storageZoneIterator.get('selected') == true){
                    return storageZoneIterator;
                }
            }
            return new StorageZone;
        },
        render: function(){
            for(var i=0; i<this.model.length; ++i){
                var m_StorageZoneView = new StorageZoneView({model: this.model.at(i)});
                $("#storageZoneList").append(m_StorageZoneView.$el);
                m_StorageZoneView.render();
            }
            return this;
        }
    });
    
    window.PackageView = Backbone.View.extend({
        model: Package,
        events: {
            'change #txtWidth': function(){
                this.changeModelWidth(this.$('#txtWidth').val());
                //this.changeDOMWidth(this.$('#txtWidth').val());
            },
            'change #txtLength': function(){
                this.changeModelLength(this.$('#txtLength').val());
                //this.changeDOMWidth(this.$('#txtLength').val());
            },
        },
        render: function(){
            this.$('#txtWidth').val(this.model.get('width'));
            this.$('#txtLength').val(this.model.get('length'));
            return this;
        },
        changeModelWidth: function(newWidth){
            this.model.set('width', newWidth);
        },
        changeModelLength: function(newLength){
            this.model.set('length', newLength);
        },
        changeDOMWidth: function(newWidth){
            this.$('#txtWidth').val(newWidth);
        },
        changeDOMLength: function(newLength){
            this.$('#txtLength').val(newLength);
        },
        clearTextFields: function(){
            this.model.set('width', 0);
            this.model.set('length', 0);
        },
        normalizeDimensions: function(){
            if (this.model.get('length') > this.model.get('width')){
                var tempWidth = this.model.get('width');
                var tempHeight = this.model.get('height');
                this.model.set('height', tempWidth);
                this.model.set('width', tempHeight);
            }
        },
        getPackage: function(){
            return this.model;
        }
    });
});