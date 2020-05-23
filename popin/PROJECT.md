# Projet Popin

## Fonctionnalités
- Le popin s'ouvre quand:
    - on clique sur le bouton d'ouverture.
- Lorsque le popin est ouvert:
    - il est impossible d'accéder au reste de la page sans le fermer, même par tabulation;
    - les scrolls vertical et horizontal sont bloqués;
    - le reste de la page est flouté et assombri.
- Le popin se ferme quand:
    - on clique à l'extérieur du popin;
    - on clique sur la croix de fermeture du popin;
    - on appuie sur la touche Echap.
- Lorsque le popin est fermé:
    - il est impossible d'y accéder sans l'ouvrir, même par tabulation.

## Utilisation
- Le contenu principal de la page doit être placé dans un élément d'id `#content`.
- Le popin est placé en dehors de cet élément et possède la classe `.popin` ainsi qu'un id.
- L'élément d'ouverture possède la classe `.popin-opener` ainsi que l'attribut `data-popin-target` contenant l'id du popin à ouvrir.
- Un élément bloc avec l'id `#blur` doit également est présent en dehors du contenu.
- Le popin est par défaut caché et inaccessible avec `display: none;`. Pour l'afficher, on lui donnera la class `.opened`.
- Lorsqu'un popin est ouvert, l'élément body de la page récupèrera la classe `popin-opened` ce qui permet entre autre d'afficher l'élément d'assombrissement ou de rendre flou le contenu. Il permettra aussi d'ajouter d'autres comportements.
