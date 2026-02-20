export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MissionItem {
  id: string;
  text: string;
  isVariable: boolean;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  explanation: {
    title: string;
    content: string[];
    animation?: string;
  };
  mission: {
    type: 'select' | 'drag-drop' | 'fill-blank' | 'match';
    instruction: string;
    items?: MissionItem[];
    pairs?: { left: string; right: string }[];
    blanks?: { text: string; answer: string }[];
  };
  quiz: QuizQuestion[];
  exercise: {
    instruction: string;
    starterCode: string;
    expectedOutput?: string;
    validation: {
      type: 'contains' | 'exact' | 'regex';
      patterns: string[];
    };
  };
}

export const levels: Level[] = [
  {
    id: 1,
    title: "Qu'est-ce qu'une variable ?",
    description: "Découvre ce qu'est une variable et à quoi elle sert",
    icon: "📦",
    color: "from-blue-400 to-cyan-400",
    explanation: {
      title: "Une variable, c'est comme une boîte !",
      content: [
        "Imagine une boîte magique dans laquelle tu peux ranger une information.",
        "Cette boîte a un nom pour la retrouver facilement.",
        "Tu peux changer ce qu'il y a dedans quand tu veux !",
        "En programmation, on appelle cette boîte une VARIABLE."
      ],
      animation: "box"
    },
    mission: {
      type: 'select',
      instruction: "Clique sur tous les éléments qui peuvent être stockés dans une variable :",
      items: [
        { id: '1', text: 'Un âge (17 ans)', isVariable: true },
        { id: '2', text: 'Un prénom ("Emma")', isVariable: true },
        { id: '3', text: 'Une pizza 🍕', isVariable: false },
        { id: '4', text: 'Un score (1500)', isVariable: true },
        { id: '5', text: 'Une chaise', isVariable: false },
        { id: '6', text: 'Vrai ou Faux', isVariable: true }
      ]
    },
    quiz: [
      {
        question: "Qu'est-ce qu'une variable ?",
        options: [
          "Un robot",
          "Une boîte qui stocke une information",
          "Un jeu vidéo",
          "Une couleur"
        ],
        correctIndex: 1,
        explanation: "Une variable est comme une boîte qui peut contenir une information (nombre, texte, etc.)"
      },
      {
        question: "Pourquoi une variable a-t-elle un nom ?",
        options: [
          "Pour faire joli",
          "Pour la retrouver facilement",
          "Parce que c'est obligatoire",
          "Pour la décorer"
        ],
        correctIndex: 1,
        explanation: "Le nom permet d'identifier et de retrouver la variable dans notre programme."
      },
      {
        question: "Peut-on changer la valeur d'une variable ?",
        options: [
          "Non, jamais",
          "Oui, autant de fois qu'on veut",
          "Seulement une fois",
          "Seulement les jours pairs"
        ],
        correctIndex: 1,
        explanation: "C'est justement pour ça qu'on l'appelle 'variable' : sa valeur peut varier !"
      }
    ],
    exercise: {
      instruction: "Déclare une variable 'age' de type ENTIER",
      starterCode: `ALGORITHME MaPremiereVariable
VARIABLES
    // Déclare ta variable ici

DEBUT
    AFFICHER("Bravo !")
FIN`,
      validation: {
        type: 'contains',
        patterns: ['age', 'ENTIER']
      }
    }
  },
  {
    id: 2,
    title: "Les types de variables",
    description: "Apprends les différents types : ENTIER, REEL, CHAINE, BOOLEEN",
    icon: "🏷️",
    color: "from-purple-400 to-pink-400",
    explanation: {
      title: "Chaque boîte a sa spécialité !",
      content: [
        "ENTIER : pour les nombres entiers (1, 42, -7)",
        "REEL : pour les nombres à virgule (3.14, -2.5)",
        "CHAINE : pour le texte (\"Bonjour\", \"Emma\")",
        "BOOLEEN : pour Vrai ou Faux"
      ],
      animation: "types"
    },
    mission: {
      type: 'match',
      instruction: "Associe chaque valeur à son type :",
      pairs: [
        { left: '42', right: 'ENTIER' },
        { left: '"Bonjour"', right: 'CHAINE' },
        { left: '3.14', right: 'REEL' },
        { left: 'VRAI', right: 'BOOLEEN' }
      ]
    },
    quiz: [
      {
        question: "Quel type utiliser pour stocker un prénom ?",
        options: ["ENTIER", "REEL", "CHAINE", "BOOLEEN"],
        correctIndex: 2,
        explanation: "Un prénom est du texte, on utilise donc CHAINE."
      },
      {
        question: "Quel type pour le nombre 3.14159 ?",
        options: ["ENTIER", "REEL", "CHAINE", "BOOLEEN"],
        correctIndex: 1,
        explanation: "C'est un nombre à virgule, on utilise REEL."
      },
      {
        question: "Quel type pour dire si quelqu'un est majeur ?",
        options: ["ENTIER", "REEL", "CHAINE", "BOOLEEN"],
        correctIndex: 3,
        explanation: "C'est Vrai ou Faux, on utilise BOOLEEN."
      }
    ],
    exercise: {
      instruction: "Déclare une variable 'nom' de type CHAINE et une variable 'prix' de type REEL",
      starterCode: `ALGORITHME LesTypes
VARIABLES
    // Déclare tes variables ici

DEBUT
    AFFICHER("Super !")
FIN`,
      validation: {
        type: 'contains',
        patterns: ['nom', 'CHAINE', 'prix', 'REEL']
      }
    }
  },
  {
    id: 3,
    title: "L'affectation",
    description: "Apprends à mettre une valeur dans une variable",
    icon: "📥",
    color: "from-green-400 to-emerald-400",
    explanation: {
      title: "Mettre une valeur dans la boîte",
      content: [
        "Pour mettre une valeur dans une variable, on utilise la flèche ←",
        "On dit qu'on 'affecte' une valeur à la variable",
        "Exemple : age ← 15 (on met 15 dans la boîte 'age')",
        "La flèche pointe vers la variable qui reçoit la valeur"
      ],
      animation: "assignment"
    },
    mission: {
      type: 'drag-drop',
      instruction: "Place les bonnes valeurs dans les bonnes variables :",
      items: [
        { id: '1', text: 'score ← ???', isVariable: true },
        { id: '2', text: 'nom ← ???', isVariable: true },
        { id: '3', text: '100', isVariable: false },
        { id: '4', text: '"Alice"', isVariable: false }
      ]
    },
    quiz: [
      {
        question: "Que signifie : compteur ← 5 ?",
        options: [
          "compteur est égal à 5",
          "On met la valeur 5 dans compteur",
          "5 est plus grand que compteur",
          "On supprime compteur"
        ],
        correctIndex: 1,
        explanation: "La flèche ← signifie qu'on affecte (met) la valeur 5 dans la variable compteur."
      },
      {
        question: "Quel symbole utilise-t-on pour l'affectation ?",
        options: ["=", "←", "→", "=="],
        correctIndex: 1,
        explanation: "En algorithmique, on utilise la flèche ← pour l'affectation."
      },
      {
        question: "Après : x ← 10 puis x ← 20, que vaut x ?",
        options: ["10", "20", "30", "Erreur"],
        correctIndex: 1,
        explanation: "La dernière affectation remplace la précédente, donc x vaut 20."
      }
    ],
    exercise: {
      instruction: "Déclare une variable 'compteur' de type ENTIER et affecte-lui la valeur 10",
      starterCode: `ALGORITHME Affectation
VARIABLES
    // Déclare ta variable

DEBUT
    // Affecte la valeur 10 à compteur
    
    AFFICHER(compteur)
FIN`,
      expectedOutput: "10",
      validation: {
        type: 'contains',
        patterns: ['compteur', 'ENTIER', '← 10', 'AFFICHER']
      }
    }
  },
  {
    id: 4,
    title: "Modifier une variable",
    description: "Apprends à changer la valeur d'une variable",
    icon: "🔄",
    color: "from-orange-400 to-red-400",
    explanation: {
      title: "Les variables peuvent changer !",
      content: [
        "On peut modifier la valeur d'une variable à tout moment",
        "On peut même utiliser la variable dans son propre calcul !",
        "Exemple : x ← x + 1 (ajoute 1 à la valeur actuelle de x)",
        "C'est très utile pour les compteurs et les scores"
      ],
      animation: "modify"
    },
    mission: {
      type: 'fill-blank',
      instruction: "Complète les instructions pour que x vaille 7 à la fin :",
      blanks: [
        { text: 'x ← ___', answer: '4' },
        { text: 'x ← x + ___', answer: '3' }
      ]
    },
    quiz: [
      {
        question: "Si x vaut 5, que vaut x après : x ← x + 2 ?",
        options: ["5", "2", "7", "52"],
        correctIndex: 2,
        explanation: "x + 2 = 5 + 2 = 7, puis on met 7 dans x."
      },
      {
        question: "Si score vaut 100, que vaut score après : score ← score - 10 ?",
        options: ["100", "10", "90", "110"],
        correctIndex: 2,
        explanation: "score - 10 = 100 - 10 = 90"
      },
      {
        question: "Que fait l'instruction : n ← n * 2 ?",
        options: [
          "Met 2 dans n",
          "Double la valeur de n",
          "Divise n par 2",
          "Compare n à 2"
        ],
        correctIndex: 1,
        explanation: "On multiplie n par 2 et on remet le résultat dans n."
      }
    ],
    exercise: {
      instruction: "Déclare x (ENTIER), affecte-lui 4, puis affecte-lui x + 3. Affiche le résultat.",
      starterCode: `ALGORITHME Modification
VARIABLES
    // Déclare x

DEBUT
    // Affecte 4 à x
    
    // Affecte x + 3 à x
    
    AFFICHER(x)
FIN`,
      expectedOutput: "7",
      validation: {
        type: 'contains',
        patterns: ['x', 'ENTIER', '← 4', 'x + 3']
      }
    }
  },
  {
    id: 5,
    title: "Lire une entrée",
    description: "Apprends à demander une valeur à l'utilisateur",
    icon: "⌨️",
    color: "from-indigo-400 to-blue-400",
    explanation: {
      title: "Demander une valeur à l'utilisateur",
      content: [
        "LIRE(variable) permet de demander une valeur à l'utilisateur",
        "La valeur entrée sera stockée dans la variable",
        "C'est utile pour créer des programmes interactifs !",
        "N'oublie pas d'afficher un message pour guider l'utilisateur"
      ],
      animation: "input"
    },
    mission: {
      type: 'select',
      instruction: "Sélectionne les instructions correctes pour lire le prénom de l'utilisateur :",
      items: [
        { id: '1', text: 'prenom : CHAINE', isVariable: true },
        { id: '2', text: 'AFFICHER("Ton prénom ?")', isVariable: true },
        { id: '3', text: 'LIRE(prenom)', isVariable: true },
        { id: '4', text: 'ECRIRE(prenom)', isVariable: false },
        { id: '5', text: 'prenom = input()', isVariable: false }
      ]
    },
    quiz: [
      {
        question: "Quelle instruction permet de lire une valeur ?",
        options: ["AFFICHER()", "LIRE()", "ECRIRE()", "ENTRER()"],
        correctIndex: 1,
        explanation: "LIRE() est la fonction qui permet de lire une entrée utilisateur."
      },
      {
        question: "Où est stockée la valeur lue par LIRE(age) ?",
        options: [
          "Dans l'écran",
          "Dans la variable age",
          "Dans LIRE",
          "Nulle part"
        ],
        correctIndex: 1,
        explanation: "La valeur entrée est stockée dans la variable passée à LIRE()."
      },
      {
        question: "Pourquoi afficher un message avant LIRE() ?",
        options: [
          "C'est obligatoire",
          "Pour décorer",
          "Pour guider l'utilisateur",
          "Pour faire une pause"
        ],
        correctIndex: 2,
        explanation: "Le message explique à l'utilisateur ce qu'il doit entrer."
      }
    ],
    exercise: {
      instruction: "Déclare 'age' (ENTIER), affiche un message, lis la valeur, puis affiche l'âge",
      starterCode: `ALGORITHME Lecture
VARIABLES
    // Déclare age

DEBUT
    // Affiche un message
    
    // Lis age
    
    // Affiche age
    
FIN`,
      validation: {
        type: 'contains',
        patterns: ['age', 'ENTIER', 'LIRE(age)', 'AFFICHER']
      }
    }
  },
  {
    id: 6,
    title: "Mini-projet final",
    description: "Combine tout ce que tu as appris !",
    icon: "🏆",
    color: "from-amber-400 to-orange-500",
    explanation: {
      title: "Tu es prêt pour le défi final !",
      content: [
        "Tu as appris à déclarer des variables",
        "Tu sais choisir le bon type",
        "Tu maîtrises l'affectation et la modification",
        "Tu peux lire des entrées utilisateur",
        "Il est temps de tout combiner !"
      ],
      animation: "final"
    },
    mission: {
      type: 'fill-blank',
      instruction: "Complète ce programme qui calcule le double d'un nombre :",
      blanks: [
        { text: 'nombre : ___', answer: 'ENTIER' },
        { text: 'resultat : ___', answer: 'ENTIER' },
        { text: 'resultat ← nombre * ___', answer: '2' }
      ]
    },
    quiz: [
      {
        question: "Pour calculer la moyenne de a et b, on écrit :",
        options: [
          "moyenne ← a + b",
          "moyenne ← (a + b) / 2",
          "moyenne ← a / b",
          "moyenne ← a * b / 2"
        ],
        correctIndex: 1,
        explanation: "La moyenne de deux nombres est leur somme divisée par 2."
      },
      {
        question: "Combien de variables faut-il pour stocker prénom et âge ?",
        options: ["1", "2", "3", "0"],
        correctIndex: 1,
        explanation: "Il faut une variable pour le prénom (CHAINE) et une pour l'âge (ENTIER)."
      },
      {
        question: "L'ordre des instructions est-il important ?",
        options: [
          "Non, on peut les mélanger",
          "Oui, il faut déclarer avant d'utiliser",
          "Seulement pour AFFICHER",
          "Seulement le mardi"
        ],
        correctIndex: 1,
        explanation: "Il faut toujours déclarer une variable avant de l'utiliser."
      }
    ],
    exercise: {
      instruction: "Crée un programme qui lit deux nombres et affiche leur somme",
      starterCode: `ALGORITHME Calculatrice
VARIABLES
    // Déclare a, b et somme (ENTIER)

DEBUT
    // Affiche "Premier nombre :"
    // Lis a
    
    // Affiche "Deuxième nombre :"
    // Lis b
    
    // Calcule la somme
    
    // Affiche le résultat
    
FIN`,
      validation: {
        type: 'contains',
        patterns: ['a', 'b', 'somme', 'ENTIER', 'LIRE', 'AFFICHER', '←']
      }
    }
  }
];
