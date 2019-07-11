var textspawn = require('TextSpawning');

var role_harvester = {
    
    bot_count : null,
    bot_name : 'Harvester ',
    bot_type : [WORK,CARRY,MOVE],
    bot_harvesters : null,
    bot_number: 0,

    counting : function () {
      for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
      this.bot_harvesters = _.filter(Game.creeps,(creep)=>creep.memory.role === 'harvester');
      this.bot_count = this.bot_harvesters.length;
    },
    
    run : function(){
        
        this.counting();
        if(this.bot_count < 2 && !Game.spawns.Spawn1.spawning && Game.spawns.Spawn1.energy >=300){
            console.log('Spawning New Harvester: ' + this.bot_name + this.bot_count.toString());
            var spawnattemptvalue = Game.spawns.Spawn1.spawnCreep(this.bot_type,this.bot_name + this.bot_number,{memory: {role: 'harvester'}});
            this.bot_number ++;
            textspawn.SpawnText(spawnattemptvalue);
        }
       
        else{
            this.bot_harvesters = _.filter(Game.creeps,(creep)=>creep.memory.role === 'harvester');
            
            for(var unit in this.bot_harvesters){
                var creep = this.bot_harvesters[unit];
                
                if(_.sum(creep.carry) < creep.carryCapacity){
                   
                    //May not be closest
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
                        creep.moveTo(sources[0],{visualizePathStyle: {stroke:'$ffaa00'}});
                        creep.say('🔄 harvest');
                        
                    }
                    
                }
                else if ((_.sum(creep.carry) === creep.carryCapacity) && (!Room.energyCapacityAvailable === Room.energyAvailable)){
                    
                    var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});
                    
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            creep.say('🔄 Delivering');
                        }
                    }
                }
                else if ((_.sum(creep.carry) === creep.carryCapacity) && (Room.energyCapacityAvailable === Room.energyAvailable)) {
                    creep.say("FULL")
                }
            }
                    
        }
    }

        
};

module.exports = role_harvester;