# AK Analytics

Javascript library that give more ease at managing Google Analytics with Enhence ECommerce plugin.

## Installation

Just put the `src/akanalytics.js` in your project and link it to your web pages.
```
<script type="text/javascript" src="./akanalytics.js"></script>
```

## Usage

The object `akanalytics` is self initiated so you can start using it right away.

### Standard Analytics

#### Creation

To create and setup the analytics script you must first run the create method :
```
akanalytics.create('view-id', 'domain.ext');
```
That will link the analytics.js to your page and initiate it with your view id and associated domain.

#### Page View

Once created, you now can send a pageview :
```
akanalytics.pageview();
```
That will trigger a page view in analytics.

#### Event

To send an event :
```
akanalytics.event({
  hitType: 'event',
  eventCategory: 'event-category',
  eventAction: 'event-action',
  eventLabel: 'event-label',
  eventValue: value
});
```

### Enhence Ecommerce Plugin

#### Creation

To create and setup analytics enhence ecommerce plugin you must first run the create method :
```
akanalytics.ecommerce.create('currency');
```
Currency parameter must be a valid currency code string ('CAD', 'USD').

#### Checkout process

To trigger a step in the checkout process you must run the checkout method :
```
akanalytics.ecommerce.checkout(step);
```
Step parameter must be an integer according to the analytics step.

#### Purchase

To send a purchase un must run the purchase method :
```
akanalytics.ecommerce.purchase({
  id: 'order-number',
  affiliation: 'name-of-the-store',
  revenue: order-total,
  tax: order-taxes,
  shipping: order-shipping
});
```

### Tips and trics

Almost all function are chainable like so :
```
akanalytics.create('view-id', 'domain.ext').pageview();

akanalytics.create('view-id', 'domain.ext')
  .ecommerce.create('CAD')
  .checkout(1)
  .pageview();

akanalytics.create('view-id', 'domain.ext')
  .event({
    hitType: 'event',
    eventCategory: 'event-category',
    eventAction: 'event-action',
    eventLabel: 'event-label',
    eventValue: value
  })
  .pageview();
```









