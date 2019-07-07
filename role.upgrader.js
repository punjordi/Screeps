var textspawn = require('TextSpawning');

var role_upgrader = {
    
    bot_count : null,
    bot_name : 'Upgrader ',
    bot_type : [WORK,CARRY,MOVE],
    bot_upgraders : null,
    bot_number: 0,

    counting : function () {
      for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
      this.bot_upgraders = _.filter(Game.creeps,(creep)=>creep.memory.role === 'upgrader');
      this.bot_count = this.bot_upgraders.length;
    },
    
    run : function(){
        
        this.counting();
        if(this.bot_count < 1 && !Game.spawns.Spawn1.spawning && Game.spawns.Spawn1.energy >=300){
            console.log('Spawning New upgrader: ' + this.bot_name + this.bot_count.toString());
            var spawnattemptvalue = Game.spawns.Spawn1.spawnCreep(this.bot_type,this.bot_name + this.bot_number,{memory: {role: 'upgrader'}});
            this.bot_number ++;
            textspawn.SpawnText(spawnattemptvalue);
        }
       
        else{
            this.bot_upgraders = _.filter(Game.creeps,(creep)=>creep.memory.role === 'upgrader');

            for(var unit in this.bot_upgraders){
                var creep = this.bot_upgraders[unit];
                
                if(_.sum(creep.carry) < creep.carryCapacity){
                   
                    //May not be closest
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
                       
                        creep.say('🔄 harvest');
                        creep.moveTo(sources[0],{visualizePathStyle: {stroke:'$ffaa00'}});
                        
                    }
                    
                }
                else if (_.sum(creep.carry) === creep.carryCapacity){
                    
                        
                        creep.say('⚡ upgrade');
                        if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    
                    

                }
                    
            }
        }
    }
        
};

module.exports = role_upgrader;