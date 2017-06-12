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

Google translate : 
------------------
```
!translate mywords

Le myword est traduit en espagnol.

!!translate language mywords

language : langue dans laquelle on souhaite traduire (exemple : espagnol ==> es)
mywords : mot ou phrase traduite

!help
Indique toutes les langues disponibles à l'utilisateur.
```

Youtube : 
---------
Pour youtube, nous avons réussi a retourner les 3 résultats les plus probants propre à la recherche.
Il est possible de rechercher 3 user, 3 playlists, 3 vidéos seuleument à l'aide des commandes suivantes :

```
!youtube marecherche

!youtube-user marecherche

!youtube-playlist marecherche 

!youtube-videos marecherche
```

Twitter :
---------
```
!twitter monTweet: Tweet sur le compte @Baby_Groot_ISEP avec une limite de 140 caractères.

!twitter search: ressort tous les tweets qui citent le compte @Baby_Groot_ISEP
```

https://twitter.com/Baby_Groot_ISEP

Spotify : 
---------
Avant la mise à jour de l'API de spotify api, nous arrivions à effectuer une recherche générale. Depuis la mise à jour nous arrivons à retourner les 3 résultats les plus probants propre à la recherche (seuleument 3 tracks ou 3 artistes ou 3 albums).
```
!spotify track marecherche

!spotify artist marecherche

!spotify album marecherche
```

Bien entendu, la recherche doit existée sinon, nous ne retournons rien.

Pokemon :
---------
```
!pokemon monpokemon

!pokemon evolve
```
Le nom des pokemon doit être en anglais.
Le pokemon évolue si évolution possible et retourne un message de présentation du nouveau pokemon.
L'avatar et username sont changés.

NB : le username et l'avatar ne peuvent être changés que 2 fois par heure sur discord.


Openweather : 
-------------

```
!openweather marecherche
```
Ici, il faut que la recherche soit le nom d'une ville en anglais.
Cette première requête retourne des éléments sur la météo actuelle d'une ville, son humidité, sa température (actuelle, minimale, maximale), la vitesse du vent et enfin nous avons ajouté une petite description par exemple "ciel dégagé, "peu nuageux" etc.

```
!forecast marecherche
```
La recherche doit être le nom d'une ville en anglais.
Cette deuxième requête retourne la témpérature actuelle et prévisionnelle sur 5 jours ainsi qu'une descrption générale de la météo pour chacun de ces jours.

Dans le cadre d'openweather, nous n'avons pas réussi à réaliser le bonus.

Problèmes rencontrés :
----------------------

Le compte travis a bien été configuré en cours avec le compte Azure, cependant notre bot n'est plus déployé automatiquement.
Nous avons essayé de configurer Azure directement avec github mais là non plus, le déploiement ne fonctionne pas.
Pour le lançer, nous sommes obligés de faire un pull de la master et écrire dans le terminal "node bot js" ou "npm start".

Lien url de notre web app sur Azure : http://isepbotycmms.azurewebsites.net
