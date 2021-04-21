module.exports = (value, type) => {

    switch(type){

        case "id":
            let id = parseInt(value);
            //check if the value is a number
            if(isNaN(id)){
                return true;
            }
            //check if the id - 4 is divisible by 10
            if((id-4)%10 != 0){
                return true;
            }
            break;

        case "phone":
            if(typeof(value)!=="string"){
                return true;
            }
            //check if the value is 8 digits long
            if(value.length !=8 || value.match(/^[0-9]+$/) == null){
                return true;
            }
            break;

        case "email":
            if(typeof(value)!=="string"){
                return true;
            }
            if(!(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/.test(value))){
                return true;
            }
            break;

        case "url":
            if(typeof(value)!=="string"){
                return true;
            }
            if(value == ""){}
            else if(!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value))){
                return true;
            }
            break;

        case "timestamp":
            let time = parseInt(value);
            //check if the value is a number
            if(isNaN(time)){
                return true;
            }
            break;

        case "boolean":
            if(value === "true" || value === "false"){}
            else if(value === true || value === false){}
            else{
                return true;
            }

            break;

        case "unit":
            if(typeof(value)!=="string"){
                return true;
            }
            var split = value.indexOf("-");
            if(split == -1){
                return true;
            }
            break;

        case "plain text":
            if(typeof(value)!=="string"){
                return true;
            }
            if(!(/^[a-zA-Z0-9&-:\s]*$/.test(value))){
                return true;
            }
            break;

        case "number":
            let i = parseInt(value);
            if(isNaN(i)){
                return true;
            }

            break;

        case "any text":
            if(typeof(value)!=="string"){
                return true;
            }
            break;

    }

    return false;
}
