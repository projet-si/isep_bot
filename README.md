# Projet Bot Discord
TODO: Ceci est le projet d'Architecture des SI : Bot Discord

# Collaborateurs

- Charlène Bernier

- Yvan Bezard-Falgas

- Maxime Pasqualini

- Mickael Petit

- Sacha Mettoudi

# Nom du Bot
Baby-Groot

# Commandes

Spotify : 
---------
Pour spotify, nous avons réussi à retourner les 3 résultats les plus probants propre à la recherche (track, artiste, album) et donc le bonus demandé et intégré comme prévu, c'est à dire soit 3 albums, 3 artistes ou 3 tracks.
```
!spotify track marecherche

!spotify artist marecherche

!spotify album marecherche
```

Bien entendu, la recherche doit existée sinon, nous ne retournons rien.

Google translate : 
------------------
```
!translate mywords

Le myword est traduit en espagnol.

!!translate language mywords

language : langue dans laquelle on souhaite traduire (exemple : espagnol ==> es)
mywords : mot ou phrase traduite

!help```

Indique toutes les langues disponibles à l'utilisateur.

Youtube : 
---------
!youtube marecherche

Pour youtube, nous avons réussi a retourner les 3 résultats les plus probants propre à la recherche.
Il est possible de rechercher 3 user, 3 playlists, 3 vidéos seuleument à l'aide des commandes suivantes :

!youtube-user marecherche

!youtube-playlist marecherche 


Twitter :
---------
!twitter monTweet: Tweet sur le compte @Baby_Groot_ISEP

!twitter search: ressort tous les tweets qui citent le compte @Baby_Groot_ISEP

https://twitter.com/Baby_Groot_ISEP

Pokemon :
---------


Openweather : 
-------------
!openweather marecherche

Ici, il faut que la recherche soit le nom d'une ville en anglais.
Cette première requête retourne des éléments sur la météo actuelle d'une ville, son humidité, sa température (actuelle, minimale, maximale), la vitesse du vent et enfin nous avons ajouté une petite description par exemple "ciel dégagé, "peu nuageux" etc.

!forecast marecherche

La recherche doit être le nom d'une ville en anglais.
Cette deuxième requête retourne la témpérature actuelle et prévisionnelle sur 5 jours ainsi qu'une descrption générale de la météo pour chacun de ces jours.

Problèmes rencontrés :
----------------------

Le compte travis a bien été configuré en cours avec le compte Azure, cependant notre bot n'est plus déployé automatiquement.
Nous avons essayé de configurer Azure directement avec github mais là non plus, le déploiement ne fonctionne pas.
Pour le lançer, nous sommes obligés de faire un pull de la master et écrire dans le terminal "node bot js" ou "npm start".
