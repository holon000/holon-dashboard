// http://packery.metafizzy.co/packery.pkgd.js and 
// http://draggabilly.desandro.com/draggabilly.pkgd.js added as external resource

docReady( function() {
  var container = document.querySelector('#widgets.packery');
  var stampElem = document.querySelector('.stamp');
  var pckry = new Packery( container, {
    columnWidth: 24,
    rowHeight: 24,
    stamp: ".stamp"
  });

  var itemElems = pckry.getItemElements();
  for ( var i=0, len = itemElems.length; i < len; i++ ) {
    var elem = itemElems[i];
    if ( elem.classList.contains('draggable') ) {
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem , {handle: '.movehandle'});
      // bind Draggabilly events to Packery
      pckry.bindDraggabillyEvents( draggie );
    }
  }

  eventie.bind( container, 'click', function( event ) {
    // don't proceed if item was not clicked on or is supposed to be fixed size
    var target = event.target;
    if ( !classie.has( target, 'item') || !classie.has( target, 'morecontent')) {
      return;
    }

    // get stampElem window
    var isStamped = classie.has(target, 'stamped');
    if (isStamped) {
      pckry.unstamp(stampElem);
    } else {
      pckry.stamp(stampElem);
    }
    pckry.layout();
    $(target).toggleClass('stamped')

/*
    var isGigante = classie.has( target, 'gigante' );
    classie.toggleClass( target, 'gigante' );

    if ( isGigante ) {
      // if shrinking, just layout
      pckry.layout();
    } else {
      // if expanding, fit it
      pckry.fit( target );
    }
    */
    
  });
});




