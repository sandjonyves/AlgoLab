import { Link } from 'react-router-dom';
import { Code2, BookOpen, ArrowRight, Sparkles, Gamepad2 } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-5 flex items-center justify-between max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
            <Code2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">VsAlgo</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/editor" className="hover:text-foreground transition-colors">
            Éditeur
          </Link>
          <Link to="/learning" className="hover:text-foreground transition-colors">
            Apprentissage
          </Link>
          <Link to="/variable-quest" className="hover:text-foreground transition-colors">
            Variable Quest
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>v1.0</span>
        </div>
      </header>

      {/* Hero content */}
      <main className="relative z-10 px-6 flex flex-col justify-center min-h-[calc(100vh-80px)] max-w-[1400px] mx-auto">
        <div className="max-w-2xl space-y-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Apprends
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              l'Algorithmique
            </span>
            <br />
            en Français.
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
            VsAlgo est ta passerelle vers le monde de la programmation.
            Écris, exécute et visualise tes algorithmes pas à pas,
            le tout avec une syntaxe 100% française.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              to="/learning"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <BookOpen className="w-5 h-5" />
              Commencer l'apprentissage
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/editor"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold border-2 border-border bg-card/60 backdrop-blur-sm text-foreground hover:bg-card hover:border-primary/40 hover:scale-[1.02] transition-all duration-200"
            >
              <Code2 className="w-5 h-5" />
              Ouvrir VsAlgo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-6 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Cours interactifs</span>
            </div>
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-warning" />
              <span className="text-muted-foreground">Mini-jeux éducatifs</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-secondary" />
              <span className="text-muted-foreground">Exécution en temps réel</span>
            </div>
          </div>
        </div>

        {/* Floating card preview */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[380px]">
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl p-6 space-y-4 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="ml-2 font-mono">CalculSomme.algo</span>
            </div>
            <pre className="font-mono text-xs leading-relaxed text-foreground/80 overflow-hidden">
{`ALGORITHME CalculSomme
VARIABLES
    n : ENTIER
    somme : ENTIER
DEBUT
    LIRE(n)
    somme ← 0
    POUR i ← 1 A n FAIRE
        somme ← somme + i
    FINPOUR
    AFFICHER(somme)
FIN`}
            </pre>
            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success font-medium">Prêt à exécuter</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
