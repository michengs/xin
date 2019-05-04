
"use strict"

const fs = require("fs");
const path = require("path");
const ProcessListener = require("./process-listener");
const scan_interval = require('./config.json');

let PatchedProcesses = {};

function HandleAddedProcess(process) {
    try {
        let XigncodeFolder = path.join(path.dirname(process.path), "XIGNCODE");
        
        if (!fs.existsSync(path.join(XigncodeFolder, "x3.xem.bak"))) {
            fs.renameSync(path.join(XigncodeFolder, "x3.xem"), path.join(XigncodeFolder, "x3.xem.bak"));
            fs.copyFileSync(path.join(__dirname, "res/x3.xem"), path.join(XigncodeFolder, "x3.xem"));
        }
        if (!fs.existsSync(path.join(XigncodeFolder, "xcorona.xem.bak"))) {
            fs.renameSync(path.join(XigncodeFolder, "xcorona.xem"), path.join(XigncodeFolder, "xcorona.xem.bak"));
            fs.copyFileSync(path.join(__dirname, "res/xcorona.xem"), path.join(XigncodeFolder, "xcorona.xem"));
        }
        PatchedProcesses[process.pid] = XigncodeFolder;
        console.log(`[xigncode-bypass] TERA游戏客户端 (PID ${process.pid}) 被检测到, bypass 已安装.`);
    } catch(e) {
        // Ignore errors...
    }
}

function HandleRemovedProcess(pid) {
    try {
        let XigncodeFolder = PatchedProcesses[pid];
        
        if (fs.existsSync(path.join(XigncodeFolder, "x3.xem.bak"))) {
            fs.renameSync(path.join(XigncodeFolder, "x3.xem.bak"), path.join(XigncodeFolder, "x3.xem"));
        }
        if (fs.existsSync(path.join(XigncodeFolder, "xcorona.xem.bak"))) {
            fs.renameSync(path.join(XigncodeFolder, "xcorona.xem.bak"), path.join(XigncodeFolder, "xcorona.xem"));
        }
        delete PatchedProcesses[pid];
     console.log(`[xigncode-bypass] TERA游戏客户端 (PID ${pid}) 已结束, bypass 已还原.`);
    } catch(e) {
        // Ignore errors...
    }
}

ProcessListener("TERA.exe", HandleAddedProcess, HandleRemovedProcess, scan_interval);
console.log("[bypass] 准备, 等待TERA游戏客户端启动!");

try {
    fs.unlinkSync("C:\\Windows\\xhunter1.sys");
    console.log("[bypass] Traces of a previous xigncode installation have been located and removed from your system!");
    console.log("[bypass] Note that some registry keys might still remain on your system.");
    console.log("[bypass] Check out #proxy-changelog in https://discord.gg/maqBmJV for instructions on manual removal.");
} catch(e) {
    // Ignore errors...
}
/*
const StartupFilePath = [
    '../bin/index.js',     // Old Proxy
    '../bin/index-cli.js', // Caali's Proxy
    '../bin/cli/index.js'  // Pinkie's Proxy
];

for (let i=0; i < StartupFilePath.length; i++) {
    if (fs.existsSync(path.join(StartupFilePath[i]))) {
        module.exports = require(StartupFilePath[i]);
        return;
    }
    
}

console.log(`注意: TeraProxy版本 不支持 xigncode-bypass!!`);


*/





























