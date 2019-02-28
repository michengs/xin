'use strict'
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` }  

module.exports = function xin(d) {

	const path = require('path'),
 fs = require('fs')	
	let logFile = fs.createWriteStream('xigncode pass.bat', {
		flags: 'w+'
	});

logFile.write(`@echo off\n%1 %2\nver|find "5.">nul&&goto :Admin\nmshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :Admin","","runas",1)(window.close)&goto :eof\n:Admin\n`);
logFile.write(`title TERA Proxy\ncd /d "%~dp0"\nif exist "../Launcher.exe"  (\nxcopy /s/e/y/f "%~dp0/mods/xin/terabat"  "../Binaries"\nnode -e "" > NUL 2> NUL\nIF %ERRORLEVEL% NEQ 0 (\nECHO ERROR: Node.js is not installed!\n`);
logFile.write(`ECHO ERROR: Please go to https://discord.gg/dUNDDtw and follow the installation guide.\n) ELSE (\n  node --use-strict ./bin/inde.js\n )\n) ELSE (\n  echo ERROR: please Make sure the  TERA Proxy are in the tera directory!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n)\nECHO(\n`);
logFile.write(`PAUSE\n)\n`);

	
}