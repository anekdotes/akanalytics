/**
 * @file akanalytics.js - File that contain the main object akanalytics
 * @author Sébastien Roy
 */

"use strict";

/**
 * object that regroup all analytics method
 */
var akanalytics = {

  /**
   * method to create and set analytics view id
   * @param {integer} viewid - string of the view id
   * @return {Object} akanalytics - object
   */
  create: function(viewid, domain) {
    var a, m;
    window['GoogleAnalyticsObject'] = 'ga';
    window['ga'] = window['ga'] || function() {
      (window['ga'].q = window['ga'].q || []).push(arguments)
    }, window['ga'].l = 1 * new Date();
    a = document.createElement('script'), m = document.getElementsByTagName('script')[0];
    a.async = 1;
    a.src = 'https://www.google-analytics.com/analytics.js';
    m.parentNode.insertBefore(a, m);
    domain = domain || 'auto';
    ga('create', viewid, domain);
    return this;
  },

  /**
   * object that regroup eccomerce plugin method
   */
  ecommerce: {

    /**
     * method to activate Enhence Ecommerce plugin
     * @param {string} currency - string of the used currency ('CAD', 'USD')
     * @return {Object} akanalytics - object
     */
    create: function(currency) {
      ga('require', 'ec');
      ga('set', 'currencyCode', currency);
      return this.parent;
    },

    /**
     * method to send a checkout step
     * @param {integer} step - integer of the step
     */
    checkout: function(step) {
      ga('ec:setAction', 'checkout', {
        'step': step
      });
      this.parent.event('event');
    },

    /**
     * method to send a purchase
     * @param {Object} data object that contains transaction informations
     */
    purchase: function(data) {
      ga('ec:setAction', 'purchase', data);
      this.parent.event('event');
    }

  },

  /**
   * method to trigger an event
   * @param {Object} event object { hitType: 'event', eventCategory: '', eventAction: '', eventLabel: '', eventValue: 1 }
   */
  event: function(event) {
    this.send(event);
  },

  /**
   * shortcut method to send a page view
   */
  pageview: function() {
    this.send('pageview');
  },

  /**
   * main method to send data to analytics
   * @return {Object} analytics object
   */
  send: function(data) {
    ga('send', data);
    return this;
  },

  /**
   * method that add analytics.js to the page
   * @param {function} callback - if provided, function that is called when script is added
   */
  loadscript: function(callback) {
    callback = callback || function() {};
    var a, m;
    window['GoogleAnalyticsObject'] = 'ga';
    window['ga'] = window['ga'] || function() {
      (window['ga'].q = window['ga'].q || []).push(arguments)
    }, window['ga'].l = 1 * new Date();
    a = document.createElement('script'), m = document.getElementsByTagName('script')[0];
    a.async = 1;
    a.src = 'https://www.google-analytics.com/analytics.js';
    m.parentNode.insertBefore(a, m);
    callback();
  },

  /**
   * self destructive method to give parent to this object childs
   * @return {Object} analytics object
   */
  init: function() {
    this.ecommerce.parent = this;
    delete this.init;
    return this;
  }
}.init();
