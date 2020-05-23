# Projet Menu

## Fonctionnalités
- Le menu va changer de forme en fonction de la taille de l'écran.
### Grands écrans
Le menu est un menu simple, avec une mise en page en ligne.
### Ecrans de taille moyenne
Pas de comportement particulier, les liens font un retour à la ligne s'ils n'ont pas la place de se mettre à la suite.
### Petits écrans
Les petits écrans ont le droit à un menu de type hamburger.
- Un bouton est présent en bas à droite de l'écran, position fixe.
- Le menu s'ouvre quand:
    - on clique sur le bouton.
- Comportement de l'ouverture:
    - animation du bouton hamburger en bouton croix;
    - glissement du menu depuis la droite;
    - le menu occupe toute la hauteur de l'écran et une partie de la largeur.
- Lorsque le menu est ouvert:
    - il est impossible d'accéder au reste de la page sans le fermer, même par tabulation;
    - les scrolls vertical et horizontal sont bloqués;
    - le reste de la page est flouté et assombri.
- Le menu se ferme quand:
    - on clique sur le bouton;
    - on appuie sur Echap;
    - on clique en dehors du menu.
- Comportement de la fermeture:
    - animation du bouton croix en bouton hamburger;
    - glissement du menu vers la droite.
- Lorsque le menu est fermé:
    - il est impossible d'y accéder sans l'ouvrir, même par tabulation.

## Utilisation
### Menu simple
- Le menu de base est le menu simple pour les grands écrans. Le style est appliqué par l'utilisateur.
- L'élément du menu doit posséder un id.
- On utilisera flexbox pour gérer l'alignement des menus ainsi que le retour à la ligne.
### Menu hamburger
- Tout le contenu principal de la page doit être placé dans une balise avec l'id `#content`.
- Le bouton du menu hamburger doit être placé à l'extérieur du contenu et doit posséder la classe `.hamburger-menu-button`. Le contenu sera inséré dynamiquement. Il doit également posséder l'attribut `data-hamburger-menu-target` contenant l'id du conteneur du menu à ouvrir.
- Le conteneur du menu hamburger doit posséder la classe `.hamburger-menu-wrapper` ainsi qu'un id. Il peut être stylisé comme souhaité. On peut lui donner l'attribut `data-linked-menu` pour le remplir automatiquement avec les liens du menu lié (utiliser l'id du menu).
- Les menus remplacés doivent posséder la classe `.hamburger-compatible` pour pouvoir être cachés.
- Un élément bloc avec l'id `#blur` doit également est présent en dehors du contenu.
- Par défaut le menu est caché et inaccessible avec `display: none;`. L'affichage se fait avec l'ajout de la classe `.opened` au menu, qui va le faire apparaître et déclencher l'animation d'ouverture.
- L'état du bouton varie en fonction d'une classe. Sans cette classe, animation hamburger. Avec la classe `.hamburger-opened`, animation en croix.
- Lorsqu'un menu est ouvert, l'élément body de la page récupèrera la classe `hamburger-menu-opened` ce qui permet entre autre d'afficher l'élément d'assombrissement ou de rendre flou le contenu. Il permettra aussi d'ajouter d'autres comportements.
