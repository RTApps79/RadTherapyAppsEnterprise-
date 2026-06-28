export default{

    initialize(){

        console.clear();

    },

    info(m){

        console.log("%cINFO","color:#38bdf8",m);

    },

    success(m){

        console.log("%cSUCCESS","color:#10b981",m);

    },

    warning(m){

        console.log("%cWARNING","color:#f59e0b",m);

    },

    error(m){

        console.log("%cERROR","color:#ef4444",m);

    }

}
