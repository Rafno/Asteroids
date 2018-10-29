/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],
// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS
/**
 * Creates a new spatialID and increments it
 */
getNewSpatialID : function() {
    var id = this._nextSpatialID;
    this._nextSpatialID++;
    return id;
},
/**
 * places the entity into the entities array after upgrading it.
 * @param {object} entity 
 */
register: function(entity) {
    // var pos = entity.getPos(); <- Variable unneeded
    entity.radius = entity.getRadius();
    var spatialID = entity.getSpatialID();
   this._entities[spatialID] = entity;
},
/**
 * Deletes the entity at the SpatialID index.
 * @param {object} entity 
 */
unregister: function(entity) {
    var spatialID = entity.getSpatialID();
    delete this._entities[spatialID];
    
},
/**
 * Returns the nearest entity.
 * @param {int} posX 
 * @param {int} posY 
 * @param {int} radius 
 * @return {object} entity 
 */ 
findEntityInRange: function(posX, posY, radius) {
    let entityReturned = null;
    this._entities.forEach(entity => {
        if(util.square(entity.radius + radius) 
        > util.distSq(posX, posY,entity.cx, entity.cy)){
           entityReturned = entity;
        }
    });
    return entityReturned;
},
/**
 * Slightly rewrote this function for convenience
 */
render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.cx, e.cy, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}
