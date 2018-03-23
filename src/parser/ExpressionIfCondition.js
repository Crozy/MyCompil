import Expression from "./Expression.js";

export default class ExpressionIfCondition extends Expression {

    constructor(tokens, cursor) {
        super("ExpressionIfCondition");
        let next = tokens[cursor.position];
        //TODO : une récursion croisée qui marche bien
        this.cp = this.leftOperatorExpression(tokens, cursor);


        // cursor.position = this.cp;
        // cursor.position++;
        // next = tokens[cursor.position];
        // while (next.type === "space") {
        //     cursor.position++;
        //     next = tokens[cursor.position];
        // }
        // if (next.type === "log_and-default_operator"
        //     || next.type === "inf-default_operator"
        //     || next.type === "sup-default_operator"
        //     || next.type === "mult-default_operator"
        //     || next.type === "add-default_operator") {
        //     this.childs.push(next);
        // } else {
        //     console.log(next.type);
        //     console.log(tokens[cursor.position-1]);
        //     console.log(tokens[cursor.position-2]);
        //     throw "error in your if condition (3)"
        // }
        // cursor.position++;
        // next = tokens[cursor.position];
        // while (next.type === "space") {
        //     cursor.position++;
        //     next = tokens[cursor.position];
        // }
        // this.cp = this.rightOperatorExpression(tokens, cursor);
    }

        // cursor.position++;
        //
        // cursor.position++;
        // next = tokens[cursor.position];
        // while (next.type === "space") {
        //     cursor.position++;
        //     next = tokens[cursor.position];
        // }
        // if (next.type === "parenthesis-end") {
        //     this.cp = cursor.position;
        //     return this;
        // }
        // else {
        //     throw "error in your if condition (5)"
        // }
        // else if (next.type === "identifier") {
        //     this.childs.push(next);
        //     cursor.position++;
        //     next = tokens[cursor.position];
        //     while (next.type === "space") {
        //         cursor.position++;
        //         next = tokens[cursor.position];
        //     }
        //     if (next.type === "log_and-default_operator"
        //         || next.type === "inf-default_operator"
        //         || next.type === "sup-default_operator"
        //         || next.type === "mult-default_operator"
        //         || next.type === "add-default_operator") {
        //         this.childs.push(next);
        //     } else if (next.type === "parenthesis-end") {
        //         this.cp = cursor.position;
        //         return this;
        //     } else {
        //         throw "error in your if condition (2)"
        //     }
        //     cursor.position++;
        //     next = tokens[cursor.position];
        //     while (next.type === "space") {
        //         cursor.position++;
        //         next = tokens[cursor.position];
        //     }
        //     cursor.position = this.rightOperatorExpression(tokens, cursor);
        //     cursor.position++;
        //     next = tokens[cursor.position];
        //     while (next.type === "space") {
        //         cursor.position++;
        //         next = tokens[cursor.position];
        //     }
        //     if (next.type === "parenthesis-end") {
        //         this.cp = cursor.position;
        //         return this;
        //     }
        //     else {
        //         throw "error in your if condition (4)"
        //     }
        // } else {
        //     throw "error in your if condition (1)"
        // }

    //TODO : une récursion croisée qui marche bien
    leftOperatorExpression(tokens, cursor){
        let n = tokens[cursor.position];
        let crs = cursor.position;
        if (n.type === "parenthesis-start") {
            cursor.position++;
            n = tokens[cursor.position];
            while (n.type === "space") {
                cursor.position++;
            }
            crs = this.leftOperatorExpression(tokens, cursor);
        } else if (n.type === "identifier" || n.type === "number" || n.type === "number-float") {
            this.childs.push(n);
            cursor.position++;
            n = tokens[cursor.position];
            while (n.type === "space") {
                cursor.position++;
                n = tokens[cursor.position];
            }
            if (n.type === "log_and-default_operator"
                || n.type === "inf-default_operator"
                || n.type === "sup-default_operator"
                || n.type === "mult-default_operator"
                || n.type === "add-default_operator") {
                this.childs.push(n);
                cursor.position++;
                n = tokens[cursor.position];
                while (n.type === "space") {
                    cursor.position++;
                    n = tokens[cursor.position];
                }
                crs = this.rightOperatorExpression(tokens, cursor);
            } else {
                throw "error in your left operande (1)"
            }
        } else {
            throw "error in your left operande (2)"
        }
        return crs;
    }

    //TODO : une récursion croisée qui marche bien
    rightOperatorExpression(tokens, cursor){
        let n = tokens[cursor.position];
        let crs = cursor.position;
        if (n.type === "parenthesis-start") {
            cursor.position++;
            n = tokens[cursor.position];
            while (n.type === "space") {
                cursor.position++;
            }
            crs = this.leftOperatorExpression(tokens, cursor);
        } else if (n.type === "identifier" || n.type === "number" || n.type === "number-float") {
            this.childs.push(n);
            cursor.position++;
            n = tokens[cursor.position];
            while (n.type === "space") {
                cursor.position++;
                n = tokens[cursor.position];
            }
            if (n.type === "parenthesis-end") {
                crs = cursor.position;
                return crs;
            } else {
                throw "error in your right operande (1)"
            }
        } else {
            throw "error in your right operande (2)"
        }
        return crs;
    }

}