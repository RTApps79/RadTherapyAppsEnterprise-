import EnterpriseState from "./EnterpriseState.js";

export default class Store{

constructor(){

this.state=structuredClone(EnterpriseState);

}

get(key){

return this.state[key];

}

set(key,value){

this.state[key]=value;

}

update(key,data){

Object.assign(this.state[key],data);

}

}
