'use strict';

var ctrlName = 'FeedCtrl';

/**
 * @ngdoc object
 * @name FeedCtrl
 * @description
 * This is the main controller of this application.
 * It processes the menu slide and displays the loaded feed.
 */
angular.module(appName)
    .controller(ctrlName, ['loadService', '$scope', function(load, $scope) {

        var self = this;

        self.allFeeds = load.getAllFeeds();
        self.entries = [];
        self.title = '';
        self.menuHidden = true;

        /**
         * Toggle menuHidden(boolean) to open or close the menu bar.
         */
        self.menuSlide = function(){
            self.menuHidden = !self.menuHidden;
        };

        /**
         * Update feeds by clicking a title in the menu bar.
         *     Then hide the menu bar.
         * @param {number} id The id of feeds
         */
        self.displayFeed = function(id){
            self.getFeed(id);
            self.menuSlide();
        };

        /**
         * Update feeds.
         * @param {number} id The id of feeds
         * @param {function} cb The call back function. 
         *     It is called when "loadFeed" completes.
         */
        self.getFeed = function(id, cb) {
            var feedName = self.allFeeds[id].name;

            load.loadFeed(id).done(function(result) {
                self.entries = result.feed.entries;
                self.title = feedName;
            }).fail(function(result) {
                console.log("async fail")
            }).always(function(result) {
                if(cb) {
                    cb();
                }
                // For updating DOM
                $scope.$apply();
            });
        };

        /**
         * Initialize the feeds on the webpage
         */
        self.init = function(){
            self.getFeed(0);
        };

        self.init();
    }]);