import { BookOpen, Calculator, GitBranch, Repeat, Table2, Type, Boxes, Search, ArrowUpDown, Sparkles, Brain, AlertTriangle, Trophy, Code2, Variable, Binary, Layers } from 'lucide-react';

export interface LessonSection {
  title: string;
  content: string;
  code?: string;
  illustration?: 'box' | 'flow' | 'comparison' | 'loop' | 'array' | 'tree' | 'sort';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Exercise {
  id: string;
  title: string;
  instruction: string;
  starterCode: string;
  hints: string[];
  validation: {
    type: 'contains' | 'exact' | 'regex' | 'output';
    patterns: string[];
  };
  solution: string;
}

export interface Topic {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  color: string;
  difficulty: 'debutant' | 'intermediaire' | 'avance';
  duration: number; // in minutes
  prerequisites: string[];
  lessons: LessonSection[];
  quiz: QuizQuestion[];
  exercises: Exercise[];
  xpReward: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
  badge: {
    name: string;
    icon: string;
    description: string;
  };
}

export const learningModules: Module[] = [
  {
    id: 'fondamentaux',
    title: 'Les Fondamentaux',
    description: 'Maîtrise les bases essentielles de l\'algorithmique',
    icon: 'BookOpen',
    color: 'from-blue-500 to-cyan-500',
    badge: {
      name: 'Apprenti Algorithme',
      icon: '🎓',
      description: 'Tu as maîtrisé les fondamentaux!'
    },
    topics: [
      {
        id: 'variables',
        title: 'Les Variables',
        shortDescription: 'Déclarer, affecter et manipuler des données',
        icon: 'Variable',
        color: 'from-blue-400 to-blue-600',
        difficulty: 'debutant',
        duration: 20,
        prerequisites: [],
        xpReward: 100,
        lessons: [
          {
            title: 'Qu\'est-ce qu\'une variable ?',
            content: 'Une **variable** est comme une boîte avec une étiquette. Elle permet de stocker une valeur en mémoire et de la retrouver grâce à son nom.\n\nImagine une boîte étiquetée "age" dans laquelle tu ranges le nombre 12. Quand tu veux savoir l\'âge, tu regardes dans la boîte "age".',
            illustration: 'box'
          },
          {
            title: 'Déclarer une variable',
            content: 'En algorithmique, on **déclare** une variable en précisant son **nom** et son **type**. Le type indique quel genre de données la variable peut contenir.',
            code: 'VARIABLES\n    age : ENTIER\n    nom : CHAINE\n    estMajeur : BOOLEEN'
          },
          {
            title: 'Affecter une valeur',
            content: 'L\'**affectation** permet de mettre une valeur dans une variable. On utilise la flèche ← pour affecter.',
            code: 'age ← 15\nnom ← "Alice"\nestMajeur ← FAUX'
          },
          {
            title: 'Modifier une variable',
            content: 'Une variable peut changer de valeur au cours du programme. La nouvelle valeur remplace l\'ancienne.',
            code: 'compteur ← 0\ncompteur ← compteur + 1\n// compteur vaut maintenant 1'
          }
        ],
        quiz: [
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
          }
        ],
        exercises: [
          {
            id: 'var-ex1',
            title: 'Première variable',
            instruction: 'Déclare une variable "age" de type ENTIER et affecte-lui la valeur 12. Puis affiche-la.',
            starterCode: 'ALGORITHME MaPremiereVariable\nVARIABLES\n    // Déclare ta variable ici\nDEBUT\n    // Affecte et affiche ici\nFIN',
            hints: ['Utilise "age : ENTIER" dans VARIABLES', 'Utilise "age ← 12" pour affecter', 'Utilise AFFICHER(age)'],
            validation: {
              type: 'contains',
              patterns: ['age', 'ENTIER', '←', 'AFFICHER']
            },
            solution: 'ALGORITHME MaPremiereVariable\nVARIABLES\n    age : ENTIER\nDEBUT\n    age ← 12\n    AFFICHER(age)\nFIN'
          },
          {
            id: 'var-ex2',
            title: 'Plusieurs variables',
            instruction: 'Déclare trois variables : "nom" (CHAINE), "age" (ENTIER), "moyenne" (REEL). Affecte-leur des valeurs et affiche-les.',
            starterCode: 'ALGORITHME MesVariables\nVARIABLES\n    // Tes déclarations\nDEBUT\n    // Tes affectations et affichages\nFIN',
            hints: ['Déclare chaque variable sur une ligne', 'N\'oublie pas les guillemets pour CHAINE'],
            validation: {
              type: 'contains',
              patterns: ['nom', 'CHAINE', 'age', 'ENTIER', 'moyenne', 'REEL']
            },
            solution: 'ALGORITHME MesVariables\nVARIABLES\n    nom : CHAINE\n    age : ENTIER\n    moyenne : REEL\nDEBUT\n    nom ← "Alice"\n    age ← 15\n    moyenne ← 14.5\n    AFFICHER(nom)\n    AFFICHER(age)\n    AFFICHER(moyenne)\nFIN'
          }
        ]
      },
      {
        id: 'types',
        title: 'Les Types de Données',
        shortDescription: 'ENTIER, REEL, CHAINE, BOOLEEN et leurs usages',
        icon: 'Binary',
        color: 'from-purple-400 to-purple-600',
        difficulty: 'debutant',
        duration: 25,
        prerequisites: ['variables'],
        xpReward: 120,
        lessons: [
          {
            title: 'Pourquoi les types ?',
            content: 'Chaque variable a un **type** qui définit quelles valeurs elle peut contenir et quelles opérations sont possibles.\n\nC\'est comme des boîtes de formes différentes : une boîte ronde pour les balles, une boîte carrée pour les cubes.',
            illustration: 'box'
          },
          {
            title: 'ENTIER',
            content: 'Le type **ENTIER** stocke des nombres entiers (positifs ou négatifs, sans virgule).\n\nExemples : -5, 0, 42, 1000',
            code: 'age : ENTIER\nage ← 25\n\ntemperature : ENTIER\ntemperature ← -3'
          },
          {
            title: 'REEL',
            content: 'Le type **REEL** stocke des nombres à virgule (décimaux).\n\nExemples : 3.14, -0.5, 100.0',
            code: 'prix : REEL\nprix ← 19.99\n\npi : REEL\npi ← 3.14159'
          },
          {
            title: 'CHAINE',
            content: 'Le type **CHAINE** stocke du texte (entre guillemets).\n\nExemples : "Bonjour", "Alice", "123" (c\'est du texte, pas un nombre!)',
            code: 'message : CHAINE\nmessage ← "Bienvenue !"\n\nnom : CHAINE\nnom ← "Marie"'
          },
          {
            title: 'BOOLEEN',
            content: 'Le type **BOOLEEN** ne peut avoir que deux valeurs : VRAI ou FAUX.\n\nTrès utile pour les conditions et les tests.',
            code: 'estMajeur : BOOLEEN\nestMajeur ← VRAI\n\naFini : BOOLEEN\naFini ← FAUX'
          }
        ],
        quiz: [
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
          }
        ],
        exercises: [
          {
            id: 'types-ex1',
            title: 'Choisir le bon type',
            instruction: 'Déclare les variables suivantes avec le bon type : "temperature" (peut être négative avec décimales), "nbEleves" (nombre entier), "estReussi" (vrai ou faux)',
            starterCode: 'ALGORITHME BonsTypes\nVARIABLES\n    // Déclare tes variables\nDEBUT\n    // Affecte des valeurs cohérentes\nFIN',
            hints: ['temperature doit pouvoir contenir 36.5 ou -2.3', 'nbEleves est toujours un nombre entier', 'estReussi est soit VRAI soit FAUX'],
            validation: {
              type: 'contains',
              patterns: ['temperature', 'REEL', 'nbEleves', 'ENTIER', 'estReussi', 'BOOLEEN']
            },
            solution: 'ALGORITHME BonsTypes\nVARIABLES\n    temperature : REEL\n    nbEleves : ENTIER\n    estReussi : BOOLEEN\nDEBUT\n    temperature ← 36.5\n    nbEleves ← 25\n    estReussi ← VRAI\nFIN'
          }
        ]
      },
      {
        id: 'operateurs',
        title: 'Les Opérateurs',
        shortDescription: 'Arithmétiques, relationnels et logiques',
        icon: 'Calculator',
        color: 'from-green-400 to-green-600',
        difficulty: 'debutant',
        duration: 30,
        prerequisites: ['variables', 'types'],
        xpReward: 150,
        lessons: [
          {
            title: 'Opérateurs arithmétiques',
            content: 'Ces opérateurs permettent de faire des calculs mathématiques :\n\n• **+** : addition\n• **-** : soustraction\n• ***** : multiplication\n• **/** : division\n• **MOD** : reste de la division (modulo)',
            code: 'a ← 10 + 5      // 15\nb ← 10 - 3      // 7\nc ← 4 * 3       // 12\nd ← 15 / 3      // 5\ne ← 17 MOD 5    // 2 (reste)'
          },
          {
            title: 'Opérateurs relationnels',
            content: 'Ces opérateurs comparent deux valeurs et retournent VRAI ou FAUX :\n\n• **=** : égal\n• **≠** ou **<>** : différent\n• **<** : inférieur\n• **>** : supérieur\n• **≤** ou **<=** : inférieur ou égal\n• **≥** ou **>=** : supérieur ou égal',
            code: '5 = 5     // VRAI\n5 <> 3    // VRAI\n10 < 20   // VRAI\n5 >= 5    // VRAI',
            illustration: 'comparison'
          },
          {
            title: 'Opérateurs logiques',
            content: 'Ces opérateurs combinent des conditions booléennes :\n\n• **ET** : vrai si les deux sont vrais\n• **OU** : vrai si au moins un est vrai\n• **NON** : inverse la valeur',
            code: 'VRAI ET VRAI    // VRAI\nVRAI ET FAUX    // FAUX\nVRAI OU FAUX    // VRAI\nNON VRAI        // FAUX'
          },
          {
            title: 'Priorité des opérations',
            content: 'Comme en maths, les opérations ont un ordre de priorité :\n\n1. Parenthèses ()\n2. NON\n3. *, /, MOD\n4. +, -\n5. Comparaisons\n6. ET\n7. OU',
            code: 'resultat ← 2 + 3 * 4     // 14 (pas 20!)\nresultat ← (2 + 3) * 4   // 20'
          }
        ],
        quiz: [
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
          }
        ],
        exercises: [
          {
            id: 'op-ex1',
            title: 'Calculs simples',
            instruction: 'Calcule et affiche le résultat de : 15 + 7, 100 - 42, 6 * 8, 45 / 9, et 23 MOD 5',
            starterCode: 'ALGORITHME Calculs\nVARIABLES\n    resultat : ENTIER\nDEBUT\n    // Fais tes calculs\nFIN',
            hints: ['Utilise resultat ← pour chaque calcul', 'N\'oublie pas AFFICHER après chaque calcul'],
            validation: {
              type: 'contains',
              patterns: ['15 + 7', '100 - 42', '6 * 8', '45 / 9', '23 MOD 5', 'AFFICHER']
            },
            solution: 'ALGORITHME Calculs\nVARIABLES\n    resultat : ENTIER\nDEBUT\n    resultat ← 15 + 7\n    AFFICHER(resultat)\n    resultat ← 100 - 42\n    AFFICHER(resultat)\n    resultat ← 6 * 8\n    AFFICHER(resultat)\n    resultat ← 45 / 9\n    AFFICHER(resultat)\n    resultat ← 23 MOD 5\n    AFFICHER(resultat)\nFIN'
          }
        ]
      }
    ]
  },
  {
    id: 'structures-controle',
    title: 'Structures de Contrôle',
    description: 'Maîtrise les conditions et les boucles',
    icon: 'GitBranch',
    color: 'from-orange-500 to-red-500',
    badge: {
      name: 'Maître des Flux',
      icon: '🔀',
      description: 'Tu contrôles parfaitement le flux d\'exécution!'
    },
    topics: [
      {
        id: 'conditions',
        title: 'Les Conditions',
        shortDescription: 'SI, SINON, SINON SI - prendre des décisions',
        icon: 'GitBranch',
        color: 'from-orange-400 to-orange-600',
        difficulty: 'debutant',
        duration: 35,
        prerequisites: ['operateurs'],
        xpReward: 180,
        lessons: [
          {
            title: 'Pourquoi des conditions ?',
            content: 'Les conditions permettent au programme de **prendre des décisions**.\n\nDans la vie : "S\'il pleut, je prends un parapluie, sinon je mets des lunettes de soleil."\n\nEn algorithmique, c\'est pareil !',
            illustration: 'flow'
          },
          {
            title: 'La structure SI...ALORS...FINSI',
            content: 'La forme la plus simple de condition :\n\nSI la condition est vraie, on exécute le bloc. Sinon, on passe.',
            code: 'SI age >= 18 ALORS\n    AFFICHER("Tu es majeur")\nFINSI'
          },
          {
            title: 'SI...ALORS...SINON...FINSI',
            content: 'Quand on veut faire quelque chose dans les deux cas :',
            code: 'SI note >= 10 ALORS\n    AFFICHER("Bravo, tu as réussi !")\nSINON\n    AFFICHER("Courage, tu feras mieux !")\nFINSI'
          },
          {
            title: 'Conditions imbriquées',
            content: 'On peut mettre plusieurs conditions avec SINON SI :',
            code: 'SI note >= 16 ALORS\n    AFFICHER("Très bien !")\nSINON SI note >= 12 ALORS\n    AFFICHER("Bien")\nSINON SI note >= 10 ALORS\n    AFFICHER("Passable")\nSINON\n    AFFICHER("Insuffisant")\nFINSI'
          }
        ],
        quiz: [
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
          }
        ],
        exercises: [
          {
            id: 'cond-ex1',
            title: 'Majeur ou mineur',
            instruction: 'Écris un algorithme qui lit un âge et affiche "Majeur" si l\'âge est >= 18, sinon "Mineur".',
            starterCode: 'ALGORITHME MajeurMineur\nVARIABLES\n    age : ENTIER\nDEBUT\n    LIRE(age)\n    // Ta condition ici\nFIN',
            hints: ['Utilise SI...SINON...FINSI', 'Compare age avec 18'],
            validation: {
              type: 'contains',
              patterns: ['SI', 'age', '>=', '18', 'ALORS', 'SINON', 'FINSI', 'AFFICHER']
            },
            solution: 'ALGORITHME MajeurMineur\nVARIABLES\n    age : ENTIER\nDEBUT\n    LIRE(age)\n    SI age >= 18 ALORS\n        AFFICHER("Majeur")\n    SINON\n        AFFICHER("Mineur")\n    FINSI\nFIN'
          },
          {
            id: 'cond-ex2',
            title: 'Notes et mentions',
            instruction: 'Écris un algorithme qui lit une note et affiche : "Excellent" (>=16), "Bien" (>=12), "Passable" (>=10), ou "Insuffisant".',
            starterCode: 'ALGORITHME Mentions\nVARIABLES\n    note : ENTIER\nDEBUT\n    LIRE(note)\n    // Tes conditions ici\nFIN',
            hints: ['Utilise SINON SI pour les cas intermédiaires', 'Commence par la plus grande valeur'],
            validation: {
              type: 'contains',
              patterns: ['SI', 'SINON SI', 'SINON', 'FINSI', '16', '12', '10']
            },
            solution: 'ALGORITHME Mentions\nVARIABLES\n    note : ENTIER\nDEBUT\n    LIRE(note)\n    SI note >= 16 ALORS\n        AFFICHER("Excellent")\n    SINON SI note >= 12 ALORS\n        AFFICHER("Bien")\n    SINON SI note >= 10 ALORS\n        AFFICHER("Passable")\n    SINON\n        AFFICHER("Insuffisant")\n    FINSI\nFIN'
          }
        ]
      },
      {
        id: 'boucle-pour',
        title: 'La Boucle POUR',
        shortDescription: 'Répéter un nombre précis de fois',
        icon: 'Repeat',
        color: 'from-red-400 to-red-600',
        difficulty: 'debutant',
        duration: 30,
        prerequisites: ['conditions'],
        xpReward: 160,
        lessons: [
          {
            title: 'Pourquoi des boucles ?',
            content: 'Les boucles permettent de **répéter des instructions** sans les écrire plusieurs fois.\n\nAu lieu d\'écrire AFFICHER 10 fois, on utilise une boucle !',
            illustration: 'loop'
          },
          {
            title: 'La boucle POUR',
            content: 'On utilise POUR quand on sait **combien de fois** répéter.\n\nLa variable (compteur) va de la valeur de départ à la valeur de fin.',
            code: 'POUR i ← 1 A 5 FAIRE\n    AFFICHER(i)\nFINPOUR\n// Affiche : 1, 2, 3, 4, 5'
          },
          {
            title: 'Utiliser le compteur',
            content: 'Le compteur peut être utilisé dans les calculs :',
            code: 'POUR i ← 1 A 5 FAIRE\n    AFFICHER(i * 2)\nFINPOUR\n// Affiche : 2, 4, 6, 8, 10'
          },
          {
            title: 'Compter à l\'envers',
            content: 'On peut aussi compter en descendant avec un pas négatif :',
            code: 'POUR i ← 10 A 1 PAS -1 FAIRE\n    AFFICHER(i)\nFINPOUR\n// Affiche : 10, 9, 8, ..., 1'
          }
        ],
        quiz: [
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
          }
        ],
        exercises: [
          {
            id: 'pour-ex1',
            title: 'Table de multiplication',
            instruction: 'Affiche la table de multiplication de 7 (de 7x1 à 7x10).',
            starterCode: 'ALGORITHME Table7\nVARIABLES\n    i : ENTIER\nDEBUT\n    // Ta boucle ici\nFIN',
            hints: ['Utilise POUR i ← 1 A 10', 'Affiche 7 * i à chaque tour'],
            validation: {
              type: 'contains',
              patterns: ['POUR', 'A', '10', '7 * i', 'FINPOUR', 'AFFICHER']
            },
            solution: 'ALGORITHME Table7\nVARIABLES\n    i : ENTIER\nDEBUT\n    POUR i ← 1 A 10 FAIRE\n        AFFICHER(7 * i)\n    FINPOUR\nFIN'
          },
          {
            id: 'pour-ex2',
            title: 'Somme des nombres',
            instruction: 'Calcule et affiche la somme des nombres de 1 à 100.',
            starterCode: 'ALGORITHME Somme100\nVARIABLES\n    i : ENTIER\n    somme : ENTIER\nDEBUT\n    somme ← 0\n    // Ta boucle ici\n    AFFICHER(somme)\nFIN',
            hints: ['Utilise somme ← somme + i dans la boucle', 'La réponse devrait être 5050'],
            validation: {
              type: 'contains',
              patterns: ['POUR', 'somme ← somme + i', 'FINPOUR']
            },
            solution: 'ALGORITHME Somme100\nVARIABLES\n    i : ENTIER\n    somme : ENTIER\nDEBUT\n    somme ← 0\n    POUR i ← 1 A 100 FAIRE\n        somme ← somme + i\n    FINPOUR\n    AFFICHER(somme)\nFIN'
          }
        ]
      },
      {
        id: 'boucle-tantque',
        title: 'La Boucle TANT QUE',
        shortDescription: 'Répéter tant qu\'une condition est vraie',
        icon: 'Repeat',
        color: 'from-pink-400 to-pink-600',
        difficulty: 'intermediaire',
        duration: 35,
        prerequisites: ['boucle-pour'],
        xpReward: 180,
        lessons: [
          {
            title: 'Différence avec POUR',
            content: 'On utilise **TANT QUE** quand on ne sait pas à l\'avance combien de fois répéter.\n\nLa boucle continue **tant que** la condition reste vraie.',
            illustration: 'loop'
          },
          {
            title: 'Structure TANT QUE',
            content: 'La condition est vérifiée AVANT chaque tour. Si elle est fausse dès le départ, le bloc n\'est jamais exécuté.',
            code: 'compteur ← 1\nTANT QUE compteur <= 5 FAIRE\n    AFFICHER(compteur)\n    compteur ← compteur + 1\nFIN TANT QUE'
          },
          {
            title: 'Attention aux boucles infinies !',
            content: '⚠️ Si la condition ne devient jamais fausse, la boucle ne s\'arrête jamais !\n\nToujours s\'assurer que la condition changera.',
            code: '// ❌ BOUCLE INFINIE !\nx ← 1\nTANT QUE x > 0 FAIRE\n    AFFICHER(x)\n    // x ne change jamais !\nFIN TANT QUE'
          },
          {
            title: 'Exemple pratique',
            content: 'Diviser un nombre par 2 jusqu\'à obtenir un résultat < 1 :',
            code: 'n ← 100\nTANT QUE n >= 1 FAIRE\n    AFFICHER(n)\n    n ← n / 2\nFIN TANT QUE'
          }
        ],
        quiz: [
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
          }
        ],
        exercises: [
          {
            id: 'tq-ex1',
            title: 'Deviner un nombre',
            instruction: 'Lis des nombres jusqu\'à ce que l\'utilisateur entre 0, puis affiche combien de nombres ont été entrés.',
            starterCode: 'ALGORITHME Compteur\nVARIABLES\n    n : ENTIER\n    compteur : ENTIER\nDEBUT\n    compteur ← 0\n    LIRE(n)\n    // Ta boucle ici\n    AFFICHER(compteur)\nFIN',
            hints: ['Continue TANT QUE n <> 0', 'Incrémente compteur à chaque tour', 'N\'oublie pas de LIRE(n) dans la boucle'],
            validation: {
              type: 'contains',
              patterns: ['TANT QUE', 'n <> 0', 'compteur ← compteur + 1', 'LIRE', 'FIN TANT QUE']
            },
            solution: 'ALGORITHME Compteur\nVARIABLES\n    n : ENTIER\n    compteur : ENTIER\nDEBUT\n    compteur ← 0\n    LIRE(n)\n    TANT QUE n <> 0 FAIRE\n        compteur ← compteur + 1\n        LIRE(n)\n    FIN TANT QUE\n    AFFICHER(compteur)\nFIN'
          }
        ]
      }
    ]
  },
  {
    id: 'structures-donnees',
    title: 'Structures de Données',
    description: 'Tableaux, chaînes et collections',
    icon: 'Table2',
    color: 'from-teal-500 to-emerald-500',
    badge: {
      name: 'Architecte de Données',
      icon: '🏗️',
      description: 'Tu maîtrises les structures de données!'
    },
    topics: [
      {
        id: 'tableaux',
        title: 'Les Tableaux',
        shortDescription: 'Stocker plusieurs valeurs dans une seule variable',
        icon: 'Table2',
        color: 'from-teal-400 to-teal-600',
        difficulty: 'intermediaire',
        duration: 40,
        prerequisites: ['boucle-pour'],
        xpReward: 200,
        lessons: [
          {
            title: 'Qu\'est-ce qu\'un tableau ?',
            content: 'Un **tableau** est une variable qui peut contenir plusieurs valeurs du même type.\n\nImagine une rangée de casiers numérotés : chaque casier peut contenir une valeur.',
            illustration: 'array'
          },
          {
            title: 'Déclarer un tableau',
            content: 'On précise le type et la taille (nombre de cases) :',
            code: 'VARIABLES\n    notes : TABLEAU[5] DE ENTIER\n    noms : TABLEAU[10] DE CHAINE'
          },
          {
            title: 'Accéder aux éléments',
            content: 'Chaque élément a un **indice** (numéro de case). En algorithmique, on commence souvent à 1.',
            code: 'notes[1] ← 15    // première case\nnotes[2] ← 18    // deuxième case\nAFFICHER(notes[1])  // affiche 15'
          },
          {
            title: 'Parcourir un tableau',
            content: 'On utilise une boucle POUR pour traiter tous les éléments :',
            code: 'POUR i ← 1 A 5 FAIRE\n    AFFICHER(notes[i])\nFINPOUR'
          },
          {
            title: 'Exemple complet',
            content: 'Calculer la moyenne d\'un tableau de notes :',
            code: 'somme ← 0\nPOUR i ← 1 A 5 FAIRE\n    somme ← somme + notes[i]\nFINPOUR\nmoyenne ← somme / 5'
          }
        ],
        quiz: [
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
          }
        ],
        exercises: [
          {
            id: 'tab-ex1',
            title: 'Remplir et afficher',
            instruction: 'Crée un tableau de 5 entiers, remplis-le avec les valeurs 10, 20, 30, 40, 50 puis affiche tous les éléments.',
            starterCode: 'ALGORITHME Tableau\nVARIABLES\n    T : TABLEAU[5] DE ENTIER\n    i : ENTIER\nDEBUT\n    // Remplis le tableau\n    // Affiche le tableau\nFIN',
            hints: ['Utilise T[1] ← 10, T[2] ← 20, etc.', 'Utilise une boucle POUR pour afficher'],
            validation: {
              type: 'contains',
              patterns: ['T[1]', 'T[2]', 'T[3]', 'T[4]', 'T[5]', 'POUR', 'AFFICHER']
            },
            solution: 'ALGORITHME Tableau\nVARIABLES\n    T : TABLEAU[5] DE ENTIER\n    i : ENTIER\nDEBUT\n    T[1] ← 10\n    T[2] ← 20\n    T[3] ← 30\n    T[4] ← 40\n    T[5] ← 50\n    POUR i ← 1 A 5 FAIRE\n        AFFICHER(T[i])\n    FINPOUR\nFIN'
          },
          {
            id: 'tab-ex2',
            title: 'Trouver le maximum',
            instruction: 'Trouve et affiche la plus grande valeur d\'un tableau de 5 entiers.',
            starterCode: 'ALGORITHME Maximum\nVARIABLES\n    T : TABLEAU[5] DE ENTIER\n    i : ENTIER\n    max : ENTIER\nDEBUT\n    // Suppose que T est déjà rempli\n    T[1] ← 12\n    T[2] ← 45\n    T[3] ← 7\n    T[4] ← 89\n    T[5] ← 23\n    \n    // Trouve le maximum\n    \n    AFFICHER(max)\nFIN',
            hints: ['Initialise max avec T[1]', 'Compare chaque élément avec max', 'Si T[i] > max, alors max ← T[i]'],
            validation: {
              type: 'contains',
              patterns: ['max ← T[1]', 'POUR', 'SI', 'T[i] > max', 'max ← T[i]', 'FINPOUR']
            },
            solution: 'ALGORITHME Maximum\nVARIABLES\n    T : TABLEAU[5] DE ENTIER\n    i : ENTIER\n    max : ENTIER\nDEBUT\n    T[1] ← 12\n    T[2] ← 45\n    T[3] ← 7\n    T[4] ← 89\n    T[5] ← 23\n    \n    max ← T[1]\n    POUR i ← 2 A 5 FAIRE\n        SI T[i] > max ALORS\n            max ← T[i]\n        FINSI\n    FINPOUR\n    AFFICHER(max)\nFIN'
          }
        ]
      },
      {
        id: 'chaines',
        title: 'Les Chaînes de Caractères',
        shortDescription: 'Manipuler du texte comme un pro',
        icon: 'Type',
        color: 'from-emerald-400 to-emerald-600',
        difficulty: 'intermediaire',
        duration: 35,
        prerequisites: ['tableaux'],
        xpReward: 180,
        lessons: [
          {
            title: 'Qu\'est-ce qu\'une chaîne ?',
            content: 'Une **chaîne de caractères** est une suite de caractères (lettres, chiffres, symboles).\n\nC\'est comme un tableau de caractères !',
            code: 'nom : CHAINE\nnom ← "Bonjour"'
          },
          {
            title: 'Opérations sur les chaînes',
            content: '**Concaténation** : assembler deux chaînes avec +\n\n**Longueur** : obtenir le nombre de caractères',
            code: 'prenom ← "Marie"\nnom ← "Dupont"\ncomplet ← prenom + " " + nom\n// complet = "Marie Dupont"\n\nAFFICHER(LONGUEUR(complet))  // 12'
          },
          {
            title: 'Accéder à un caractère',
            content: 'Chaque caractère a une position (indice) :',
            code: 'mot ← "ALGO"\nAFFICHER(mot[1])  // A\nAFFICHER(mot[4])  // O'
          },
          {
            title: 'Fonctions utiles',
            content: 'Fonctions courantes pour les chaînes :\n\n• **LONGUEUR(s)** : nombre de caractères\n• **SOUS_CHAINE(s, debut, fin)** : extrait une partie\n• **MAJUSCULE(s)** : convertit en majuscules\n• **MINUSCULE(s)** : convertit en minuscules',
            code: 'texte ← "Bonjour"\nAFFICHER(LONGUEUR(texte))        // 7\nAFFICHER(SOUS_CHAINE(texte,1,3)) // Bon\nAFFICHER(MAJUSCULE(texte))       // BONJOUR'
          }
        ],
        quiz: [
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
          }
        ],
        exercises: [
          {
            id: 'str-ex1',
            title: 'Message personnalisé',
            instruction: 'Lis un prénom et affiche "Bienvenue, [prénom] !"',
            starterCode: 'ALGORITHME Bienvenue\nVARIABLES\n    prenom : CHAINE\nDEBUT\n    LIRE(prenom)\n    // Affiche le message\nFIN',
            hints: ['Utilise la concaténation avec +', 'N\'oublie pas les espaces'],
            validation: {
              type: 'contains',
              patterns: ['LIRE', 'prenom', 'AFFICHER', '+', '"Bienvenue']
            },
            solution: 'ALGORITHME Bienvenue\nVARIABLES\n    prenom : CHAINE\nDEBUT\n    LIRE(prenom)\n    AFFICHER("Bienvenue, " + prenom + " !")\nFIN'
          }
        ]
      }
    ]
  },
  {
    id: 'fonctions',
    title: 'Fonctions et Procédures',
    description: 'Organise et réutilise ton code',
    icon: 'Boxes',
    color: 'from-violet-500 to-purple-500',
    badge: {
      name: 'Architecte du Code',
      icon: '🧩',
      description: 'Tu sais structurer ton code comme un pro!'
    },
    topics: [
      {
        id: 'procedures',
        title: 'Les Procédures',
        shortDescription: 'Créer des blocs de code réutilisables',
        icon: 'Boxes',
        color: 'from-violet-400 to-violet-600',
        difficulty: 'intermediaire',
        duration: 40,
        prerequisites: ['boucle-tantque'],
        xpReward: 200,
        lessons: [
          {
            title: 'Pourquoi des procédures ?',
            content: 'Une **procédure** est un bloc de code nommé qui peut être appelé plusieurs fois.\n\nAvantages :\n• Éviter de répéter le même code\n• Organiser le programme\n• Faciliter les modifications',
            illustration: 'box'
          },
          {
            title: 'Créer une procédure',
            content: 'Une procédure a un nom et peut recevoir des **paramètres** :',
            code: 'PROCEDURE AfficherBonjour(nom : CHAINE)\nDEBUT\n    AFFICHER("Bonjour " + nom + " !")\nFINPROCEDURE'
          },
          {
            title: 'Appeler une procédure',
            content: 'On appelle la procédure par son nom :',
            code: 'AfficherBonjour("Alice")\nAfficherBonjour("Bob")\n// Affiche :\n// Bonjour Alice !\n// Bonjour Bob !'
          },
          {
            title: 'Plusieurs paramètres',
            content: 'Une procédure peut avoir plusieurs paramètres :',
            code: 'PROCEDURE AfficherRectangle(largeur : ENTIER, hauteur : ENTIER)\nDEBUT\n    AFFICHER("Largeur : " + largeur)\n    AFFICHER("Hauteur : " + hauteur)\n    AFFICHER("Aire : " + largeur * hauteur)\nFINPROCEDURE\n\nAfficherRectangle(5, 3)'
          }
        ],
        quiz: [
          {
            question: 'Qu\'est-ce qu\'une procédure ?',
            options: ['Un type de variable', 'Un bloc de code nommé réutilisable', 'Une boucle spéciale', 'Un opérateur'],
            correctIndex: 1,
            explanation: 'Une procédure est un bloc de code qu\'on peut appeler par son nom.'
          },
          {
            question: 'Comment terminer une procédure ?',
            options: ['FIN', 'FINPROCEDURE', 'END', 'RETOURNER'],
            correctIndex: 1,
            explanation: 'Toute PROCEDURE se termine par FINPROCEDURE.'
          },
          {
            question: 'Une procédure peut-elle recevoir des valeurs ?',
            options: ['Non', 'Oui, via les paramètres', 'Seulement des nombres', 'Seulement des chaînes'],
            correctIndex: 1,
            explanation: 'Les paramètres permettent de passer des valeurs à la procédure.'
          }
        ],
        exercises: [
          {
            id: 'proc-ex1',
            title: 'Procédure de salutation',
            instruction: 'Crée une procédure "Saluer" qui prend un nom et affiche "Bonjour [nom] !". Appelle-la 3 fois avec des noms différents.',
            starterCode: 'ALGORITHME Salutations\n\n// Ta procédure ici\n\nDEBUT\n    // Appelle Saluer 3 fois\nFIN',
            hints: ['Déclare PROCEDURE Saluer(nom : CHAINE)', 'Utilise AFFICHER dans la procédure', 'Appelle Saluer("Alice") etc.'],
            validation: {
              type: 'contains',
              patterns: ['PROCEDURE', 'Saluer', 'CHAINE', 'AFFICHER', 'FINPROCEDURE', 'Saluer(']
            },
            solution: 'ALGORITHME Salutations\n\nPROCEDURE Saluer(nom : CHAINE)\nDEBUT\n    AFFICHER("Bonjour " + nom + " !")\nFINPROCEDURE\n\nDEBUT\n    Saluer("Alice")\n    Saluer("Bob")\n    Saluer("Charlie")\nFIN'
          }
        ]
      },
      {
        id: 'fonctions',
        title: 'Les Fonctions',
        shortDescription: 'Créer des blocs qui retournent une valeur',
        icon: 'Code2',
        color: 'from-purple-400 to-purple-600',
        difficulty: 'intermediaire',
        duration: 45,
        prerequisites: ['procedures'],
        xpReward: 220,
        lessons: [
          {
            title: 'Fonction vs Procédure',
            content: 'La différence principale :\n\n• **Procédure** : exécute des actions, ne retourne rien\n• **Fonction** : calcule et **retourne une valeur**\n\nUne fonction est comme une formule mathématique.',
            illustration: 'box'
          },
          {
            title: 'Créer une fonction',
            content: 'Une fonction déclare son type de retour et utilise RETOURNER :',
            code: 'FONCTION Carre(n : ENTIER) : ENTIER\nDEBUT\n    RETOURNER n * n\nFINFONCTION'
          },
          {
            title: 'Utiliser une fonction',
            content: 'On peut utiliser le résultat d\'une fonction comme une valeur :',
            code: 'resultat ← Carre(5)\nAFFICHER(resultat)  // 25\n\n// Ou directement :\nAFFICHER(Carre(7))  // 49'
          },
          {
            title: 'Fonctions avec plusieurs paramètres',
            content: 'Les fonctions peuvent avoir plusieurs paramètres :',
            code: 'FONCTION Maximum(a : ENTIER, b : ENTIER) : ENTIER\nDEBUT\n    SI a > b ALORS\n        RETOURNER a\n    SINON\n        RETOURNER b\n    FINSI\nFINFONCTION\n\nAFFICHER(Maximum(10, 25))  // 25'
          },
          {
            title: 'Portée des variables',
            content: 'Les variables déclarées dans une fonction sont **locales** :\n\n• Elles n\'existent que pendant l\'exécution de la fonction\n• Elles ne sont pas accessibles depuis l\'extérieur',
            code: 'FONCTION Test() : ENTIER\nVARIABLES\n    x : ENTIER  // Variable locale\nDEBUT\n    x ← 10\n    RETOURNER x\nFINFONCTION\n\n// x n\'existe pas ici !'
          }
        ],
        quiz: [
          {
            question: 'Quelle est la différence entre fonction et procédure ?',
            options: ['Aucune différence', 'La fonction retourne une valeur', 'La procédure est plus rapide', 'La fonction n\'a pas de paramètres'],
            correctIndex: 1,
            explanation: 'Une fonction retourne une valeur, pas une procédure.'
          },
          {
            question: 'Quel mot-clé utilise-t-on pour retourner une valeur ?',
            options: ['RETOURNER', 'RETURN', 'RESULTAT', 'SORTIR'],
            correctIndex: 0,
            explanation: 'RETOURNER permet de renvoyer une valeur depuis une fonction.'
          },
          {
            question: 'Une variable locale est accessible...',
            options: ['Partout dans le programme', 'Seulement dans sa fonction', 'Seulement dans le programme principal', 'Nulle part'],
            correctIndex: 1,
            explanation: 'Une variable locale n\'existe que dans sa fonction.'
          }
        ],
        exercises: [
          {
            id: 'func-ex1',
            title: 'Fonction aire du rectangle',
            instruction: 'Crée une fonction AireRectangle(largeur, hauteur) qui retourne l\'aire. Utilise-la pour afficher l\'aire d\'un rectangle 5x3.',
            starterCode: 'ALGORITHME CalculAire\n\n// Ta fonction ici\n\nDEBUT\n    AFFICHER(AireRectangle(5, 3))\nFIN',
            hints: ['FONCTION AireRectangle(l : ENTIER, h : ENTIER) : ENTIER', 'RETOURNER l * h'],
            validation: {
              type: 'contains',
              patterns: ['FONCTION', 'AireRectangle', 'RETOURNER', 'FINFONCTION']
            },
            solution: 'ALGORITHME CalculAire\n\nFONCTION AireRectangle(l : ENTIER, h : ENTIER) : ENTIER\nDEBUT\n    RETOURNER l * h\nFINFONCTION\n\nDEBUT\n    AFFICHER(AireRectangle(5, 3))\nFIN'
          },
          {
            id: 'func-ex2',
            title: 'Fonction estPair',
            instruction: 'Crée une fonction estPair(n) qui retourne VRAI si n est pair, FAUX sinon. Teste-la avec plusieurs nombres.',
            starterCode: 'ALGORITHME TestPair\n\n// Ta fonction ici\n\nDEBUT\n    AFFICHER(estPair(4))\n    AFFICHER(estPair(7))\nFIN',
            hints: ['Un nombre est pair si n MOD 2 = 0', 'La fonction retourne un BOOLEEN'],
            validation: {
              type: 'contains',
              patterns: ['FONCTION', 'estPair', 'BOOLEEN', 'MOD', 'RETOURNER', 'FINFONCTION']
            },
            solution: 'ALGORITHME TestPair\n\nFONCTION estPair(n : ENTIER) : BOOLEEN\nDEBUT\n    RETOURNER n MOD 2 = 0\nFINFONCTION\n\nDEBUT\n    AFFICHER(estPair(4))\n    AFFICHER(estPair(7))\nFIN'
          }
        ]
      }
    ]
  },
  {
    id: 'algorithmes-classiques',
    title: 'Algorithmes Classiques',
    description: 'Recherche, tri et résolution de problèmes',
    icon: 'Search',
    color: 'from-amber-500 to-yellow-500',
    badge: {
      name: 'Chercheur d\'Or',
      icon: '🔍',
      description: 'Tu maîtrises les algorithmes de recherche et tri!'
    },
    topics: [
      {
        id: 'recherche-lineaire',
        title: 'Recherche Linéaire',
        shortDescription: 'Trouver un élément en parcourant tout',
        icon: 'Search',
        color: 'from-amber-400 to-amber-600',
        difficulty: 'intermediaire',
        duration: 25,
        prerequisites: ['tableaux'],
        xpReward: 150,
        lessons: [
          {
            title: 'Principe de la recherche linéaire',
            content: 'La **recherche linéaire** (ou séquentielle) consiste à parcourir tous les éléments un par un jusqu\'à trouver celui qu\'on cherche.\n\nC\'est comme chercher un livre dans une pile non triée : tu regardes chaque livre un par un.',
            illustration: 'array'
          },
          {
            title: 'Algorithme',
            content: 'On parcourt le tableau et on compare chaque élément avec la valeur cherchée :',
            code: 'FONCTION RechercheLineaire(T : TABLEAU, n : ENTIER, valeur : ENTIER) : ENTIER\nVARIABLES\n    i : ENTIER\nDEBUT\n    POUR i ← 1 A n FAIRE\n        SI T[i] = valeur ALORS\n            RETOURNER i  // Trouvé à la position i\n        FINSI\n    FINPOUR\n    RETOURNER -1  // Non trouvé\nFINFONCTION'
          },
          {
            title: 'Complexité',
            content: 'Dans le **pire cas**, on doit parcourir tout le tableau.\n\n• Meilleur cas : 1 comparaison (élément au début)\n• Pire cas : n comparaisons (élément à la fin ou absent)\n• Complexité : **O(n)** - linéaire'
          }
        ],
        quiz: [
          {
            question: 'Combien de comparaisons au maximum pour chercher dans un tableau de 100 éléments ?',
            options: ['10', '50', '100', '1000'],
            correctIndex: 2,
            explanation: 'Dans le pire cas, on compare les 100 éléments.'
          },
          {
            question: 'Quand retourne-t-on -1 ?',
            options: ['Quand l\'élément est au début', 'Quand l\'élément n\'est pas trouvé', 'Quand le tableau est vide', 'Jamais'],
            correctIndex: 1,
            explanation: '-1 indique que l\'élément n\'existe pas dans le tableau.'
          }
        ],
        exercises: [
          {
            id: 'rech-ex1',
            title: 'Implémenter la recherche',
            instruction: 'Implémente la recherche linéaire pour trouver la valeur 25 dans un tableau.',
            starterCode: 'ALGORITHME Recherche\nVARIABLES\n    T : TABLEAU[5] DE ENTIER\n    i : ENTIER\n    trouve : BOOLEEN\nDEBUT\n    T[1] ← 10\n    T[2] ← 25\n    T[3] ← 8\n    T[4] ← 42\n    T[5] ← 15\n    \n    trouve ← FAUX\n    // Ta recherche ici\n    \n    SI trouve ALORS\n        AFFICHER("Trouvé !")\n    SINON\n        AFFICHER("Non trouvé")\n    FINSI\nFIN',
            hints: ['Parcours le tableau avec POUR', 'Compare T[i] avec 25', 'Met trouve ← VRAI si trouvé'],
            validation: {
              type: 'contains',
              patterns: ['POUR', 'SI', 'T[i] = 25', 'trouve ← VRAI']
            },
            solution: 'ALGORITHME Recherche\nVARIABLES\n    T : TABLEAU[5] DE ENTIER\n    i : ENTIER\n    trouve : BOOLEEN\nDEBUT\n    T[1] ← 10\n    T[2] ← 25\n    T[3] ← 8\n    T[4] ← 42\n    T[5] ← 15\n    \n    trouve ← FAUX\n    POUR i ← 1 A 5 FAIRE\n        SI T[i] = 25 ALORS\n            trouve ← VRAI\n        FINSI\n    FINPOUR\n    \n    SI trouve ALORS\n        AFFICHER("Trouvé !")\n    SINON\n        AFFICHER("Non trouvé")\n    FINSI\nFIN'
          }
        ]
      },
      {
        id: 'recherche-dichotomique',
        title: 'Recherche Dichotomique',
        shortDescription: 'Recherche rapide dans un tableau trié',
        icon: 'Search',
        color: 'from-yellow-400 to-yellow-600',
        difficulty: 'avance',
        duration: 35,
        prerequisites: ['recherche-lineaire'],
        xpReward: 220,
        lessons: [
          {
            title: 'Principe : diviser pour régner',
            content: 'La **recherche dichotomique** (ou binaire) ne fonctionne que sur un tableau **trié**.\n\nPrincipe : on compare l\'élément du milieu. Selon le résultat, on élimine la moitié du tableau.\n\nC\'est comme chercher un mot dans le dictionnaire !',
            illustration: 'tree'
          },
          {
            title: 'Algorithme',
            content: 'On maintient deux bornes (gauche et droite) qu\'on rapproche :',
            code: 'FONCTION RechercheDichotomique(T : TABLEAU, valeur : ENTIER) : ENTIER\nVARIABLES\n    gauche, droite, milieu : ENTIER\nDEBUT\n    gauche ← 1\n    droite ← TAILLE(T)\n    \n    TANT QUE gauche <= droite FAIRE\n        milieu ← (gauche + droite) / 2\n        \n        SI T[milieu] = valeur ALORS\n            RETOURNER milieu\n        SINON SI T[milieu] < valeur ALORS\n            gauche ← milieu + 1\n        SINON\n            droite ← milieu - 1\n        FINSI\n    FIN TANT QUE\n    \n    RETOURNER -1\nFINFONCTION'
          },
          {
            title: 'Complexité',
            content: 'À chaque étape, on divise le tableau par 2.\n\n• Pour 1000 éléments : max 10 comparaisons\n• Pour 1 000 000 éléments : max 20 comparaisons !\n• Complexité : **O(log n)** - logarithmique\n\nC\'est beaucoup plus rapide que la recherche linéaire !'
          }
        ],
        quiz: [
          {
            question: 'Quelle condition est nécessaire pour la recherche dichotomique ?',
            options: ['Tableau non vide', 'Tableau trié', 'Tableau de nombres', 'Tableau petit'],
            correctIndex: 1,
            explanation: 'La recherche dichotomique ne fonctionne que sur un tableau trié.'
          },
          {
            question: 'Combien de comparaisons maximum pour 1024 éléments ?',
            options: ['1024', '512', '10', '32'],
            correctIndex: 2,
            explanation: 'log2(1024) = 10 comparaisons maximum.'
          }
        ],
        exercises: [
          {
            id: 'dicho-ex1',
            title: 'Recherche dans tableau trié',
            instruction: 'Implémente la recherche dichotomique pour trouver 42 dans le tableau trié [5, 12, 25, 42, 58, 73, 89].',
            starterCode: 'ALGORITHME Dichotomie\nVARIABLES\n    T : TABLEAU[7] DE ENTIER\n    gauche, droite, milieu : ENTIER\nDEBUT\n    T[1] ← 5\n    T[2] ← 12\n    T[3] ← 25\n    T[4] ← 42\n    T[5] ← 58\n    T[6] ← 73\n    T[7] ← 89\n    \n    gauche ← 1\n    droite ← 7\n    \n    // Ta recherche dichotomique ici\nFIN',
            hints: ['Utilise TANT QUE gauche <= droite', 'Calcule milieu ← (gauche + droite) / 2', 'Compare T[milieu] avec 42'],
            validation: {
              type: 'contains',
              patterns: ['TANT QUE', 'milieu', 'gauche', 'droite', 'T[milieu]']
            },
            solution: 'ALGORITHME Dichotomie\nVARIABLES\n    T : TABLEAU[7] DE ENTIER\n    gauche, droite, milieu : ENTIER\nDEBUT\n    T[1] ← 5\n    T[2] ← 12\n    T[3] ← 25\n    T[4] ← 42\n    T[5] ← 58\n    T[6] ← 73\n    T[7] ← 89\n    \n    gauche ← 1\n    droite ← 7\n    \n    TANT QUE gauche <= droite FAIRE\n        milieu ← (gauche + droite) / 2\n        SI T[milieu] = 42 ALORS\n            AFFICHER("Trouvé à la position " + milieu)\n            gauche ← droite + 1\n        SINON SI T[milieu] < 42 ALORS\n            gauche ← milieu + 1\n        SINON\n            droite ← milieu - 1\n        FINSI\n    FIN TANT QUE\nFIN'
          }
        ]
      },
      {
        id: 'tri-bulles',
        title: 'Tri à Bulles',
        shortDescription: 'Le tri le plus simple à comprendre',
        icon: 'ArrowUpDown',
        color: 'from-orange-400 to-orange-600',
        difficulty: 'intermediaire',
        duration: 35,
        prerequisites: ['tableaux', 'boucle-pour'],
        xpReward: 200,
        lessons: [
          {
            title: 'Principe du tri à bulles',
            content: 'Le **tri à bulles** compare les éléments adjacents et les échange s\'ils sont dans le mauvais ordre.\n\nLes plus grands éléments "remontent" comme des bulles vers la fin du tableau.',
            illustration: 'sort'
          },
          {
            title: 'Algorithme',
            content: 'On parcourt le tableau plusieurs fois en échangeant les éléments mal placés :',
            code: 'PROCEDURE TriBulles(T : TABLEAU, n : ENTIER)\nVARIABLES\n    i, j, temp : ENTIER\nDEBUT\n    POUR i ← 1 A n-1 FAIRE\n        POUR j ← 1 A n-i FAIRE\n            SI T[j] > T[j+1] ALORS\n                // Échange\n                temp ← T[j]\n                T[j] ← T[j+1]\n                T[j+1] ← temp\n            FINSI\n        FINPOUR\n    FINPOUR\nFINPROCEDURE'
          },
          {
            title: 'Exemple pas à pas',
            content: 'Tableau initial : [5, 3, 8, 1]\n\n**Tour 1** : [3, 5, 1, 8] (8 est à sa place)\n**Tour 2** : [3, 1, 5, 8] (5 est à sa place)\n**Tour 3** : [1, 3, 5, 8] (tout est trié !)'
          },
          {
            title: 'Complexité',
            content: 'Le tri à bulles est simple mais pas très efficace.\n\n• Complexité : **O(n²)**\n• Pour 1000 éléments : ~1 000 000 opérations\n\nIl existe des tris plus rapides (tri rapide, tri fusion).'
          }
        ],
        quiz: [
          {
            question: 'Que fait le tri à bulles ?',
            options: ['Cherche le minimum', 'Compare et échange les éléments adjacents', 'Divise le tableau', 'Fusionne des tableaux'],
            correctIndex: 1,
            explanation: 'Le tri à bulles compare les éléments voisins et les échange si nécessaire.'
          },
          {
            question: 'Quelle est la complexité du tri à bulles ?',
            options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(1)'],
            correctIndex: 2,
            explanation: 'Le tri à bulles a une complexité quadratique O(n²).'
          }
        ],
        exercises: [
          {
            id: 'trib-ex1',
            title: 'Implémenter le tri à bulles',
            instruction: 'Trie le tableau [64, 34, 25, 12, 22] avec le tri à bulles.',
            starterCode: 'ALGORITHME TriBulles\nVARIABLES\n    T : TABLEAU[5] DE ENTIER\n    i, j, temp : ENTIER\nDEBUT\n    T[1] ← 64\n    T[2] ← 34\n    T[3] ← 25\n    T[4] ← 12\n    T[5] ← 22\n    \n    // Ton tri ici\n    \n    // Afficher le résultat\n    POUR i ← 1 A 5 FAIRE\n        AFFICHER(T[i])\n    FINPOUR\nFIN',
            hints: ['Utilise deux boucles POUR imbriquées', 'Compare T[j] avec T[j+1]', 'Échange avec une variable temporaire temp'],
            validation: {
              type: 'contains',
              patterns: ['POUR', 'SI', 'T[j] > T[j+1]', 'temp', 'FINPOUR']
            },
            solution: 'ALGORITHME TriBulles\nVARIABLES\n    T : TABLEAU[5] DE ENTIER\n    i, j, temp : ENTIER\nDEBUT\n    T[1] ← 64\n    T[2] ← 34\n    T[3] ← 25\n    T[4] ← 12\n    T[5] ← 22\n    \n    POUR i ← 1 A 4 FAIRE\n        POUR j ← 1 A 5-i FAIRE\n            SI T[j] > T[j+1] ALORS\n                temp ← T[j]\n                T[j] ← T[j+1]\n                T[j+1] ← temp\n            FINSI\n        FINPOUR\n    FINPOUR\n    \n    POUR i ← 1 A 5 FAIRE\n        AFFICHER(T[i])\n    FINPOUR\nFIN'
          }
        ]
      }
    ]
  },
  {
    id: 'concepts-avances',
    title: 'Concepts Avancés',
    description: 'Récursivité, complexité et optimisation',
    icon: 'Brain',
    color: 'from-rose-500 to-pink-500',
    badge: {
      name: 'Maître Algorithme',
      icon: '🧠',
      description: 'Tu as atteint le niveau expert!'
    },
    topics: [
      {
        id: 'recursivite',
        title: 'La Récursivité',
        shortDescription: 'Quand une fonction s\'appelle elle-même',
        icon: 'Sparkles',
        color: 'from-rose-400 to-rose-600',
        difficulty: 'avance',
        duration: 45,
        prerequisites: ['fonctions'],
        xpReward: 250,
        lessons: [
          {
            title: 'Qu\'est-ce que la récursivité ?',
            content: 'Une fonction **récursive** est une fonction qui s\'appelle elle-même.\n\nC\'est comme les poupées russes : chaque poupée contient une version plus petite d\'elle-même.\n\nOu comme un miroir face à un autre miroir : l\'image se répète à l\'infini.',
            illustration: 'tree'
          },
          {
            title: 'Deux éléments essentiels',
            content: 'Toute fonction récursive doit avoir :\n\n1. **Cas de base** : condition d\'arrêt (sinon boucle infinie !)\n2. **Appel récursif** : la fonction s\'appelle avec un problème "plus petit"',
            code: 'FONCTION Factorielle(n : ENTIER) : ENTIER\nDEBUT\n    SI n <= 1 ALORS\n        RETOURNER 1        // Cas de base\n    SINON\n        RETOURNER n * Factorielle(n - 1)  // Appel récursif\n    FINSI\nFINFONCTION'
          },
          {
            title: 'Exemple : Factorielle',
            content: 'Factorielle(4) se déroule ainsi :\n\n• Factorielle(4) = 4 × Factorielle(3)\n• Factorielle(3) = 3 × Factorielle(2)\n• Factorielle(2) = 2 × Factorielle(1)\n• Factorielle(1) = 1 (cas de base)\n\nPuis on "remonte" : 1 → 2 → 6 → 24'
          },
          {
            title: 'Exemple : Fibonacci',
            content: 'La suite de Fibonacci : chaque nombre est la somme des deux précédents.\n\n0, 1, 1, 2, 3, 5, 8, 13, 21...',
            code: 'FONCTION Fibonacci(n : ENTIER) : ENTIER\nDEBUT\n    SI n <= 1 ALORS\n        RETOURNER n\n    SINON\n        RETOURNER Fibonacci(n-1) + Fibonacci(n-2)\n    FINSI\nFINFONCTION'
          }
        ],
        quiz: [
          {
            question: 'Qu\'est-ce qu\'une fonction récursive ?',
            options: ['Une fonction très longue', 'Une fonction qui s\'appelle elle-même', 'Une fonction sans paramètres', 'Une fonction qui retourne toujours le même résultat'],
            correctIndex: 1,
            explanation: 'Une fonction récursive est une fonction qui s\'appelle elle-même.'
          },
          {
            question: 'Que se passe-t-il sans cas de base ?',
            options: ['La fonction retourne 0', 'Boucle infinie / dépassement de pile', 'Erreur de syntaxe', 'La fonction ne s\'exécute pas'],
            correctIndex: 1,
            explanation: 'Sans cas de base, la fonction s\'appelle infiniment et cause un dépassement de pile.'
          },
          {
            question: 'Que vaut Factorielle(5) ?',
            options: ['15', '25', '120', '625'],
            correctIndex: 2,
            explanation: '5! = 5×4×3×2×1 = 120'
          }
        ],
        exercises: [
          {
            id: 'rec-ex1',
            title: 'Somme récursive',
            instruction: 'Écris une fonction récursive SommeRec(n) qui calcule la somme des entiers de 1 à n.',
            starterCode: 'ALGORITHME SommeRecursive\n\n// Ta fonction récursive ici\n\nDEBUT\n    AFFICHER(SommeRec(5))  // Doit afficher 15\n    AFFICHER(SommeRec(10)) // Doit afficher 55\nFIN',
            hints: ['Cas de base : si n <= 0, retourne 0', 'Appel récursif : n + SommeRec(n-1)'],
            validation: {
              type: 'contains',
              patterns: ['FONCTION', 'SommeRec', 'SI', 'RETOURNER', 'SommeRec(n - 1)', 'FINFONCTION']
            },
            solution: 'ALGORITHME SommeRecursive\n\nFONCTION SommeRec(n : ENTIER) : ENTIER\nDEBUT\n    SI n <= 0 ALORS\n        RETOURNER 0\n    SINON\n        RETOURNER n + SommeRec(n - 1)\n    FINSI\nFINFONCTION\n\nDEBUT\n    AFFICHER(SommeRec(5))\n    AFFICHER(SommeRec(10))\nFIN'
          }
        ]
      },
      {
        id: 'complexite',
        title: 'Complexité Algorithmique',
        shortDescription: 'Mesurer l\'efficacité des algorithmes',
        icon: 'Brain',
        color: 'from-pink-400 to-pink-600',
        difficulty: 'avance',
        duration: 40,
        prerequisites: ['recursivite'],
        xpReward: 230,
        lessons: [
          {
            title: 'Pourquoi la complexité ?',
            content: 'La **complexité algorithmique** mesure la performance d\'un algorithme.\n\nDeux questions importantes :\n• **Temps** : combien d\'opérations ?\n• **Espace** : combien de mémoire ?\n\nOn s\'intéresse surtout au comportement quand les données deviennent grandes.',
            illustration: 'comparison'
          },
          {
            title: 'Notation O (Grand O)',
            content: 'La notation **O(...)** décrit le pire cas en fonction de la taille n des données :\n\n• **O(1)** : constant - toujours rapide\n• **O(log n)** : logarithmique - très efficace\n• **O(n)** : linéaire - proportionnel aux données\n• **O(n log n)** : quasi-linéaire - bons tris\n• **O(n²)** : quadratique - lent pour grand n\n• **O(2ⁿ)** : exponentiel - très lent !'
          },
          {
            title: 'Exemples concrets',
            content: 'Pour n = 1000 éléments :\n\n• O(1) : 1 opération\n• O(log n) : ~10 opérations\n• O(n) : 1 000 opérations\n• O(n log n) : ~10 000 opérations\n• O(n²) : 1 000 000 opérations\n• O(2ⁿ) : impossible à calculer !'
          },
          {
            title: 'Comment analyser ?',
            content: 'Pour trouver la complexité :\n\n1. Compter les boucles imbriquées\n2. Identifier les opérations répétées\n3. Ignorer les constantes et termes mineurs',
            code: '// O(1) - constant\nx ← 5\n\n// O(n) - une boucle\nPOUR i ← 1 A n FAIRE\n    AFFICHER(i)\nFINPOUR\n\n// O(n²) - deux boucles imbriquées\nPOUR i ← 1 A n FAIRE\n    POUR j ← 1 A n FAIRE\n        AFFICHER(i, j)\n    FINPOUR\nFINPOUR'
          }
        ],
        quiz: [
          {
            question: 'Quelle complexité est la plus efficace ?',
            options: ['O(n²)', 'O(n)', 'O(log n)', 'O(n log n)'],
            correctIndex: 2,
            explanation: 'O(log n) est la plus efficace parmi ces options.'
          },
          {
            question: 'Quelle est la complexité d\'une recherche linéaire ?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctIndex: 2,
            explanation: 'On parcourt tous les éléments au pire cas : O(n).'
          },
          {
            question: 'Deux boucles POUR imbriquées donnent quelle complexité ?',
            options: ['O(n)', 'O(2n)', 'O(n²)', 'O(n+n)'],
            correctIndex: 2,
            explanation: 'Boucle dans boucle = n × n = O(n²).'
          }
        ],
        exercises: [
          {
            id: 'comp-ex1',
            title: 'Analyser la complexité',
            instruction: 'Lis ce code et détermine sa complexité. Écris un commentaire expliquant pourquoi.',
            starterCode: 'ALGORITHME AnalyseComplexite\nVARIABLES\n    n : ENTIER\n    i, j : ENTIER\n    somme : ENTIER\nDEBUT\n    n ← 100\n    somme ← 0\n    \n    POUR i ← 1 A n FAIRE\n        POUR j ← 1 A n FAIRE\n            somme ← somme + 1\n        FINPOUR\n    FINPOUR\n    \n    // Complexité : ???\n    // Explication : ???\n    \n    AFFICHER(somme)\nFIN',
            hints: ['Compte le nombre de boucles', 'Chaque boucle fait n itérations', 'n × n = n²'],
            validation: {
              type: 'contains',
              patterns: ['O(n', 'POUR']
            },
            solution: 'ALGORITHME AnalyseComplexite\nVARIABLES\n    n : ENTIER\n    i, j : ENTIER\n    somme : ENTIER\nDEBUT\n    n ← 100\n    somme ← 0\n    \n    POUR i ← 1 A n FAIRE\n        POUR j ← 1 A n FAIRE\n            somme ← somme + 1\n        FINPOUR\n    FINPOUR\n    \n    // Complexité : O(n²)\n    // Explication : Deux boucles imbriquées, chacune fait n tours\n    // Donc n × n = n² opérations au total\n    \n    AFFICHER(somme)\nFIN'
          }
        ]
      }
    ]
  }
];

// Helper functions
export const getAllTopics = (): Topic[] => {
  return learningModules.flatMap(module => module.topics);
};

export const getTopicById = (id: string): Topic | undefined => {
  return getAllTopics().find(topic => topic.id === id);
};

export const getModuleByTopicId = (topicId: string): Module | undefined => {
  return learningModules.find(module => 
    module.topics.some(topic => topic.id === topicId)
  );
};

export const getPrerequisiteTopics = (topicId: string): Topic[] => {
  const topic = getTopicById(topicId);
  if (!topic) return [];
  return topic.prerequisites.map(id => getTopicById(id)).filter((t): t is Topic => t !== undefined);
};

export const getDifficultyLabel = (difficulty: Topic['difficulty']): string => {
  switch (difficulty) {
    case 'debutant': return 'Débutant';
    case 'intermediaire': return 'Intermédiaire';
    case 'avance': return 'Avancé';
  }
};

export const getDifficultyColor = (difficulty: Topic['difficulty']): string => {
  switch (difficulty) {
    case 'debutant': return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'intermediaire': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'avance': return 'bg-red-500/10 text-red-600 border-red-500/20';
  }
};
