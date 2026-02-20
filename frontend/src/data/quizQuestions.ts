import { QuizQuestion } from './learningTopics';

// Banque de questions enrichie par topic
// Chaque topic a un pool de questions variées, plus les questions originales

export const quizQuestionBank: Record<string, QuizQuestion[]> = {
  // =============================================
  // VARIABLES
  // =============================================
  'variables': [
    // Questions originales
    {
      question: 'Qu\'est-ce qu\'une variable ?',
      options: ['Un nombre fixe', 'Un espace mémoire pour stocker des données', 'Une opération mathématique', 'Un type de boucle'],
      correctIndex: 1,
      explanation: 'Une variable est un espace en mémoire qui permet de stocker et retrouver des données.'
    },
    {
      question: 'Quel symbole utilise-t-on pour affecter une valeur ?',
      options: ['=', '←', '->', ':='],
      correctIndex: 1,
      explanation: 'En algorithmique français, on utilise la flèche ← pour l\'affectation.'
    },
    {
      question: 'Comment déclare-t-on une variable entière "score" ?',
      options: ['score = ENTIER', 'ENTIER score', 'score : ENTIER', 'int score'],
      correctIndex: 2,
      explanation: 'On déclare avec la syntaxe : nom : TYPE'
    },
    // Questions enrichies
    {
      question: 'Quelle analogie décrit le mieux une variable ?',
      options: ['Un téléphone', 'Une boîte avec une étiquette', 'Un ordinateur', 'Un écran'],
      correctIndex: 1,
      explanation: 'Une variable est comme une boîte étiquetée où l\'on range une valeur.'
    },
    {
      question: 'Peut-on changer la valeur d\'une variable ?',
      options: ['Non, jamais', 'Oui, à tout moment', 'Seulement au début', 'Seulement avec MOD'],
      correctIndex: 1,
      explanation: 'C\'est pour cela qu\'on l\'appelle "variable" : sa valeur peut varier !'
    },
    {
      question: 'Que se passe-t-il si on affecte 20 à x qui valait 10 ?',
      options: ['x vaut 30', 'x vaut 10', 'x vaut 20', 'Erreur'],
      correctIndex: 2,
      explanation: 'La nouvelle valeur remplace l\'ancienne. x vaut maintenant 20.'
    },
    {
      question: 'Pourquoi donne-t-on un nom à une variable ?',
      options: ['Pour décorer', 'Pour la retrouver facilement', 'Par obligation légale', 'Pour l\'ordinateur'],
      correctIndex: 1,
      explanation: 'Le nom permet d\'identifier et de retrouver la variable dans le programme.'
    },
    {
      question: 'Où se situe la variable dans l\'ordinateur ?',
      options: ['Sur l\'écran', 'Dans le clavier', 'Dans la mémoire', 'Sur le disque dur uniquement'],
      correctIndex: 2,
      explanation: 'Une variable occupe un espace dans la mémoire vive (RAM) de l\'ordinateur.'
    },
    {
      question: 'Que signifie "x ← x + 1" ?',
      options: ['x égale 1', 'On ajoute 1 à x', 'x est supérieur à 1', 'On compare x à 1'],
      correctIndex: 1,
      explanation: 'On prend la valeur actuelle de x, on ajoute 1, et on remet le résultat dans x.'
    },
    {
      question: 'Comment appelle-t-on "age ← 25" ?',
      options: ['Une déclaration', 'Une affectation', 'Une comparaison', 'Une boucle'],
      correctIndex: 1,
      explanation: 'Mettre une valeur dans une variable s\'appelle une affectation.'
    },
    {
      question: 'Si prenom ← "Lucas", que contient prenom ?',
      options: ['Le nombre Lucas', 'La lettre L', 'Le texte "Lucas"', 'Rien'],
      correctIndex: 2,
      explanation: 'prenom contient la chaîne de caractères "Lucas".'
    },
    {
      question: 'Après : a ← 5, b ← a, a ← 10, que vaut b ?',
      options: ['5', '10', '15', 'Erreur'],
      correctIndex: 0,
      explanation: 'b a reçu la valeur de a au moment de l\'affectation (5), modifier a après ne change pas b.'
    },
  ],

  // =============================================
  // TYPES DE DONNÉES
  // =============================================
  'types': [
    // Questions originales
    {
      question: 'Quel type utiliser pour stocker un prix ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 1,
      explanation: 'Un prix peut avoir des centimes (décimales), donc on utilise REEL.'
    },
    {
      question: 'Quelle valeur est de type BOOLEEN ?',
      options: ['"oui"', '1', 'VRAI', '1.0'],
      correctIndex: 2,
      explanation: 'BOOLEEN n\'accepte que VRAI ou FAUX.'
    },
    {
      question: '"42" est de quel type ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 2,
      explanation: 'Avec les guillemets, c\'est du texte (CHAINE), pas un nombre!'
    },
    // Questions enrichies
    {
      question: 'Quel type pour stocker un âge ?',
      options: ['REEL', 'ENTIER', 'CHAINE', 'BOOLEEN'],
      correctIndex: 1,
      explanation: 'Un âge est un nombre entier (15 ans, pas 15.7 ans).'
    },
    {
      question: 'Quel type pour stocker "Bonjour" ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 2,
      explanation: 'Du texte entre guillemets est une CHAINE de caractères.'
    },
    {
      question: 'Quel type pour la valeur 3.14159 ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 1,
      explanation: 'Un nombre à virgule est de type REEL.'
    },
    {
      question: 'Quel type pour stocker si un utilisateur est connecté ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 3,
      explanation: 'Connecté ou non = VRAI ou FAUX, donc BOOLEEN.'
    },
    {
      question: 'La valeur -273 est de quel type ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 0,
      explanation: '-273 est un nombre entier négatif, donc ENTIER.'
    },
    {
      question: 'Quel type pour stocker un numéro de téléphone ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 2,
      explanation: 'Un numéro comme "06 12 34 56 78" est mieux stocké en CHAINE pour garder le format.'
    },
    {
      question: 'FAUX est de quel type ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 3,
      explanation: 'FAUX est une des deux valeurs possibles pour BOOLEEN.'
    },
    {
      question: 'Quel type pour stocker une température comme 36.5°C ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 1,
      explanation: '36.5 est un nombre à virgule, donc REEL.'
    },
    {
      question: 'Quel type pour le nombre d\'élèves dans une classe ?',
      options: ['ENTIER', 'REEL', 'CHAINE', 'BOOLEEN'],
      correctIndex: 0,
      explanation: 'Le nombre d\'élèves est toujours un nombre entier (25, pas 25.5).'
    },
    {
      question: 'Peut-on stocker "123" dans une variable ENTIER ?',
      options: ['Oui directement', 'Non, c\'est du texte', 'Seulement si c\'est positif', 'Oui avec des guillemets'],
      correctIndex: 1,
      explanation: '"123" avec guillemets est une CHAINE. 123 sans guillemets est un ENTIER.'
    },
  ],

  // =============================================
  // OPÉRATEURS
  // =============================================
  'operateurs': [
    // Questions originales
    {
      question: 'Que vaut 17 MOD 5 ?',
      options: ['3', '2', '12', '3.4'],
      correctIndex: 1,
      explanation: '17 divisé par 5 = 3 reste 2. MOD donne le reste.'
    },
    {
      question: 'Que vaut (VRAI OU FAUX) ET VRAI ?',
      options: ['VRAI', 'FAUX', 'Erreur', 'Impossible'],
      correctIndex: 0,
      explanation: 'VRAI OU FAUX = VRAI, puis VRAI ET VRAI = VRAI'
    },
    {
      question: 'Que vaut 2 + 3 * 4 ?',
      options: ['20', '14', '24', '9'],
      correctIndex: 1,
      explanation: 'La multiplication est prioritaire : 3*4=12, puis 2+12=14'
    },
    // Questions enrichies
    {
      question: 'Que vaut 20 MOD 7 ?',
      options: ['2', '6', '13', '3'],
      correctIndex: 1,
      explanation: '20 ÷ 7 = 2 reste 6. MOD retourne le reste.'
    },
    {
      question: 'Que vaut 15 / 3 ?',
      options: ['5', '12', '18', '45'],
      correctIndex: 0,
      explanation: '15 divisé par 3 égale 5.'
    },
    {
      question: 'Que vaut 8 - 3 + 2 ?',
      options: ['3', '7', '13', '5'],
      correctIndex: 1,
      explanation: 'De gauche à droite : 8-3=5, puis 5+2=7.'
    },
    {
      question: 'Que vaut (10 + 5) * 2 ?',
      options: ['20', '30', '25', '15'],
      correctIndex: 1,
      explanation: 'Parenthèses d\'abord : 10+5=15, puis 15*2=30.'
    },
    {
      question: 'Que vaut VRAI ET FAUX ?',
      options: ['VRAI', 'FAUX', 'Erreur', 'Impossible'],
      correctIndex: 1,
      explanation: 'ET retourne VRAI seulement si les deux sont VRAI.'
    },
    {
      question: 'Que vaut NON FAUX ?',
      options: ['VRAI', 'FAUX', 'Erreur', '0'],
      correctIndex: 0,
      explanation: 'NON inverse la valeur booléenne. NON FAUX = VRAI.'
    },
    {
      question: 'Que vaut 5 > 3 ?',
      options: ['VRAI', 'FAUX', '2', '8'],
      correctIndex: 0,
      explanation: '5 est bien supérieur à 3, donc la comparaison retourne VRAI.'
    },
    {
      question: 'Que vaut 10 = 10 ?',
      options: ['VRAI', 'FAUX', '10', '20'],
      correctIndex: 0,
      explanation: '10 est égal à 10, donc VRAI.'
    },
    {
      question: 'Que vaut 7 <> 7 ?',
      options: ['VRAI', 'FAUX', '0', '14'],
      correctIndex: 1,
      explanation: '7 n\'est pas différent de 7, donc FAUX.'
    },
    {
      question: 'Quel opérateur donne le reste d\'une division ?',
      options: ['/', '*', 'MOD', '-'],
      correctIndex: 2,
      explanation: 'MOD (modulo) retourne le reste de la division entière.'
    },
    {
      question: 'Que vaut 100 MOD 10 ?',
      options: ['10', '0', '90', '1'],
      correctIndex: 1,
      explanation: '100 est divisible par 10 sans reste, donc MOD = 0.'
    },
    {
      question: 'Que vaut 4 * 5 - 2 ?',
      options: ['18', '12', '22', '14'],
      correctIndex: 0,
      explanation: 'Multiplication d\'abord : 4*5=20, puis 20-2=18.'
    },
  ],

  // =============================================
  // CONDITIONS
  // =============================================
  'conditions': [
    // Questions originales
    {
      question: 'Quelle structure permet d\'exécuter du code seulement si une condition est vraie ?',
      options: ['POUR', 'TANT QUE', 'SI...ALORS', 'FONCTION'],
      correctIndex: 2,
      explanation: 'SI...ALORS permet d\'exécuter du code conditionnellement.'
    },
    {
      question: 'Comment terminer une structure conditionnelle ?',
      options: ['FIN', 'FINSI', 'END', 'STOP'],
      correctIndex: 1,
      explanation: 'Toute structure SI doit se terminer par FINSI.'
    },
    {
      question: 'Que se passe-t-il si la condition est FAUX et qu\'il n\'y a pas de SINON ?',
      options: ['Erreur', 'Le programme s\'arrête', 'Rien ne se passe', 'La condition devient VRAI'],
      correctIndex: 2,
      explanation: 'Sans SINON, le programme continue simplement après FINSI.'
    },
    // Questions enrichies
    {
      question: 'Si age = 15, que se passe-t-il avec : SI age >= 18 ALORS ?',
      options: ['Le bloc s\'exécute', 'Le bloc ne s\'exécute pas', 'Erreur', 'age devient 18'],
      correctIndex: 1,
      explanation: '15 >= 18 est FAUX, donc le bloc SI n\'est pas exécuté.'
    },
    {
      question: 'À quoi sert SINON SI ?',
      options: ['À terminer', 'À tester une autre condition', 'À répéter', 'À déclarer'],
      correctIndex: 1,
      explanation: 'SINON SI permet de tester une condition alternative.'
    },
    {
      question: 'Combien de conditions peut-on chaîner avec SINON SI ?',
      options: ['Une seule', 'Deux maximum', 'Autant que nécessaire', 'Zéro'],
      correctIndex: 2,
      explanation: 'On peut enchaîner autant de SINON SI que l\'on veut.'
    },
    {
      question: 'SI note >= 10 ALORS "Admis" SINON "Refusé". Si note = 10 ?',
      options: ['Refusé', 'Admis', 'Erreur', 'Rien'],
      correctIndex: 1,
      explanation: '10 >= 10 est VRAI, donc "Admis" est affiché.'
    },
    {
      question: 'Peut-on mettre un SI à l\'intérieur d\'un autre SI ?',
      options: ['Non jamais', 'Oui, c\'est l\'imbrication', 'Seulement avec SINON', 'Une fois maximum'],
      correctIndex: 1,
      explanation: 'On peut imbriquer les conditions autant que nécessaire.'
    },
    {
      question: 'Quelle différence entre SI...SINON et SI...SINON SI ?',
      options: ['Aucune', 'SINON SI teste une autre condition', 'SINON est plus rapide', 'SINON SI est obligatoire'],
      correctIndex: 1,
      explanation: 'SINON exécute toujours si le SI est faux, SINON SI vérifie une nouvelle condition.'
    },
    {
      question: 'SI x > 5 ET x < 10, pour quelles valeurs le bloc s\'exécute ?',
      options: ['5 et 10', '6, 7, 8, 9', 'Tous les nombres', 'Aucun'],
      correctIndex: 1,
      explanation: 'x doit être strictement entre 5 et 10 : 6, 7, 8 ou 9.'
    },
    {
      question: 'Si score = 85, quel message avec : SI score >= 90 "A" SINON SI score >= 80 "B" SINON "C" ?',
      options: ['A', 'B', 'C', 'Aucun'],
      correctIndex: 1,
      explanation: '85 >= 90 est FAUX, mais 85 >= 80 est VRAI, donc "B".'
    },
  ],

  // =============================================
  // BOUCLE POUR
  // =============================================
  'boucle-pour': [
    // Questions originales
    {
      question: 'Combien de fois s\'exécute POUR i ← 1 A 5 ?',
      options: ['4 fois', '5 fois', '6 fois', 'Infiniment'],
      correctIndex: 1,
      explanation: 'De 1 à 5 inclus = 5 itérations.'
    },
    {
      question: 'Comment terminer une boucle POUR ?',
      options: ['FIN', 'FINPOUR', 'ENDFOR', 'FIN POUR'],
      correctIndex: 1,
      explanation: 'La boucle POUR se termine par FINPOUR.'
    },
    {
      question: 'Que vaut i après POUR i ← 1 A 3 ?',
      options: ['1', '3', '4', 'Non défini après la boucle'],
      correctIndex: 1,
      explanation: 'Après la boucle, i garde sa dernière valeur (3).'
    },
    // Questions enrichies
    {
      question: 'Combien de fois s\'exécute POUR i ← 0 A 10 ?',
      options: ['10 fois', '11 fois', '9 fois', '12 fois'],
      correctIndex: 1,
      explanation: 'De 0 à 10 inclus = 11 itérations (0,1,2,...,10).'
    },
    {
      question: 'POUR i ← 5 A 5, combien d\'itérations ?',
      options: ['0', '1', '5', 'Infini'],
      correctIndex: 1,
      explanation: 'De 5 à 5, il y a une seule itération.'
    },
    {
      question: 'Que fait POUR i ← 10 A 1 PAS -1 ?',
      options: ['Erreur', 'Compte de 10 à 1', 'Ne fait rien', 'Boucle infinie'],
      correctIndex: 1,
      explanation: 'Avec PAS -1, la boucle compte à rebours de 10 vers 1.'
    },
    {
      question: 'Dans POUR i ← 1 A 4, quelles valeurs prend i ?',
      options: ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3, 4', '2, 3, 4'],
      correctIndex: 1,
      explanation: 'i prend les valeurs 1, 2, 3 et 4.'
    },
    {
      question: 'Quel est l\'avantage de POUR sur TANT QUE ?',
      options: ['Plus rapide', 'On connaît le nombre d\'itérations', 'Plus de possibilités', 'Aucun'],
      correctIndex: 1,
      explanation: 'POUR est idéal quand on sait exactement combien de fois répéter.'
    },
    {
      question: 'POUR i ← 1 A 10 PAS 2, quelles valeurs ?',
      options: ['1,2,3,4,5,6,7,8,9,10', '1,3,5,7,9', '2,4,6,8,10', '1,4,7,10'],
      correctIndex: 1,
      explanation: 'Avec PAS 2, i prend 1, puis 3, puis 5, puis 7, puis 9.'
    },
    {
      question: 'Si on écrit AFFICHER(i*2) dans POUR i ← 1 A 3, qu\'affiche-t-on ?',
      options: ['1, 2, 3', '2, 4, 6', '2, 2, 2', '6, 6, 6'],
      correctIndex: 1,
      explanation: 'i vaut 1,2,3 donc i*2 affiche 2, 4, 6.'
    },
    {
      question: 'Peut-on modifier i dans le corps de la boucle POUR ?',
      options: ['Oui, c\'est courant', 'Non, c\'est déconseillé/interdit', 'Seulement avec TANT QUE', 'Seulement si positif'],
      correctIndex: 1,
      explanation: 'Modifier le compteur dans une boucle POUR est généralement interdit ou déconseillé.'
    },
  ],

  // =============================================
  // BOUCLE TANT QUE
  // =============================================
  'boucle-tantque': [
    // Questions originales
    {
      question: 'Quand utilise-t-on TANT QUE plutôt que POUR ?',
      options: ['Jamais', 'Quand on ne sait pas combien de fois répéter', 'Quand on veut aller plus vite', 'Pour les nombres négatifs'],
      correctIndex: 1,
      explanation: 'TANT QUE est utile quand le nombre d\'itérations est inconnu à l\'avance.'
    },
    {
      question: 'Qu\'est-ce qu\'une boucle infinie ?',
      options: ['Une boucle très rapide', 'Une boucle qui ne s\'arrête jamais', 'Une boucle avec beaucoup de tours', 'Une erreur de syntaxe'],
      correctIndex: 1,
      explanation: 'Une boucle infinie ne s\'arrête jamais car sa condition reste toujours vraie.'
    },
    {
      question: 'Si x = 10, combien de fois s\'exécute : TANT QUE x < 5 ?',
      options: ['0 fois', '5 fois', '10 fois', 'Infiniment'],
      correctIndex: 0,
      explanation: 'La condition x < 5 est fausse dès le départ, donc 0 exécution.'
    },
    // Questions enrichies
    {
      question: 'Quand la condition de TANT QUE est-elle vérifiée ?',
      options: ['À la fin de chaque tour', 'Avant chaque tour', 'Une seule fois au début', 'Jamais'],
      correctIndex: 1,
      explanation: 'La condition est vérifiée AVANT chaque itération.'
    },
    {
      question: 'Comment éviter une boucle infinie ?',
      options: ['Utiliser POUR', 'S\'assurer que la condition finit par être fausse', 'Ajouter des commentaires', 'Utiliser des grands nombres'],
      correctIndex: 1,
      explanation: 'Il faut s\'assurer que quelque chose dans la boucle rendra la condition fausse.'
    },
    {
      question: 'x ← 1, TANT QUE x <= 3 FAIRE x ← x+1. Combien d\'itérations ?',
      options: ['1', '2', '3', 'Infini'],
      correctIndex: 2,
      explanation: 'x passe de 1→2→3→4, 3 itérations avant que x>3.'
    },
    {
      question: 'Quelle structure pour lire jusqu\'à ce que l\'utilisateur entre 0 ?',
      options: ['POUR', 'TANT QUE', 'SI', 'FONCTION'],
      correctIndex: 1,
      explanation: 'On ne sait pas combien de valeurs l\'utilisateur va entrer, donc TANT QUE.'
    },
    {
      question: 'n ← 10, TANT QUE n > 0 FAIRE n ← n-3. Valeurs de n ?',
      options: ['10,7,4,1', '10,7,4,1,-2', '7,4,1', '10,7,4'],
      correctIndex: 1,
      explanation: 'n prend 10, puis 7, 4, 1, -2 (où -2 > 0 est faux, on s\'arrête).'
    },
    {
      question: 'TANT QUE VRAI FAIRE est :',
      options: ['Impossible', 'Une boucle infinie', 'Équivalent à POUR', 'Une erreur'],
      correctIndex: 1,
      explanation: 'VRAI est toujours vrai, donc la boucle ne s\'arrête jamais.'
    },
    {
      question: 'Peut-on transformer tout POUR en TANT QUE ?',
      options: ['Non', 'Oui', 'Seulement les petites boucles', 'Jamais'],
      correctIndex: 1,
      explanation: 'Tout POUR peut s\'écrire avec TANT QUE, l\'inverse n\'est pas toujours vrai.'
    },
  ],

  // =============================================
  // TABLEAUX
  // =============================================
  'tableaux': [
    // Questions originales
    {
      question: 'Qu\'est-ce qu\'un tableau ?',
      options: ['Un type de boucle', 'Une variable contenant plusieurs valeurs', 'Un type de condition', 'Un opérateur'],
      correctIndex: 1,
      explanation: 'Un tableau stocke plusieurs valeurs du même type.'
    },
    {
      question: 'Comment accède-t-on au 3ème élément du tableau T ?',
      options: ['T(3)', 'T.3', 'T[3]', 'T{3}'],
      correctIndex: 2,
      explanation: 'On utilise les crochets : T[indice]'
    },
    {
      question: 'Quel est l\'indice du premier élément (en algorithmique) ?',
      options: ['0', '1', '-1', 'Dépend du tableau'],
      correctIndex: 1,
      explanation: 'En algorithmique classique, les indices commencent à 1.'
    },
    // Questions enrichies
    {
      question: 'TABLEAU[10] DE ENTIER déclare combien de cases ?',
      options: ['9', '10', '11', '0'],
      correctIndex: 1,
      explanation: 'Le nombre entre crochets indique le nombre de cases.'
    },
    {
      question: 'Tous les éléments d\'un tableau doivent-ils être du même type ?',
      options: ['Non', 'Oui', 'Seulement les nombres', 'Dépend de la taille'],
      correctIndex: 1,
      explanation: 'Un tableau contient des éléments d\'un seul et même type.'
    },
    {
      question: 'Si T[1]=5 et T[2]=10, que vaut T[1]+T[2] ?',
      options: ['52', '15', '[1][2]', 'Erreur'],
      correctIndex: 1,
      explanation: 'On additionne les valeurs : 5 + 10 = 15.'
    },
    {
      question: 'Comment parcourir un tableau de 10 éléments ?',
      options: ['10 instructions AFFICHER', 'TANT QUE uniquement', 'POUR i ← 1 A 10', 'Impossible'],
      correctIndex: 2,
      explanation: 'Une boucle POUR est idéale pour parcourir un tableau.'
    },
    {
      question: 'Quelle instruction met 100 dans la 5ème case de T ?',
      options: ['T ← 100[5]', 'T[5] ← 100', '100 ← T[5]', 'T(5) = 100'],
      correctIndex: 1,
      explanation: 'On accède à la case avec T[5] puis on affecte avec ←.'
    },
    {
      question: 'Pour calculer la somme d\'un tableau, on a besoin de :',
      options: ['Juste AFFICHER', 'Une boucle et un accumulateur', 'La fonction SOMME', 'Rien de spécial'],
      correctIndex: 1,
      explanation: 'On parcourt avec une boucle en accumulant les valeurs.'
    },
    {
      question: 'Si T a 5 cases, que se passe-t-il avec T[6] ?',
      options: ['Retourne 0', 'Erreur (hors limites)', 'Crée une 6ème case', 'Retourne T[1]'],
      correctIndex: 1,
      explanation: 'Accéder à un indice hors du tableau provoque une erreur.'
    },
  ],

  // =============================================
  // CHAÎNES
  // =============================================
  'chaines': [
    // Questions originales
    {
      question: 'Comment concatène-t-on deux chaînes ?',
      options: ['Avec &', 'Avec +', 'Avec ,', 'Avec .'],
      correctIndex: 1,
      explanation: 'Le + permet de concaténer (assembler) deux chaînes.'
    },
    {
      question: 'Que retourne LONGUEUR("Algo") ?',
      options: ['3', '4', '5', 'Erreur'],
      correctIndex: 1,
      explanation: '"Algo" contient 4 caractères : A, l, g, o.'
    },
    {
      question: 'Une chaîne peut-elle contenir des chiffres ?',
      options: ['Non, jamais', 'Oui, mais ils deviennent du texte', 'Seulement à la fin', 'Seulement au début'],
      correctIndex: 1,
      explanation: '"123" est une chaîne, pas un nombre. On ne peut pas faire de calculs avec.'
    },
    // Questions enrichies
    {
      question: '"Bon" + "jour" donne :',
      options: ['Bonjour', '"Bon" + "jour"', 'Bon jour', 'Erreur'],
      correctIndex: 0,
      explanation: 'La concaténation assemble les chaînes : "Bonjour".'
    },
    {
      question: 'Que retourne LONGUEUR("") ?',
      options: ['1', '0', 'Erreur', '-1'],
      correctIndex: 1,
      explanation: 'Une chaîne vide ne contient aucun caractère, donc 0.'
    },
    {
      question: 'Si mot ← "HELLO", que vaut mot[1] ?',
      options: ['H', 'E', 'HELLO', 'Erreur'],
      correctIndex: 0,
      explanation: 'Le premier caractère (indice 1) est "H".'
    },
    {
      question: 'MAJUSCULE("bonjour") retourne :',
      options: ['bonjour', 'BONJOUR', 'Bonjour', 'Erreur'],
      correctIndex: 1,
      explanation: 'MAJUSCULE convertit toute la chaîne en majuscules.'
    },
    {
      question: '"Hello" + " " + "World" donne :',
      options: ['HelloWorld', 'Hello World', '"Hello" " " "World"', 'Erreur'],
      correctIndex: 1,
      explanation: 'On concatène avec un espace au milieu : "Hello World".'
    },
    {
      question: 'Que retourne LONGUEUR("Bonjour !") ?',
      options: ['7', '8', '9', '10'],
      correctIndex: 2,
      explanation: '9 caractères : B-o-n-j-o-u-r-espace-!'
    },
    {
      question: 'SOUS_CHAINE("Algorithme", 1, 4) retourne :',
      options: ['Algo', 'lgor', 'A', 'Algorithme'],
      correctIndex: 0,
      explanation: 'On extrait du caractère 1 au caractère 4 : "Algo".'
    },
  ],

  // =============================================
  // PROCÉDURES
  // =============================================
  'procedures': [
    {
      question: 'Qu\'est-ce qu\'une procédure ?',
      options: ['Un type de variable', 'Un bloc de code nommé réutilisable', 'Une boucle spéciale', 'Un opérateur'],
      correctIndex: 1,
      explanation: 'Une procédure est un bloc de code qu\'on peut appeler par son nom.'
    },
    {
      question: 'Quel est l\'avantage principal des procédures ?',
      options: ['Vitesse', 'Éviter la répétition de code', 'Utiliser moins de mémoire', 'Aucun'],
      correctIndex: 1,
      explanation: 'Les procédures permettent de réutiliser du code sans le réécrire.'
    },
    {
      question: 'Comment appelle-t-on les valeurs passées à une procédure ?',
      options: ['Variables', 'Paramètres', 'Résultats', 'Retours'],
      correctIndex: 1,
      explanation: 'Les paramètres sont les valeurs transmises à une procédure lors de son appel.'
    },
    {
      question: 'Une procédure retourne-t-elle une valeur ?',
      options: ['Oui, toujours', 'Non, jamais', 'Seulement si on le demande', 'Dépend du type'],
      correctIndex: 1,
      explanation: 'Une procédure exécute des actions mais ne retourne pas de valeur (contrairement à une fonction).'
    },
    {
      question: 'Comment termine-t-on une procédure ?',
      options: ['FIN', 'FINPROCEDURE', 'END', 'RETOURNER'],
      correctIndex: 1,
      explanation: 'Une procédure se termine par FINPROCEDURE.'
    },
    {
      question: 'Peut-on appeler une procédure plusieurs fois ?',
      options: ['Non', 'Une seule fois', 'Oui, autant qu\'on veut', 'Maximum 10 fois'],
      correctIndex: 2,
      explanation: 'C\'est tout l\'intérêt : on peut réutiliser la procédure à volonté.'
    },
  ],

  // =============================================
  // FONCTIONS
  // =============================================
  'fonctions': [
    {
      question: 'Quelle est la différence entre fonction et procédure ?',
      options: ['Aucune', 'La fonction retourne une valeur', 'La procédure est plus rapide', 'La fonction n\'a pas de paramètres'],
      correctIndex: 1,
      explanation: 'Une fonction retourne une valeur, pas une procédure.'
    },
    {
      question: 'Quel mot-clé permet de retourner une valeur ?',
      options: ['RETOURNER', 'AFFICHER', 'SORTIR', 'DONNER'],
      correctIndex: 0,
      explanation: 'RETOURNER renvoie la valeur au code qui a appelé la fonction.'
    },
    {
      question: 'Comment utilise-t-on le résultat d\'une fonction ?',
      options: ['On ne peut pas', 'On l\'affiche seulement', 'On l\'affecte à une variable', 'On le stocke automatiquement'],
      correctIndex: 2,
      explanation: 'On peut stocker le résultat dans une variable : x ← MaFonction(5)'
    },
    {
      question: 'Une fonction sans RETOURNER est :',
      options: ['Normale', 'Une procédure', 'Impossible', 'Plus rapide'],
      correctIndex: 1,
      explanation: 'Sans retour de valeur, c\'est en fait une procédure.'
    },
    {
      question: 'Double(5) avec Double(x) qui retourne x*2, donne :',
      options: ['5', '10', '25', '2'],
      correctIndex: 1,
      explanation: '5 * 2 = 10.'
    },
    {
      question: 'Peut-on appeler une fonction dans une expression ?',
      options: ['Non', 'Oui', 'Seulement avec +', 'Seulement dans SI'],
      correctIndex: 1,
      explanation: 'On peut écrire : resultat ← 3 + Carre(4) par exemple.'
    },
  ],

  // =============================================
  // RECHERCHE
  // =============================================
  'recherche': [
    {
      question: 'Qu\'est-ce que la recherche séquentielle ?',
      options: ['Recherche par dichotomie', 'Parcourir élément par élément', 'Recherche dans un arbre', 'Recherche aléatoire'],
      correctIndex: 1,
      explanation: 'La recherche séquentielle vérifie chaque élément du début à la fin.'
    },
    {
      question: 'Quelle est la complexité de la recherche séquentielle ?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctIndex: 2,
      explanation: 'Dans le pire cas, on parcourt tous les n éléments.'
    },
    {
      question: 'La recherche dichotomique nécessite un tableau :',
      options: ['Quelconque', 'Trié', 'De taille paire', 'Avec des entiers'],
      correctIndex: 1,
      explanation: 'La dichotomie ne fonctionne que sur un tableau déjà trié.'
    },
    {
      question: 'Complexité de la recherche dichotomique ?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      correctIndex: 1,
      explanation: 'On divise par 2 à chaque étape, donc O(log n).'
    },
    {
      question: 'Recherche dans [2,5,8,12], on cherche 8. Dichotomie : premier milieu ?',
      options: ['2', '5 ou 8', '12', '8'],
      correctIndex: 1,
      explanation: 'Le milieu est l\'indice 2 ou 3, soit 5 ou 8 selon l\'arrondi.'
    },
    {
      question: 'Si l\'élément n\'est pas trouvé, la recherche retourne souvent :',
      options: ['0', '-1 ou FAUX', 'Le dernier élément', 'Erreur obligatoire'],
      correctIndex: 1,
      explanation: 'On retourne généralement -1 ou FAUX pour indiquer l\'absence.'
    },
  ],

  // =============================================
  // TRI
  // =============================================
  'tri': [
    {
      question: 'Quel est le principe du tri par sélection ?',
      options: ['Insérer au bon endroit', 'Trouver le min et le placer', 'Comparer les voisins', 'Diviser en deux'],
      correctIndex: 1,
      explanation: 'On sélectionne le minimum et on le place au début, puis on recommence.'
    },
    {
      question: 'Complexité du tri par sélection ?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      correctIndex: 2,
      explanation: 'Deux boucles imbriquées donnent O(n²).'
    },
    {
      question: 'Le tri à bulles compare :',
      options: ['Tous les éléments en même temps', 'Les éléments voisins', 'Le premier et le dernier', 'Rien'],
      correctIndex: 1,
      explanation: 'On compare et échange les éléments adjacents.'
    },
    {
      question: 'Un tri est dit "stable" si :',
      options: ['Il ne plante pas', 'Il préserve l\'ordre des égaux', 'Il est rapide', 'Il utilise peu de mémoire'],
      correctIndex: 1,
      explanation: 'Un tri stable conserve l\'ordre relatif des éléments égaux.'
    },
    {
      question: 'Quel tri est généralement plus efficace ?',
      options: ['Tri à bulles', 'Tri par sélection', 'Tri fusion', 'Tous pareils'],
      correctIndex: 2,
      explanation: 'Le tri fusion est en O(n log n), plus efficace que O(n²).'
    },
    {
      question: 'Après un passage du tri à bulles, qu\'est-ce qui est garanti ?',
      options: ['Tout est trié', 'Le plus grand est à la fin', 'Le plus petit est au début', 'Rien'],
      correctIndex: 1,
      explanation: 'Les plus grands éléments "remontent" vers la fin comme des bulles.'
    },
  ],

  // =============================================
  // RÉCURSIVITÉ
  // =============================================
  'recursivite': [
    {
      question: 'Qu\'est-ce qu\'une fonction récursive ?',
      options: ['Une fonction rapide', 'Une fonction qui s\'appelle elle-même', 'Une fonction sans paramètre', 'Une fonction dans une boucle'],
      correctIndex: 1,
      explanation: 'Une fonction récursive contient un appel à elle-même.'
    },
    {
      question: 'Qu\'est-ce que le cas de base ?',
      options: ['Le premier appel', 'Le cas où on ne rappelle pas la fonction', 'Le cas le plus complexe', 'Le paramètre par défaut'],
      correctIndex: 1,
      explanation: 'Le cas de base arrête la récursion en retournant directement un résultat.'
    },
    {
      question: 'Sans cas de base, que se passe-t-il ?',
      options: ['Rien', 'Récursion infinie', 'Le programme optimise', 'Retour automatique'],
      correctIndex: 1,
      explanation: 'Sans condition d\'arrêt, la fonction s\'appelle indéfiniment.'
    },
    {
      question: 'factorielle(0) retourne généralement :',
      options: ['0', '1', 'Erreur', 'Infini'],
      correctIndex: 1,
      explanation: 'Par définition, 0! = 1 (c\'est le cas de base).'
    },
    {
      question: 'La suite de Fibonacci utilise :',
      options: ['La récursivité simple', 'Deux appels récursifs', 'Aucune récursivité', 'Trois appels'],
      correctIndex: 1,
      explanation: 'fib(n) = fib(n-1) + fib(n-2), donc deux appels.'
    },
    {
      question: 'Avantage de la récursivité :',
      options: ['Toujours plus rapide', 'Code souvent plus simple', 'Utilise moins de mémoire', 'Aucun'],
      correctIndex: 1,
      explanation: 'La récursivité simplifie souvent la logique du code.'
    },
  ],

  // =============================================
  // COMPLEXITÉ
  // =============================================
  'complexite': [
    {
      question: 'Que mesure la complexité temporelle ?',
      options: ['La mémoire utilisée', 'Le temps d\'exécution selon la taille', 'La difficulté du code', 'Le nombre de lignes'],
      correctIndex: 1,
      explanation: 'La complexité temporelle estime comment le temps évolue avec la taille de l\'entrée.'
    },
    {
      question: 'O(1) signifie :',
      options: ['Temps variable', 'Temps constant', 'Temps linéaire', 'Impossible'],
      correctIndex: 1,
      explanation: 'O(1) indique un temps qui ne dépend pas de la taille des données.'
    },
    {
      question: 'O(n) signifie :',
      options: ['Temps constant', 'Temps linéaire', 'Temps quadratique', 'Temps logarithmique'],
      correctIndex: 1,
      explanation: 'O(n) : le temps augmente proportionnellement à n.'
    },
    {
      question: 'Quelle complexité est la meilleure ?',
      options: ['O(n²)', 'O(n)', 'O(log n)', 'O(2ⁿ)'],
      correctIndex: 2,
      explanation: 'O(log n) croît très lentement, c\'est excellent.'
    },
    {
      question: 'Une double boucle imbriquée donne généralement :',
      options: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],
      correctIndex: 1,
      explanation: 'Deux boucles imbriquées de taille n donnent n × n = O(n²).'
    },
    {
      question: 'O(n log n) est typique de quel algorithme ?',
      options: ['Recherche linéaire', 'Tri fusion', 'Tri à bulles', 'Accès tableau'],
      correctIndex: 1,
      explanation: 'Le tri fusion et le tri rapide sont en O(n log n) en moyenne.'
    },
  ],
};

// Nombre de questions à sélectionner par quiz
export const QUIZ_QUESTIONS_COUNT = 5;

// Fonction utilitaire pour mélanger un tableau (Fisher-Yates shuffle)
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Fonction pour obtenir un ensemble aléatoire de questions pour un topic
export function getRandomQuestions(topicId: string, count: number = QUIZ_QUESTIONS_COUNT): QuizQuestion[] {
  const questionPool = quizQuestionBank[topicId];
  
  if (!questionPool || questionPool.length === 0) {
    console.warn(`No questions found for topic: ${topicId}`);
    return [];
  }
  
  // Mélanger les questions
  const shuffled = shuffleArray(questionPool);
  
  // Retourner le nombre demandé (ou toutes si moins disponibles)
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
