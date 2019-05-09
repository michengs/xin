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
        console.log(`[xigncode-bypass] TERA游戏客户端 (PID ${process.pid}) 被检测到, bypass 已安装.`);
    }
    catch(e)
    {
        console.log(`[xigncode-bypass] 错误:无法安装旁路 (PID ${process.pid})!`);
        switch(e.code)
        {
            case 'ENOENT':
            {
                console.log("[xigncode-bypass] 不存在injector.exe注入。它可能已经被你的杀毒软件删除了.");
                console.log("[xigncode-bypass] 禁用/卸载各种杀毒软件，或白名单你的代理和injector.exe!");
                break;
            }
            default:
            {
                switch(e.status)
                {
                    case 1:
                    {
                        console.log("[xigncode-bypass] 旁路DLL注入失败。它可能被你的杀毒软件阻断了.");
                        console.log("[xigncode-bypass] 禁用/卸载各种杀毒软件，或白名单你的代理和injector.exe!!");
                        break;
                    }
                    default:
                    {
                        console.log("[xigncode-bypass] 这可能是由于您的反病毒干扰造成的完整错误信息 禁用/卸载各种杀毒软件，或白名单你的代理.");
                        console.log("[xigncode-bypass] 完整错误信息:");
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
     console.log(`[xigncode-bypass] TERA游戏客户端 (PID ${pid}) 已结束.`);
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


    InitBypassDll();
    ProcessListener("TERA.exe", HandleAddedProcess, HandleRemovedProcess, SCAN_INTERVAL);
console.log("[bypass] 准备, 等待TERA游戏客户端启动!");

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
