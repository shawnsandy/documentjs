
/**
 * @constructor documentjs.tags.add @add 
 * @parent documentjs.tags
 * 
 * @description 
 * 
 * Sets a [documentjs/DocObject DocObject] as the 
 * current scope. [DocumentJS.tags.function Functions]
 * or [DocumentJS.tags.property properties] created
 * without a name will use their code block and
 * the scope to guess the name.
 * 
 * 
 * @signature `@add NAME`
 * 
 * @codestart
 * /** @@add lib.Component.prototype *|
 * lib.extend(lib.Component.prototype,{
 *   /**
 *    *  A plugin method on [lib.Component]
 *    *|
 *   plugin: function(){}
 * })
 * @codeend
 * 
 * @param {STRING} NAME the name of [documentjs/DocObject DocObject]
 * to set as the scope.
 * 
 * @body
 * 
 * 
 */
module.exports = {
	add: function(line, curData, scope, docMap){
		
		var name = line.match(/\s*@add\s*([^\s]+)/)[1]
		if(name){
			var docObject = docMap[name] ?
				docMap[name] :
				// add type so it can be hit by prototype and such
				docMap[name] = {name: name, type: "add"};
			
			return ["scope",docObject, docObject];
		}
	}
};