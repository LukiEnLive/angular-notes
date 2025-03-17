# angular-notes

## Rythme

Cette activité a été calibrée pour vous permettre de travailler à votre rythme durant les TD/TP et au-delà.

> [!NOTE]
> Cela ne vous empêche pas de travailler sur le projet de votre coté et d'échanger sur le sujet.

> [!CAUTION]
> Vous êtes responsables de votre code. Si, par exemple, votre poste souffre d'une perte soudaine d'un disque et que vous perdez tout votre projet, c'est triste.
> Pareil si vous avez fait une fausse manipulation et que plus rien ne fonctionne.
> Imaginez si vous aviez sauvegardé votre code via, par exemple, un gestionnaire de versions, comme Git, avec une sauvegarde externe (comme un serveur Gitlab ou encore Github).

## Objectif

Nous allons réaliser une application de bloc-notes, afin de saisir des notes, les ranger dans l'ordre souhaité ou encore y ajouter des tags.
Chaque note sera définie par un titre, une couleur de fond et un contenu. Les notes "classiques" contiendront un contenu textuel, pendant que les notes "checklist" seront sous la forme d'une liste de cases à cocher.
Les "tags" ou "étiquettes" seront des libellés gérés à part, que l'on pourra ajouter sur une note.

> [!IMPORTANT]
> L'application ne fonctionne qu'en local avec un stockage sur la machine, et sera conçue pour fonctionner sur un serveur web. Il n'est pas nécessaire de chercher coté solutions de déploiement, encore moins sur electron et consorts.

## Partie 1 : Maquettage

Réalisez un maquettage de votre application.
Ce maquettage comprendra l'écran principal, les couleurs principalement utilisées, ainsi que les différents concepts souhaités.
Il est recommandé de réaliser une maquette d'exemple en pur HTML/CSS pour ces écrans.

> [!NOTE]
> Il existe de nombreuses ressources sur le design applicatif Web et ses principes. La majorité de ces ressources viennent avec des librairies qui complexifient grandement le développement. Un exemple est le [Material Design](https://en.wikipedia.org/wiki/Material_Design), qui a suivi le Flat Design, et est étroitement lié à Google. Rien ne vous empêche de prendre les principes du Material Design (comme le [principe de couleurs pré-définies en catégories](https://m2.material.io/design/color/the-color-system.html)) sans en utiliser ses librairies.

> [!TIP]
> La création d'écrans de démos en HTML/CSS aidera grandement la suite du travail. On parle bien d'écrans de démonstration statiques avec des fausses "données".

## Partie 2 : Squelette

Réalisez un squelette HTML/CSS de votre application.
Vous aurez au minimum 3 écrans :
- l'écran d'accueil, avec une recherche de notes et la liste des notes
- l'écran d'édition d'une note
- l'écran d'édition des tags

## Partie 3 : Javascript

Grâce à Javascript et sans aucune librairie externe, ajoutez du dynamisme à votre application.
Les différents éléments cités plus loin ne sont que des aides pour le développement, sans aucun ordre précis.
Il est probable que vous ne puissiez pas terminer l'intégralité des éléments - cela fait partie de l'exercice.

### 3.1 : Sauvegarde

Les notes doivent être sauvegardées en local, via localStorage par exemple. Evidemment, tout élément supposé être persistant (ordre des notes, tags...) doivent l'être aussi.

### 3.2 : Ordonnancement

Il est nécessaire de pouvoir ordonnancer les notes, donc en changer l'ordre.

### 3.3 : Tags

On doit pouvoir créer / éditer / supprimer des étiquettes ou tags. Sur une note, on doit pouvoir ajouter / retirer un ou plusieurs tags.
Un tag comporte un nom et une couleur de fond. La couleur de texte sera automatiquement la même que la couleur de fond en opposé.

### 3.4 : Recherche

On doit pouvoir rechercher des notes par leur titre ou par tag.

### 3.5 : Types de notes

Deux types de notes peuvent être réalisées : des notes classiques contenant du texte pur, ou des notes de type "checklist" contenant une liste d'éléments pouvant être cochés.

### 3.6 : Couleur de fond

On doit pouvoir changer la couleur de fond d'une note.


## Partie 4 : Angular

L'objectif est de réaliser la même application en Angular. Profitez de cet exercice pour vous entraîner à la création de composants (un composant Note, imaginez ?), la création de services (peut-être pour sauvegarder ?).
