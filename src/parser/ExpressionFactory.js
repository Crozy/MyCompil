import ExpressionVarDeclaration from "./ExpressionVarDeclaration.js";
import ExpressionVarAssignation from "./ExpressionVarAssignation.js";

export default class ExpressionFactory{
	
	static create(cursor, tokens){
		let current_token= tokens[cursor.position];
		switch(current_token.type){
            case 'int-default_type':
                cursor.position++
                let next = tokens[cursor.position];
                while(next.type==="space") {
                    cursor.position++
                    next = tokens[cursor.position];
                }
                if(next.type==="identifier") {
                    let id = next;
                    cursor.position++
                    next = tokens[cursor.position];
                    while(next.type==="space") {
                        cursor.position++
                        next = tokens[cursor.position];
                    }
                    if(next.type==="instruction-end") {
                        return new ExpressionVarDeclaration(id);
                    }else if (next.type==="equal") {
                        cursor.position++
                        next = tokens[cursor.position];
                        while(next.type==="space") {
                            cursor.position++
                            next = tokens[cursor.position];
                        }
						if(next.type==="number" || next.type==="number-float") {
                        	let nb = next;
                            cursor.position++
                            next = tokens[cursor.position];
                            while(next.type==="space") {
                                cursor.position++
                                next = tokens[cursor.position];
                            }
                            if(next.type==="instruction-end") {
                                return new ExpressionVarAssignation(id, nb);
                            } else {
                                throw 'You have to end a variable declaration by a semicolon';
							}
						} else {
                            throw 'You have to assign a number to your variable assignation';
						}
                    } else {
                        throw 'You have to end a variable declaration by a semicolon';
					}
                }else{
                    throw 'You have to define a identifier for a variable.';
                }
                break;
			case 'equal':
				if(tokens[cursor.position-1].type=="space" && tokens[cursor.position-2].type=="identifier"){
					cursor.position++
					let next = tokens[cursor.position];
					if(next.type!="space"){
						throw 'You have to put a space after a variable assignation.';
					}
					cursor.position++
					next = tokens[cursor.position];
					return new ExpressionVarAssignation(tokens[cursor.position-4], next);	
				}else{
					throw 'You have to put a space after a variable declaration.';
				}
				break;
		}
	}	
	
};