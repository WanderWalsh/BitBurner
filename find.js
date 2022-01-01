/** @param {NS} ns **/
export async function main(ns) {
    var serverName= "";
	if(ns.args.length == 0){
		serverName = "home";
	}
	else{
		serverName = ns.args[0];
	}
	var hostNames = ns.scan(serverName);

	for(var i = 0; i<hostNames.length; i++ ){
		while(true){	
			var fram = await ns.getServerMaxRam("home") - ns.getServerUsedRam("home");
			if (fram > 3 ){
				if(ns.isRunning( "infil.js",hostNames[i]||ns.isRunning("find.js", hostNames[i]) )){	
					break;
				}
				else{
					await ns.exec("find.js", "home",1,hostNames[i], serverName);
					break;
				}
		
			}
			else{
				await ns.sleep(1000)
			}
		}
	}

	for(var i = 0; i<hostNames.length; i++ ){
		while(true){	
			var fram = await ns.getServerMaxRam("home") - ns.getServerUsedRam("home");
			if (fram > 4 ){
			await ns.exec("crack.js", "home",1,hostNames[i]);
			break;
			}
			else{
				await ns.sleep(1000)
			}
		}
	}	
	 
}
