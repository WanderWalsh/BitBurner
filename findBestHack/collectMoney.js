/** @param {NS} ns **/
export async function main(ns) {
    var target = ns.args[0];

    var moneyThresh = ns.getServerMaxMoney(target) * 0.8;
    var secThresh = ns.getServerMinSecurityLevel(target) + 5;
    
    while(true){
        if(ns.getServerSecurityLevel(target) > secThresh || ns.getServerMoneyAvailable(target) < moneyThresh){
            await ns.getServerMoneyAvailable(target);
            await ns.sleep(10000);
        }
        else{
            await ns.hack(target);
            await ns.tprint("hack complete on " + target);
            if(ns.getHackingLevel() > 1000){
                if(ns.getServerSecurityLevel(target) == 100 || ns.getServerMoneyAvailable(target) == 0){
                    await ns.tprint("Looking for new target");
                    await ns.exec("/findBestHack/search.js", "home", 1);
                }
            }    
        }
    }
}