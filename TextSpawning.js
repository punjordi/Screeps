
var TextSpawning = {
    SpawnText : function(value){
        
        switch(value){
        
        case 0:
            if(Game.spawns['Spawn1'].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
                break;
            }
        case -6:
            Game.spawns['Spawn1'].room.visual.text(
                "NOT Enough Energy",
                Game.spawns['Spawn1'].pos.x + 1, 
                Game.spawns['Spawn1'].pos.y, 
                {align: 'left', opacity: 0.8});
                break;

        }
    }
};

module.exports = TextSpawning; 
