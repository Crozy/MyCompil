import Expression from "./Expression.js";

export default class ExpressionVarAssignation extends Expression{
	
	constructor(token_identifier, token_value, childs){
		if(token_identifier.type!="identifier"){
			throw 'You have to put a valid identifier for a variable assignation';
		}
		super("ExpressionVarAssignation");
		this.variableName= token_identifier.value;
		switch(token_value.type){
			case 'object-string':
			case 'number':
			case 'number-float':
				this.variableValue= token_value.value.substring(1,token_value.value.length - 1);
				break;
			default:
				throw 'You have to assign a known type to your variable ';
		}
		this.childs = childs;
	}
}

