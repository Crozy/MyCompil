class Expression {
	
	constructor(type) {
		if (!type) throw new Error("an expression requires a type")
		this.type = type;
		this.childs = [];
        this.crs = 0;
	}
	
	addChild(expression){
		this.childs.push(expression);
	}
	
}


export default Expression;