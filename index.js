'use strict'
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` }  

module.exports = function xin(d) {

	const path = require('path'),
 fs = require('fs')	
	let logFile = fs.createWriteStream('teraxin-log.log', {
		flags: 'a'
	});
}