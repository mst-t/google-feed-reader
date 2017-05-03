'use strict';

/** 
 * Google API: Loads the Feed Reader API and defines what function
 * to call.
 */
google.load('feeds', '1');

/** 
 * This function starts this application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
google.setOnLoadCallback();