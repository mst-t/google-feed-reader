/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the Google Feed Reader application.
 */

/* We're placing all of our tests within the $() function,
 * in case some of tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    // Create mock-module and get the controller.
    var controller,
        $scope,
        getModule = function() {
            module('feedReaderApp');
            inject(function($rootScope, $controller) {
                $scope = $rootScope.$new();

                controller = $controller('FeedCtrl', {
                    $scope: $scope
                });
            });
        };

    describe('Google Feed Reader Testing', function() {

        // Create the module. It is created for each "describe" scope
        beforeEach(getModule);

        it('Mock controller is created', function() {
            expect(controller).toBeDefined();
        });

        /* Check if allFeeds variable has been defined.
         */
        describe('RSS Feeds data', function() {
            it('is defined', function() {
                expect(controller.allFeeds).toBeDefined();
            });
        });
        
        /* Check if the menu can be toggled by watching .
         * "menuHidden" It should be hidden by default, 
         * and be toggled by calling menuSlide function.
         */
        describe('The menu', function() {

            it('is hidden by default', function() {
                expect(controller.menuHidden).toBeTruthy();
            });

            it('is toggled by "menuSlide"', function() {
                controller.menuSlide();
                expect(controller.menuHidden).toBeFalsy();
                controller.menuSlide();
                expect(controller.menuHidden).toBeTruthy();
            });
        });

        /* Check if initial feeds can be loaded by calling "init".
         * It works asynchronously, so it is executed in beforeEach.
         * It must have at least a single entry, so "entries.length"
         * is checked.
         */
        describe('Initial entries', function() {
            beforeEach(function(done) {
                controller.init();
                // Wait for completing the "init" function and call "done".
                setTimeout(done, 1200);
            });

            it('are loaded by "init"', function() {
                expect(controller.entries.length).toBeGreaterThan(0);
            });
        });

        /* Check if new feeds are loaded by executing 
         * the asynchronous "getFeed". function.
         * It is supposed to use a call back, 
         * so you can call "done" there.
         * After getting feeds with different ids, 
         * 2 "entries" arrays are comapred by "toEqual".
         */
        describe('New feeds', function() {

            var feeds,
                newFeeds;

            beforeEach(function(done) {
                controller.getFeed(1, function() {
                    feeds = controller.entries;
                    done();
                });
            });

            beforeEach(function(done) {
                controller.getFeed(2, function() {
                    newFeeds = controller.entries;
                    done();
                });
            });

            it('are loaded by "getFeed"', function() {
                // Aren't both arrays empty?
                expect(feeds && newFeeds).toBeDefined();
                expect(feeds).not.toEqual(newFeeds);
            });
        });
    });
}());