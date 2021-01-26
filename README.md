# README #
plouf8

This README would normally document whatever steps are necessary to get your application up and running.

### Procédure de release basée sur git flow  ###

 * Démarrer la release (par exemple 2.1.0)
 git flow release start 2.1.0

 * mettre à jour et commiter le .version
 vim .version (Mettre le bon numéros)
 git add .version
 git commit "bump version"

 * Finir la release
 git flow release finish 2.0.0

 * git pusher (dans le doute depuis master et develop )
 git checkout develop
 git push
 git checkout master
 git push

 * pusher les tags
 git push --tags



* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)
