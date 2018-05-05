// Copyright 2013-2017, University of Colorado Boulder

/**
 * Panel of controls at the top left of the sim. It contains controls for flipping the magnet and the reset all button.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Steele Dalton (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var exampleSim = require( 'EXAMPLE_SIM/exampleSim' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // added modules
  var Vector2 = require( 'DOT/Vector2' );

  //indexes the current dummy magnet the "add bar magnet" button is on
  var index = 0;

  // strings

  var flipPolarityString = require( 'string!EXAMPLE_SIM/flipPolarity' );
  var moveBarMagnetString = require( 'string!EXAMPLE_SIM/moveBarMagnet' );
  var addBarMagnetString = require( 'string!EXAMPLE_SIM/addBarMagnet' );
  /**
   * @param {ExampleModel} model - the model for the entire screen
   * @param {Object} [options] - scenery options for rendering the control panel, see the constructor for options
   * @constructor
   */
  function ControlPanel( model, options ) {

    // Demonstrate a common pattern for specifying options and providing default values
    options = _.extend( {
        xMargin: 10,
        yMargin: 10,
        stroke: 'orange',
        lineWidth: 3
      }, options );

    // 'Flip Polarity' button
    var flipButton = new TextPushButton( flipPolarityString, {
      font: new PhetFont( 16 ),
      baseColor: 'yellow',
      xMargin: 10,
      listener: function() {
        var orientation = model.barMagnet.orientationProperty.get() + Math.PI;
        model.barMagnet.orientationProperty.set( orientation );
      }
    } );

    // 'Move Bar Magnet' button
    var moveBarMagnetButton = new TextPushButton( moveBarMagnetString, {
      font: new PhetFont( 16 ),
      baseColor: 'yellow',
      xMargin: 10,
      listener: function() {
        model.barMagnet.locationProperty.set( new Vector2( Math.random() * 768 - 384, Math.random() * 504 - 252 ) ) ;
      }
    } );

    index = 0;
    // 'Add Bar Magnet' button
    var addBarMagnetButton = new TextPushButton( addBarMagnetString, {
      font: new PhetFont( 16 ),
      baseColor: 'yellow',
      xMargin: 10,
      listener: function() {

        if( index < 100 ){
          var magnetBar = model.magnetArray[index];
          magnetBar.locationProperty.set( new Vector2( Math.random() * 768 - 384, Math.random() * 504 - 252 ) ) ;
          index++;
        }

      }
    } );

    // 'Reset All' button, resets the sim to its initial state
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        index = 0;
        model.reset();
      }
    } );

    // The contents of the control panel
    var content = new VBox( {
      align: 'center',
      spacing: 10,
      children: [
        flipButton,
        moveBarMagnetButton,
        addBarMagnetButton,
        resetAllButton
      ]
    } );

    Panel.call( this, content, options );
  }

  exampleSim.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel );
} );
