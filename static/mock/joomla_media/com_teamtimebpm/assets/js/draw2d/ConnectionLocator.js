/* This notice must be untouched at all times.

FreeGroup Draw2D 0.9.26
The latest version is available at
http://www.freegroup.de

Copyright (c) 2006 Andreas Herz. All rights reserved.
Created 5. 11. 2006 by Andreas Herz (Web: http://www.freegroup.de )

LICENSE: LGPL

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License (LGPL) as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA,
or see http://www.gnu.org/copyleft/lesser.html
*/

/**
 * @class Controls the location of an draw2d.Figure.
 *
 * @version 0.9.26
 * @author Andreas Herz
 * @constructor
 */
import draw2d from './_init_.js'
draw2d.ConnectionLocator=function(/* draw2d.Connection*/ connection)
{
  draw2d.Locator.call(this);
  this.connection = connection;
};

draw2d.ConnectionLocator.prototype = new  draw2d.Locator;
/** @private **/
draw2d.ConnectionLocator.prototype.type="draw2d.ConnectionLocator";


/**
 * Returns connection associated with draw2d.ConnectionLocator
 *
 * @type draw2d.Connection
 **/
draw2d.ConnectionLocator.prototype.getConnection=function()
{
   return this.connection;
};
