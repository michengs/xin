'use strict'
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` }  
module.exports = function xin(mod) {
const command = mod.command || mod.require;	
	const path = require('path'),
 fs = require('fs')	
	let logFile = fs.createWriteStream('xigncode pass test.bat', {
		flags: 'w+'
	});
	
	
	
	let ff= '\\'
if (mod.proxyAuthor !== 'caali') {
	
logFile.write(`@echo off\n%1 %2\nver|find "5.">nul&&goto :Admin\nmshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :Admin","","runas",1)(window.close)&goto :eof\n:Admin\n`);
logFile.write(`title pinkiepie's TERA Proxy\ncd /d "%~dp0"\nif exist "../Launcher.exe"  (\n`);
logFile.write(`if exist ./mods/Fly-More-master/module.json  (\ndel "%~dp0${ff}mods${ff}Fly-More-master${ff}module.json"\ndel "%~dp0${ff}mods${ff}Fly-More-master${ff}manifest.json"\n)\n`);
logFile.write(`xcopy /s/e/y/f "./mods/xin/terabat"  "../Binaries"\nnode -e "" 2> NUL\nif %errorlevel% NEQ 0 (\necho Node.JS not found.\necho Please install the latest Current from https://nodejs.org/\n`);
logFile.write(`pause\nexit\n)\nif not exist ./settings/_tera-proxy_.json (\nnode --use-strict bin/xig.js\ncls\n)\nnode --use-strict bin/cli/xig.js\n) ELSE (\n  echo ERROR: please Make sure the pinkiepie's TERA Proxy are in the tera directory!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n)\n`);
logFile.write(`PAUSE\n`);
fs.open('xigncode pass.bat',function(err,fd){  
	if(!err) { 
fs.unlink('xigncode pass.bat', function (err) {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('删除文件成功');
})
}
})
  fs.open('bin/xig.js',function(err,fd){  
	if(err) { 
    console.log('写入xigncode启动script')
    console.log('稍后请重启pro')	
 	let File1 = fs.createWriteStream('bin/cli/xig.js', {
		flags: 'w+'
	});
 
 	let File2 = fs.createWriteStream('bin/xig.js', {
		flags: 'w+'
	}); 
File1.write(`require('../../mods/xin/xig')();\nrequire("./index");\n `);
File2.write(`require('../mods/xin/xig')();\nrequire("./genmanifest");\n `);
}
})
	}else{		
logFile.write(`@echo off\n%1 %2\nver|find "5.">nul&&goto :Admin\nmshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :Admin","","runas",1)(window.close)&goto :eof\n:Admin\n`);
logFile.write(`title caali'sTERA Proxy\ncd /d "%~dp0"\nif exist "../Launcher.exe"  (\n`);
logFile.write(`if exist ./mods/Fly-More-master/module.json  (\ndel "%~dp0${ff}mods${ff}Fly-More-master${ff}module.json"\ndel "%~dp0${ff}mods${ff}Fly-More-master${ff}manifest.json"\n)\n`);
logFile.write(`xcopy /s/e/y/f "%~dp0/mods/xin/terabat"  "../Binaries"\nnode -e "" > NUL 2> NUL\nIF %ERRORLEVEL% NEQ 0 (\nECHO ERROR: Node.js is not installed!\n`);
logFile.write(`ECHO ERROR: Please go to https://discord.gg/dUNDDtw and follow the installation guide.\n) ELSE (\n  node --use-strict bin/xig\n )\n) ELSE (\n  echo ERROR: please Make sure the caali's TERA Proxy are in the tera directory!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n)\nECHO(\n`);
logFile.write(`PAUSE\n)\n`);
  fs.open('bin/xig.js',function(err,fd){  
	if(err) { 
    console.log('写入xigncode启动script')
    console.log('稍后请重启pro')	
 	let File1 = fs.createWriteStream('bin/xig.js', {
		flags: 'w+'
	});
 
File1.write(`require('../mods/xin/xig')();\nrequire("./index-cli"); \n `);
}
})
	}
}
 