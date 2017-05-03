'use strict';

/**
 * @ngdoc service
 * @name loadService
 * @description
 * Keeps the information of the feeds and loads its contents asynchronously.
 */
angular.module(appName)
    .service('loadService', function() {

        var self = this;
        var allFeeds = [
            {
                name: 'Udacity Blog',
                url: 'http://blog.udacity.com/feed'
            }, {
                name: 'CSS Tricks',
                url: 'http://feeds.feedburner.com/CssTricks'
            }, {
                name: 'HTML5 Rocks',
                url: 'http://feeds.feedburner.com/html5rocks'
            }, {
                name: 'Linear Digressions',
                url: 'http://feeds.feedburner.com/udacity-linear-digressions'
            }
        ];

        /**
         * Get all feeds data.
         * @returns {array} Default feeds
         */
        self.getAllFeeds = function() {
            return allFeeds;
        };

        /**
         * Load feeds depending on id using the Google Feed Reader API.
         * @param {number} id The id of feeds
         * @returns {Promise} Promise object containing feeds
         */
        self.loadFeed = function(id) {
            var feedUrl = allFeeds[id].url;

            return $.ajax({
                type: "POST",
                url: 'https://rsstojson.udacity.com/parseFeed',
                data: JSON.stringify({url: feedUrl}),
                contentType:"application/json"
            });
        };
    });