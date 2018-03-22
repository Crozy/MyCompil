import ExpressionVarDeclaration from "./ExpressionVarDeclaration.js";
import ExpressionVarAssignation from "./ExpressionVarAssignation.js";

export default class ExpressionFactory{
	
	static create(cursor, tokens){
		let current_token = tokens[cursor.position];
        let next = tokens[cursor.position];
        let id = next;
        let childs = [];
		switch(current_token.type){
            case 'int-default_type':
            	childs.push(next);
                cursor.position++
                next = tokens[cursor.position];
                while(next.type==="space") {
                    cursor.position++
                    next = tokens[cursor.position];
                }
                if(next.type==="identifier") {
                    childs.push(next);
                    id = next;
                    cursor.position++
                    next = tokens[cursor.position];
                    while(next.type==="space") {
                        cursor.position++
                        next = tokens[cursor.position];
                    }
                    if(next.type==="instruction-end") {
                        childs.push(next);
                        return new ExpressionVarDeclaration(id, childs);
                    } else if (next.type==="equal") {
                        childs.push(next);
                        cursor.position++
                        next = tokens[cursor.position];
                        while(next.type==="space") {
                            cursor.position++
                            next = tokens[cursor.position];
                        }
						if(next.type==="number" || next.type==="number-float") {
                            childs.push(next);
                        	let nb = next;
                            cursor.position++
                            next = tokens[cursor.position];
                            while(next.type==="space") {
                                cursor.position++
                                next = tokens[cursor.position];
                            }
                            if(next.type==="instruction-end") {
                                childs.push(next);
                                return new ExpressionVarAssignation(id, nb, childs);
                            } else {
                                throw 'You have to end a variable declaration by a semicolon';
							}
						} else {
                            throw 'You have to assign a number to your variable';
						}
                    } else {
                        throw 'You have to end a variable declaration by a semicolon';
					}
                } else {
                    throw 'You have to define a identifier for your variable.';
                }
                break;
            case 'string-default_type':
                childs.push(next);
                cursor.position++
                next = tokens[cursor.position];
                while(next.type==="space") {
                    cursor.position++
                    next = tokens[cursor.position];
                }
                if(next.type==="identifier") {
                    childs.push(next);
                    id = next;
                    cursor.position++
                    next = tokens[cursor.position];
                    while(next.type==="space") {
                        cursor.position++
                        next = tokens[cursor.position];
                    }
                    if(next.type==="instruction-end") {
                        childs.push(next);
                        return new ExpressionVarDeclaration(id);
                    } else if (next.type==="equal") {
                        childs.push(next);
                        cursor.position++
                        next = tokens[cursor.position];
                        while(next.type==="space") {
                            cursor.position++
                            next = tokens[cursor.position];
                        }
                        if(next.type==="object-string") {
                            childs.push(next);
                            let nb = next;
                            cursor.position++
                            next = tokens[cursor.position];
                            while(next.type==="space") {
                                cursor.position++
                                next = tokens[cursor.position];
                            }
                            if(next.type==="instruction-end") {
                                childs.push(next);
                                return new ExpressionVarAssignation(id, nb, childs);
                            } else {
                                throw 'You have to end a variable declaration by a semicolon';
                            }
                        } else {
                            throw 'You have to assign a string to your variable';
                        }
                    } else {
                        throw 'You have to end a variable declaration by a semicolon';
                    }
                } else {
                    throw 'You have to define a identifier for your variable.';
                }
                break;
			//case 'if-control_flow':
                //TODO
                //break;
			// case 'equal':
			// 	if(tokens[cursor.position-1].type=="space" && tokens[cursor.position-2].type=="identifier"){
			// 		cursor.position++
			// 		let next = tokens[cursor.position];
			// 		if(next.type!="space"){
			// 			throw 'You have to put a space after a variable assignation.';
			// 		}
			// 		cursor.position++
			// 		next = tokens[cursor.position];
			// 		return new ExpressionVarAssignation(tokens[cursor.position-4], next);
			// 	}else{
			// 		throw 'You have to put a space after a variable declaration.';
			// 	}
			// 	break;
		}
	}	
	
};