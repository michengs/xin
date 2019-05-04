"use strict"

const { snapshot } = require("process-list");

let ListedProcesses = {};

module.exports = function ProcessListener(Name, OnAdded, OnRemoved, Interval = 500) {
    snapshot("pid", "name", "path").then(processes => {
        let NewListedProcesses = {};
        for (let process of processes) {
            if (process.name.toUpperCase() === Name.toUpperCase()) {
                if (!ListedProcesses[process.pid]) {
                    if (process.path !== "") {
                        OnAdded(process);
                        NewListedProcesses[process.pid] = true;
                    }
                } else {
                    NewListedProcesses[process.pid] = true;
                }
            }
        }
        
        for (let pid in ListedProcesses) {
            if (!NewListedProcesses[pid]) {
                OnRemoved(pid);
            }
        }
        ListedProcesses = NewListedProcesses;
        setTimeout(() => ProcessListener(Name, OnAdded, OnRemoved, Interval), Interval);
    });
}
