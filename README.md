# Projet Bot Discord
TODO: Ceci est le projet d'Architecture des SI : Bot Discord

# Nom du Bot
Baby-Groot

# Commandes
Youtube : !youtube marecherche
Pour youtube, nous avons réussi a retourner les 3 résultats les plus probants propre à la recherche.
Il est possible de rechercher 3 user seuleument à l'aide de la commande :

!youtube-user marecherche

!youtube-playlist marecherche (Nous avons eu un problème avec cette requête : elle fonctionne en ajoutant youtube.addParam('type','playlist') au niveau des déclarations des variables. Cependant, lors qu'on ajoute ce paramètre playlist, il nous est impossible d'avoir de nouveau accès au videoId et donc la requête !youtube marecherche rencontre un undefined. C'est comme si elle remplaçait le paramètre videoId et vice-versa ; si on ajoute le paramètre youtube.addParam('type','video') on a accès au videoId mais pas au playlistId).

Spotify : !spotify marecherche
Pour spotify, nous avons réussi à retourner les 3 résultats les plus probants propre à la recherche (track, artiste, album) mais aussi le bonus demandé c'est à dire soit 3 albums, 3 artistes ou 3 tracks.

!spotify artiste marecherche

!spotify track marecherche

!spotify album marecherche

Google translate :


Twitter :


Openweather :


# Collaborateurs
- Charlène Bernier
- Yvan Bezard-Falgas
- Maxime Pasqualini
- Mickael Petit
- Sacha Mettoudi
