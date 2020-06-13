# Projet API modal

## Fonctionnalités
- Regrouper le menu hamburger et les boîtes modales. Les fonctionnalités et fonctions sont très proches.
- Permet d'associer un déclencheur à une cible. Quand ce déclencheur est activé, la cible s'ouvrira. S'il est de nouveau activé, ou si l'utilisateur clique en dehors ou appuie sur ESCAPE, la cible se fermera.
- Lors de l'ouverture de la cible:
    - Le fond s'assombri et devient flou.
    - La navigation par tabulation du contenu est supprimée.
    - La navigation par tabulation de la cible es activée.
    - Plus de scroll possible.
- Lors de la fermeture, c'est l'inverse.
- Le fond noir et les boîtes modales peuvent être accompagnés d'animations.

## Utilisation
- Les éléments déclencheurs doivent posséder la classe `modal-trigger`.
- Les cibles doivent posséder la classe `modal-target`.
- Déclencheurs et cibles doivent posséder un id.
- Les déclencheurs doivent posséder l'attribut `data-modal-target` contenant l'id de la cible.
- le contenu principal doit être placé dans un élément `#content`. Cet élément peut contenir des déclencheurs mais pas de cibles.
- Les cibles doivent être insérées en dehors du contenu.
- Un élément `#background` doit être présent en dehors du contenu.
- En position initiale, aucun élément ne possède de classe et les boîtes modales ne sont pas présents sur la page (`display: none;`). En cas de redimensionnement de la page, cet état doit être de nouveau atteint.
- Lorsque qu'une boîte modals est ouverte:
    - Le déclencheur possède la classe `.target-opened`.
    - La cible possède la classe `.opened`.
    - Le body possède la classe `.modal-opened`.
- Lorsque qu'une boîte modale est fermée:
    - Le déclencheur possède la classe `.target-closed`.
    - La cible possède la classe `.closed`.
- Une boîte modale fermée ne disparaît pas de l'écran mais est rendu invisible. On peut réduire son opacité, le mettre derrière le contenu, le mettre loin du bord de la page, ...
