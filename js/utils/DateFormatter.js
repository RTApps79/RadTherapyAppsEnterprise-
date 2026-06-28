export default class DateFormatter{

static format(date){

return new Date(date)

.toLocaleDateString(

"en-US",

{

year:"numeric",

month:"long",

day:"numeric"

}

);

}

}
