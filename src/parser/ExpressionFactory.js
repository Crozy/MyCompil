import ExpressionVarDeclaration from "./ExpressionVarDeclaration.js";
import ExpressionVarAssignation from "./ExpressionVarAssignation.js";
import ExpressionIfCondition from "./ExpressionIfCondition.js";

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
			case 'if-control_flow':
                childs.push(next);
                cursor.position++
                next = tokens[cursor.position];
                while(next.type==="space") {
                    cursor.position++
                    next = tokens[cursor.position];
                }
                if(next.type==="parenthesis-start") {
                    cond = new ExpressionIfCondition(tokens, cursor.position);
                    childs.push(cond);
                    cursor.position = cond.crs;
                } else {
                    throw 'error in if condition';
                }
                cursor.position++
                next = tokens[cursor.position];
                while(next.type==="space" || next.type==="line-break-r" || next.type==="line-break") {
                    cursor.position++
                    next = tokens[cursor.position];
                }
                if(next.type==="accolade-start") {
                    cursor.position++
                    next = tokens[cursor.position];
                    while(next.type==="space" || next.type==="line-break-r" || next.type==="line-break") {
                        cursor.position++
                        next = tokens[cursor.position];
                    }
                    cond = new ExpressionIfBody(tokens, cursor.position);
                    childs.push(cond);
                    cursor.position = cond.crs;
                } else {
                    throw 'error in if body'
                }
                break;
		}
	}	
	
};