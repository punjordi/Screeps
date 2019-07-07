var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');



module.exports.loop = function () {
    
    roleHarvester.run();
    roleUpgrader.run();


};