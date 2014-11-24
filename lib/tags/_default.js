var tnd = require("./helpers/typeNameDescription"),
	matchTag = /^\s*@(\w+)/,
	distance = require("../distance"),
	_ = require('lodash');

	
	

	/**
	 * @constructor documentjs.tags._default @_default
	 * @tag documentation
	 * @parent documentjs.tags 
	 * @hide
	 * 
	 * The default tag behavior when `@TAG` begins a line, but no 
	 * tag is defined for `TAG`.
	 * 
	 * 
	 * 
	 * @signature `@TAG NAME`
	 * 
	 * Sets a `TAG` property on the docObject to `"NAME"`.
	 * 
	 * Example:
	 * @codestart javascript
     * /**
     *  * @@memberOf _
     *  *|
     *  findById: function( id, success ) {
	 *  @codeend
	 * 
	 * If multiple `@TAG NAME`s are found with the same `TAG`, an array with each
	 * `"NAME"` will be created. 
	 * 
	 * 
	 * @signature `@TAG`
	 * 
	 * Sets a `TAG` property on the docObject to `true`.
	 *  
	 * @body
	 * 
	 */
	module.exports = {

		add: function( line, curData, scope, objects, currentWrite, options ) {
			
			var tag = line.match(matchTag)[1].toLowerCase(),
				value =  line.replace(matchTag,"").trim();

			suggestType(options.tags, tag, this.line, this.src);
			
			if(value) {
				if( Array.isArray(this[tag]) ){
					this[tag].push(value);
				} else if( this[tag] && tag != "name"){
					this[tag] = [value];
				} else {
					this[tag] = value;
				}
			} else {
				this[tag] = true;
			}
			
		}
	};
	

function suggestType(tags, incorrect, line, src ) {
	var lowest = 1000,
		suggest = "",
		check = function( things ) {
			for ( var name in things ) {
				var dist = distance(incorrect.toLowerCase(), name.toLowerCase());
				if ( dist < lowest ) {
					lowest = dist;
					suggest = name.toLowerCase();
				}
			}
		};
		
	check(tags);

	if ( suggest ) {
		console.warn("\WARNING!!\nThere is no @" + incorrect + " tag. did you mean @" + suggest + " ?\n");
	}
};