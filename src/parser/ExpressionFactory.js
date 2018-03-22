import ExpressionVarDeclaration from "./ExpressionVarDeclaration.js";
import ExpressionVarAssignation from "./ExpressionVarAssignation.js";

export default class ExpressionFactory{
	
	static create(cursor, tokens){
		let current_token = tokens[cursor.position];
        let next = tokens[cursor.position];
        let id = next;
        let childs = [];
        let compteur;
        let compteurEgal
        let operateurConditionnel;
        let i;
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
                cursor.position++
                next = tokens[cursor.position];

                while(next.type==="space") {
                    cursor.position++
                    next = tokens[cursor.position];
                }
                if(next.type != "parenthesis-start"){
                    throw 'Le "if" est mal définie';
                }
                
                compteur = 0;
                i = 0;

              //Boucle jusqu'à temps de trouver un "{"
                while(next.type != "accolade-start"){
                    //i = i + 1;
                    console.log(compteur);

                    while(next.type==="space") {
                        cursor.position++
                        next = tokens[cursor.position];
                    }

                    if(next.type=="parenthesis-start"){
                        compteur = compteur + 1;
                        cursor.position++
                        next = tokens[cursor.position];                      
                    }
                     while(next.type==="space") {
                         cursor.position++
                         next = tokens[cursor.position];
                     }

                    if(next.type=="identifier" || next.type=="number" || next.type=="number-float"){
                        cursor.position++
                        next = tokens[cursor.position];
                        
                         while(next.type==="space") {
                             cursor.position++
                             next = tokens[cursor.position];
                         }
                            //if((next.type=="equal" && next.type=="equal" && next.type=="equal") || 
                            if(next.type=="inf-default_operator" || next.type=="sup-default_operator"){
                                if(operateurConditionnel == undefined){
                                    operateurConditionnel = next.type;
                                }else{
                                    throw 'Erreur plusieurs opérateurs conditionnel est présent dans ce if'
                                }
                            }
                        }  

                        while(next.type==="space") {
                            cursor.position++
                            next = tokens[cursor.position];
                        }

                        if(next.type=="identifier" || next.type=="number" || next.type=="number-float"){
                            
                        }

                            // while(next.type==="egal") {
                            //     cursor.position++
                            //     next = tokens[cursor.position];
                            //     compteurEgal = 0;
                            //     compteurEgal = compteurEgal + 1;
                            // }

                            // if(compteurEgal = 3){
                            //     operateurConditionnel = true
                            // }else if(compteurEgal > 3){
                            //     throw 'Erreur syntaxe'
                            // }


                            // while(next.type==="space") {
                            //     cursor.position++
                            //     next = tokens[cursor.position];
                            // }    
                

                while(next.type==="space") {
                    cursor.position++
                    next = tokens[cursor.position];
                }   

                if(next.type=="parenthesis-end"){
                    compteur = compteur - 1;
                }
                    cursor.position++
                    next = tokens[cursor.position];
                
            }
                
                //i = i + 1;

            //console.log(compteur);
            if(compteur != 0){
                if(compteur < 0){
                    throw 'Il manque ' + compteur * -1 + ' parenthèse(s) ouvrante';
                }else if(compteur > 0){
                    throw 'Il manque ' + compteur + 'parenthèse(s) fermante';
                }
            }else{                
                return "Condition if avec l'opérateur : " + operateurConditionnel;
            }
            break;
		}
	}	
	
};