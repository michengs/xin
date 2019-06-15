'use strict'
String.prototype.clr = function (hexColor) { return `<font color="#${hexColor}">${this}</font>` }  
const Last_Hook = { order: 100010 }, Last_Hookfn = { order: 100010, filter: { fake: null } }
module.exports = function xin(mod) {
const command = mod.command || mod.require;	
	const path = require('path'),
 fs = require('fs')	
	let logFile = fs.createWriteStream('tera-proxy-xigncode pass.bat', {
		flags: 'w+'
	});
	/*
  let hidden = false
  let visibleRange = 2500
  mod.hook('C_SET_VISIBLE_RANGE', 1, event => visibleRange = event.range)
  mod.hook('S_SPAWN_USER', 14, () => { if (hidden) return false })
  mod.hook('C_USE_ITEM', 1, (event) => {
		if(event.item == 6550) {
     refreshNearbyPlayers()
	 hidden = !hidden
			return false;};
	});
  function refreshNearbyPlayers() {
    mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: 1 })
    setTimeout(() => {
      mod.toServer('C_SET_VISIBLE_RANGE', 1, { range: visibleRange })
    }, 1000)
  }
  */
  //--------------------------------------------------------------------------------------------------------------------------------------
  let   SUsers = {},
        MyGameId, 
		HUsers = {};
  let hidde = false;
	mod.hook('S_LOGIN', 13, sLogin)  
 	mod.hook('S_LOAD_TOPO', 'raw', sLoadTopo)
	mod.hook('S_SPAWN_USER', 14, Last_Hook, sSpawnUser)
	mod.hook('S_USER_LOCATION', 5, sUserLocation)	
	mod.hook('S_DEAD_LOCATION', 2, sDeadLocation)	
	mod.hook('S_DESPAWN_USER', 3, Last_Hook, sDespawnUser)
	mod.hook('S_USER_STATUS', 3, sUserStatus)
	mod.hook('S_DEAD_LOCATION', 2, sDeadLocation)	
	mod.hook('S_UNMOUNT_VEHICLE', 2, sUnmountVehicle)	
	mod.hook('S_MOUNT_VEHICLE', 2, sMountVehicle)	
	function sLoadTopo() {
		SUsers = {};
		HUsers = {};
	}
	function sSpawnUser(event) {
		SUsers[event.gameId] = event;
		SUsers[event.gameId].spawnFx = 1;
		if (hidde) {
			HUsers[event.gameId] = event;
			HUsers[event.gameId].spawnFx = 1;
			return false;
		}
	}	
	command.add(['1'], ( )=> {
	 hidde = !hidde
	 if(hidde) {
	 HideAllPlayers()
	 }
	 if(!hidde) {
      ShowAllPlayers()
	 }	
	 }); 	
	mod.hook('C_USE_ITEM', 3, event => {
		if(event.id == 6560) {
	 hidde = !hidde
	 if(hidde) {
	 HideAllPlayers()
	 }
	 if(!hidde) {
      ShowAllPlayers()
	 }
			return false;
		}
	});	
	function ShowAllPlayers() {
		for (let i in HUsers) {
			mod.toClient('S_SPAWN_USER', 14, HUsers[i]);
			delete HUsers[i];
		}
	}
	function HideAllPlayers() {

			for (let i in SUsers) {
				mod.toClient('S_DESPAWN_USER', 3, { gameId: SUsers[i].gameId, type: 1 });
				HUsers[SUsers[i].gameId] = SUsers[i];
				HUsers[SUsers[i].gameId].spawnFx = 1;
			}
		
	}
	function sMountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = event.id;
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = event.id;
	}	
	function sUnmountVehicle(event) {
		if (EqGid(event.gameId)) return;
		SUsers[event.gameId].mount = 0;
		if (HUsers[event.gameId]) HUsers[event.gameId].mount = 0;
	}	
	function sUserLocation(event) {
		if (SUsers[event.gameId]) {
			SUsers[event.gameId].loc = event.dest;
			SUsers[event.gameId].w = event.w;
		}
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].loc = event.dest;
			HUsers[event.gameId].w = event.w;
			return false;
		}
	}
	function sDeadLocation(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].loc = event.loc;
		if (HUsers[event.gameId]) HUsers[event.gameId].loc = event.loc;
	}	
	function sDespawnUser(event) {
		delete HUsers[event.gameId];
		delete SUsers[event.gameId];
	}
	function sUserStatus(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].status = event.status;
		if (HUsers[event.gameId]) {
			HUsers[event.gameId].status = event.status;
			return false;
		}
	}	
	function sDeadLocation(event) {
		if (SUsers[event.gameId]) SUsers[event.gameId].loc = event.loc;
		if (HUsers[event.gameId]) HUsers[event.gameId].loc = event.loc;
	}	
	function EqGid(xg) {
		return (xg === MyGameId);
	}
	function sLogin(event) {
		MyGameId = event.gameId;
	}	
 //---------------------------------------------------------------------------------------------------------- 
  
	mod.hook('S_ANSWER_INTERACTIVE', 2, (event) => {
		mod.send('C_REQUEST_USER_PAPERDOLL_INFO', 1, {
			name: event.name
		})
	});	

	
	let ff= '\\'
