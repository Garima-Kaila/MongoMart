function add(a,b){
if(typeof a === 'number' ){
	return a + b;
	}
	else{
	 throw new Error("Invalid Input");
	}
}