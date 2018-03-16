int age = 5;
String nom = "Jean-Paul";

if((age < (5*7)) && (age > 0))
{
    age = (age + (5*7));
    nom = ((nom + " ") + "Turowicz");
}

boolean res;
res = datation(nom,age);
