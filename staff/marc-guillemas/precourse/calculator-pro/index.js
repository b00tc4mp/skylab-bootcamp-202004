function enterNums(nums) {

    var answr = "y";

    while(answr === "y"){
        var x = parseFloat(prompt("Type a number:"), 10);
        // console.log(typeof(x))
        if(isNaN(x)){
        alert("Please type only numbers!!");
        }else{
            nums.push(parseFloat(x));
            answr = prompt("Do you want to add another number? y/n");
            while(answr != "y" && answr != "n"){
                alert("Please type yes or no! y/n");
                answr = prompt("Do you want to add another number? y/n");

            }
        }
    }
}

function add(nums) {

    var result = 0;
    for(x in nums){
        result += nums[x];
    };
    result = Math.floor(result * 100) / 100;

    return result;
};

function subs(nums) {

    var result = nums[0];
    for(var i = 1; i < nums.length; i++){
        result -= nums[i];
    };
    result = Math.floor(result * 100) / 100;

    return result;
};

function mult(nums) {

    var result = nums[0];
    for(var i = 1; i < nums.length; i++){
        result = result * nums[i];
    };
    result = Math.floor(result * 100) / 100;

    return result;
};

function div(nums) {

    var result = nums[0];
    for(var i = 1; i < nums.length; i++){
        result = result/nums[i];
    };
    result = Math.floor(result * 100) / 100;

    return result;
};

function sqroot(nums) {
    result = Math.sqrt(nums[0]);
    result = Math.floor(result * 100) / 100;
    return "\u221a"+nums[0]+" = "+result;
}




function calc() {
   
    var restart = true;
    while(restart){
        var nums = [];
        // var results = [{sum: ,operator: ,}]
        var operators = ["+","-","*","/"];
        var results = [];
        var funcs = []
        enterNums(nums);
        console.log(nums);

        if(nums.length > 1){    
            results[0] = add(nums);
            results[1] = subs(nums);
            results[2] = mult(nums);
            results[3] = div(nums);

            for(var i = 0; i < results.length; i++){
            console.log(results[i]);    
            }

        }else{
            results[0] = sqroot(nums);
            console.log(results[0]);
        }
        
        restart = confirm("Do you want to do another operation?");
    }
    if(!restart){
        alert("Good Bye");
    }

}
calc();