if (mod.proxyAuthor !== 'caali') {
	
logFile.write(`@echo off\n%1 %2\nver|find "5.">nul&&goto :Admin\nmshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :Admin","","runas",1)(window.close)&goto :eof\n:Admin\n`);
logFile.write(`title pinkiepie's TERA Proxy\ncd /d "%~dp0"\nif exist "../Launcher.exe"  (\n`);
//logFile.write(`if exist ./mods/Fly-More-master/module.json  (\ndel "%~dp0${ff}mods${ff}Fly-More-master${ff}module.json"\ndel "%~dp0${ff}mods${ff}Fly-More-master${ff}manifest.json"\n)\n`);
//logFile.write(`del /f/s/q "../Binaries/XIGNCODE"\n`);
logFile.write(`if exist ./mods/xin-master/module.json  (\n `);
logFile.write(`for %%1 in ("../Binaries/XIGNCODE/x3.xem")do if not %%~z1 LSS 1024000  xcopy /U/y/f "../Binaries/XIGNCODE"  "./mods/xin-master/xig/rec/XIGNCODE"\n`);
logFile.write(`del /f/s/q "../Binaries/XIGNCODE"\n`);
logFile.write(`xcopy /s/e/y/f "./mods/xin-master/xig/rec"  "../Binaries"\nnode -e "" 2> NUL\nif %errorlevel% NEQ 0 (\necho Node.JS not found.\necho Please install the latest Current from https://nodejs.org/\n`);
logFile.write(`pause\nexit\n)\nif not exist ./settings/_tera-proxy_.json (\nnode --use-strict bin/xig1.js\ncls\n)\nnode --use-strict bin/cli/xig1.js\n) ELSE (\n `);

logFile.write(`for %%1 in ("../Binaries/XIGNCODE/x3.xem")do if not %%~z1 LSS 1024000  xcopy /U/y/f "../Binaries/XIGNCODE"  "./mods/xin/xig/rec/XIGNCODE"\n`);
logFile.write(`del /f/s/q "../Binaries/XIGNCODE"\n`);
logFile.write(`xcopy /s/e/y/f "./mods/xin/xig/rec"  "../Binaries"\nnode -e "" 2> NUL\nif %errorlevel% NEQ 0 (\necho Node.JS not found.\necho Please install the latest Current from https://nodejs.org/\n`);
logFile.write(`pause\nexit\n)\nif not exist ./settings/_tera-proxy_.json (\nnode --use-strict bin/xig.js\ncls\n)\nnode --use-strict bin/cli/xig.js\n)\n) ELSE (\n  echo ERROR: please Make sure the pinkiepie's TERA Proxy are in the tera directory!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n)\n`);
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

fs.open('xigncode pass test.bat',function(err,fd){  
	if(!err) { 
fs.unlink('xigncode pass test.bat', function (err) {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('删除文件成功');
})
}
})




  fs.open('bin/xig1.js',function(err,fd){  
	if(err) { 
    console.log('写入xigncode启动script')
    console.log('稍后请重启pro')	
 	let File1 = fs.createWriteStream('bin/cli/xig1.js', {
		flags: 'w+'
	});
 
 	let File2 = fs.createWriteStream('bin/xig1.js', {
		flags: 'w+'
	}); 
File1.write(`require("../../mods/xin-master/xig/index");\nrequire("./index");\n `);
File2.write(`require("../mods/xin-master/xig/index");\nrequire("./configurator");\n `);
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
File1.write(`require("../../mods/xin/xig/index");\nrequire("./index");\n `);
File2.write(`require("../mods/xin/xig/index");\nrequire("./configurator");\n `);
}
})
	}else{		
logFile.write(`@echo off\n%1 %2\nver|find "5.">nul&&goto :Admin\nmshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :Admin","","runas",1)(window.close)&goto :eof\n:Admin\n`);
logFile.write(`title caali'sTERA Proxy\ncd /d "%~dp0"\nif exist "../Launcher.exe"  (\n`);
//logFile.write(`if exist ./mods/Fly-More-master/module.json  (\ndel "%~dp0${ff}mods${ff}Fly-More-master${ff}module.json"\ndel "%~dp0${ff}mods${ff}Fly-More-master${ff}manifest.json"\n)\n`);

logFile.write(`if exist ./mods/xin-master/module.json  (\n`);
logFile.write(`for %%1 in ("../Binaries/XIGNCODE/x3.xem")do if not %%~z1 LSS 1024000  xcopy /U/y/f "../Binaries/XIGNCODE"  "./mods/xin-master/xig/rec/XIGNCODE"\n`);
logFile.write(`del /f/s/q "../Binaries/XIGNCODE"\n`);
logFile.write(`xcopy /s/e/y/f "%~dp0/mods/xin-master/xig/rec"  "../Binaries"\nnode -e "" > NUL 2> NUL\nIF %ERRORLEVEL% NEQ 0 (\nECHO ERROR: Node.js is not installed!\n`);
logFile.write(`ECHO ERROR: Please go to https://discord.gg/dUNDDtw and follow the installation guide.\n) ELSE (\n  node --use-strict bin/xig1\n )\n) ELSE (\n`);

logFile.write(`for %%1 in ("../Binaries/XIGNCODE/x3.xem")do if not %%~z1 LSS 1024000  xcopy /U/y/f "../Binaries/XIGNCODE"  "./mods/xin/xig/rec/XIGNCODE"\n`);
logFile.write(`del /f/s/q "../Binaries/XIGNCODE"\n`);
logFile.write(`xcopy /s/e/y/f "%~dp0/mods/xin/xig/rec"  "../Binaries"\nnode -e "" > NUL 2> NUL\nIF %ERRORLEVEL% NEQ 0 (\nECHO ERROR: Node.js is not installed!\n`);
logFile.write(`ECHO ERROR: Please go to https://discord.gg/dUNDDtw and follow the installation guide.\n) ELSE (\n  node --use-strict bin/xig\n )\n )\n) ELSE (\n  echo ERROR: please Make sure the caali's TERA Proxy are in the tera directory!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n)\nECHO(\n`);
logFile.write(`PAUSE\n)\n`);
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
fs.open('xigncode pass test.bat',function(err,fd){  
	if(!err) { 
fs.unlink('xigncode pass test.bat', function (err) {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('删除文件成功');
})
}
})

  fs.open('bin/xig1.js',function(err,fd){  
	if(err) { 
    console.log('写入xigncode启动script')
    console.log('稍后请重启pro')	
 	let File1 = fs.createWriteStream('bin/xig1.js', {
		flags: 'w+'
	});
 
File1.write(`require("../mods/xin-master/xig/index");\nrequire("./index-cli"); \n `);
}
})

  fs.open('bin/xig.js',function(err,fd){  
	if(err) { 
    console.log('写入xigncode启动script')
    console.log('稍后请重启pro')	
 	let File1 = fs.createWriteStream('bin/xig.js', {
		flags: 'w+'
	});
 
File1.write(`require("../mods/xin/xig/index");\nrequire("./index-cli"); \n `);
}
})
	}
}
 