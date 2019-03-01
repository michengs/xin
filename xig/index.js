"use strict"

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ProcessListener = require("./process-listener");
const { scan_interval: SCAN_INTERVAL, backup: BACKUP } = require('./config.json');

let PatchedProcesses = {};
let TmpDir = null;
let BypassDllPath = null;

function HandleAddedProcess(process)
{
    try
    {
        execFileSync(path.join(__dirname, "res/injector.exe"), [process.pid, BypassDllPath]);
        PatchedProcesses[process.pid] = true;
        console.log(`[xigncode-bypass] Game client (PID ${process.pid}) detected, bypass installed.`);
    }
    catch(e)
    {
        console.log(`[xigncode-bypass] ERROR: Unable to install bypass (PID ${process.pid})!`);
        switch(e.code)
        {
            case 'ENOENT':
            {
                console.log("[xigncode-bypass] injector.exe does not exist. It has likely been deleted by your anti-virus.");
                console.log("[xigncode-bypass] Disable/uninstall it or whitelist the proxy and injector.exe!");
                break;
            }
            default:
            {
                switch(e.status)
                {
                    case 1:
                    {
                        console.log("[xigncode-bypass] Bypass DLL injection unsuccessful. It has likely been blocked by your anti-virus.");
                        console.log("[xigncode-bypass] Disable/uninstall it or whitelist the proxy and injector.exe!");
                        break;
                    }
                    default:
                    {
                        console.log("[xigncode-bypass] This is likely caused by your anti-virus interfering. Disable/uninstall it or whitelist the proxy.");
                        console.log("[xigncode-bypass] Full error message:");
                        console.log(e);
                        break;
                    }
                }
                break;
            }
        }
    }
}

function HandleRemovedProcess(pid)
{
    try
    {
        console.log(`[xigncode-bypass] Game client (PID ${pid}) closed, bypass reverted.`);
        delete PatchedProcesses[pid];
    }
    catch(e)
    {
        // Ignore errors...
    }
}

function RandomString(m)
{
    // See https://gist.github.com/Dreyer/2368164
	m = m || 9;
    const r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let s = '';
	for (let i = 0; i < m; i++)
        s += r.charAt(Math.floor(Math.random()*r.length));
	return s;
}

function InitBypassDll()
{
    try
    {
        TmpDir = path.join(__dirname, "tmp");
        fs.mkdirSync(TmpDir);
    }
    catch(e)
    {
        // Ignore errors...
    }

    BypassDllPath = path.join(TmpDir, RandomString(Math.floor(Math.random() * (20 - 4 + 1)) + 4) + ".dll");
    fs.copyFileSync(path.join(__dirname, "res/bypass.dll"), BypassDllPath);

    process.on("exit", CleanupBypassDll);
    process.on("SIGHUP", CleanupBypassDll);
    process.on("SIGINT", CleanupBypassDll);
    process.on("SIGTERM", CleanupBypassDll);
}

function CleanupBypassDll()
{
    try
    {
        fs.unlinkSync(BypassDllPath);
        fs.rmdirSync(TmpDir);
    }
    catch(e)
    {
        // Ignore errors...
    }
}

module.exports = function XigncodeBypass(region)
{
    if (["eu", "ru"].includes(region))
    {
        console.log(`[xigncode-bypass] Not required for region ${region.toUpperCase()}, going to sleep!`);
        return;
    }

    InitBypassDll();
    ProcessListener("TERA.exe", HandleAddedProcess, HandleRemovedProcess, SCAN_INTERVAL);
    console.log("[xigncode-bypass] Ready, waiting for game client to be started!");

    try
    {
        fs.unlinkSync("C:\\Windows\\xhunter1.sys");
        console.log("[xigncode-bypass] Traces of a previous xigncode installation have been located and removed from your system!");
        console.log("[xigncode-bypass] Note that some registry keys might still remain on your system.");
        console.log("[xigncode-bypass] Check out #xigncode-bypass in https://discord.gg/maqBmJV for instructions on manual removal.");
    }
    catch(e)
    {
        // Ignore errors...
    }
}
