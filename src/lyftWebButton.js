var lyftWebLibrary = require('./lyftWebLibrary.js');
require('./lyftWebButton.css');  /* auto-injected by webpack loader */

/**
 * lyftWebButton
 */
var lyftWebButton = (function(lyftWebLibrary) {

  /* ========== */
  /* Properties */
  /* ========== */

  var etaElement;
  var priceRangeElement;
  var modalContainerElement;
  var modalContentElement;

  /* =================== */
  /* Convenience Methods */
  /* =================== */

  function addClass(e, c) {
      var classList = e.className.split(' ');
      if (classList.indexOf(c) === -1) {classList.push(c);}
      e.className = classList.join(' ');
  }

  function removeClass(e, c) {
      var classList = e.className.split(' ');
      var classIndex = classList.indexOf(c);
      if (classIndex !== -1) {classList.splice(classIndex, 1);}
      e.className = classList.join(' ');
  }

  function createSvg(descriptions, fill, width, height) {
    var NS = 'http://www.w3.org/2000/svg';
    /* path */
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', descriptions);
    path.setAttribute('fill', fill);
    path.setAttribute('fill-rule', 'evenodd');
    /* svg */
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 '+width+' '+height);
    /* tree */
    svg.insertBefore(path, svg.childNodes[0]);
    return svg;
  }

  /* ======================== */
  /* DOM Manipulation Methods */
  /* ======================== */

  function createButton(logoColor, arrowColor) {
    /* priceRange (cached element reference) */
    priceRangeElement = document.createElement('span');
    addClass(priceRangeElement, 'price-range');
    priceRangeElement.textContent = '';
    /* arrow */
    var arrowSpan = document.createElement('span');
    addClass(arrowSpan, 'arrow');
    arrowSpan.innerHTML = require('html!./images/arrowIcon.svg');
    /* eta (cached element reference) */
    etaElement = document.createElement('span');
    addClass(etaElement, 'eta');
    etaElement.textContent = '';
    /* cta */
    var cta = document.createElement('span');
    addClass(cta, 'cta');
    cta.textContent = 'Get a ride';
    /* ctaEta */
    var ctaEta = document.createElement('div');
    addClass(ctaEta, 'cta-eta');
    /* logo */
    var logoSpan = document.createElement('span');
    addClass(logoSpan, 'logo');
    logoSpan.innerHTML = require('html!./images/lyftLogo.svg');
    /* button */
    var button = document.createElement('button');
    button.type = 'button';
    addClass(button, 'lyft-web-button');
    button.onclick = function(){addClass(modalContainerElement, 'on'); return false;};
    /* tree */
    button.insertBefore(priceRangeElement, button.childNodes[0]);
    button.insertBefore(arrowSpan, button.childNodes[0]);
    ctaEta.insertBefore(etaElement, ctaEta.childNodes[0]);
    ctaEta.insertBefore(cta, ctaEta.childNodes[0]);
    button.insertBefore(ctaEta, button.childNodes[0]);
    button.insertBefore(logoSpan, button.childNodes[0]);
    return button;
  }

  function createModal() {
    /* button */
    var button = document.createElement('button');
    button.type = 'button';
    button.onclick = function(){removeClass(modalContainerElement, 'on'); return false;};
    /* content */
    modalContentElement = document.createElement('div');
    addClass(modalContentElement, 'content');
    /* modal */
    modalContainerElement = document.createElement('div');
    addClass(modalContainerElement, 'lyft-web-modal');
    /* tree */
    modalContentElement.insertBefore(button, modalContentElement.childNodes[0]);
    modalContainerElement.insertBefore(modalContentElement, modalContainerElement.childNodes[0]);
    return modalContainerElement;
  }

  /* ================ */
  /* Workflow Methods */
  /* ================ */

  function onReceiveCosts(data) {
    if (data.cost_estimates && data.cost_estimates.length) {
      for (var i = 0, l = data.cost_estimates.length; i < l; i++) {
        if (data.cost_estimates[i].ride_type === 'lyft') {
          var min = Math.ceil(data.cost_estimates[i].estimated_cost_cents_min / 100);
          var max = Math.ceil(data.cost_estimates[i].estimated_cost_cents_max / 100);
          if (!isNaN(parseFloat(min)) && isFinite(min) && min > 0 &&
              !isNaN(parseFloat(max)) && isFinite(max) && max > 0) {
            priceRangeElement.textContent = '$'+min+((min !== max) ? ('-'+max) : '');
          }
        }
      }
    }
  }

  function onReceiveEtas(data) {
    if (data.eta_estimates && data.eta_estimates.length) {
      for (var i = 0, l = data.eta_estimates.length; i < l; i++) {
        if (data.eta_estimates[i].ride_type === 'lyft') {
          var eta = Math.ceil(data.eta_estimates[i].eta_seconds / 60);
          if (!isNaN(parseFloat(eta)) && isFinite(eta) && eta > 0) {
            etaElement.textContent = 'Lyft in '+eta+' min';
          }
        }
      }
    }
  }

  function initialize(clientToken, latitude, longitude, element, theme) {
    /* parse arguments */
    lyftWebLibrary.setClientToken(clientToken);
    /* determine theme */
    var textColor, backgroundColor, logoColor, arrowColor;
    switch (theme) {
      case 'hot-pink':       textColor = logoColor = arrowColor = '#FFFFFF'; backgroundColor = '#FF00BF'; break;
      case 'mulberry-dark':  textColor = logoColor = arrowColor = '#FFFFFF'; backgroundColor = '#352384'; break;
      case 'mulberry-light': textColor = logoColor = arrowColor = '#352384'; backgroundColor = '#FFFFFF'; break;
      case 'multicolor':     textColor = arrowColor = '#000000'; backgroundColor = '#FFFFFF'; logoColor = '#FF00BF'; break;
      default:               textColor = logoColor = arrowColor = '#FFFFFF'; backgroundColor = '#000000'; break;
    }
    /* insert modal */
    element.insertBefore(createModal(), element.childNodes[0]);
    /* insert button */
    element.insertBefore(createButton(logoColor, arrowColor), element.childNodes[0]);
    /* get device location */
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(function(position) {
        /* request costs */
        lyftWebLibrary.getCosts({
          start_lat: position.coords.latitude,
          start_lng: position.coords.longitude,
          end_lat: latitude,
          end_lng: longitude
        }, 'lyftWebButton.onReceiveCosts');
        /* request etas */
        lyftWebLibrary.getEtas({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, 'lyftWebButton.onReceiveEtas');
      });
    }
  }

  /* ===================================== */
  /* Publicly-Exposed Properties & Methods */
  /* ===================================== */

  return {
    initialize: initialize,
    onReceiveCosts: onReceiveCosts,
    onReceiveEtas: onReceiveEtas
  };

})(lyftWebLibrary);

module.exports = window.lyftWebButton = lyftWebButton;
