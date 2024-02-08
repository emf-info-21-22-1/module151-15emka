/*
 * Contrôleur de la vue "index.html"
 *
 * @author Olivier Neuhaus
 * @version 1.0 / 20-SEP-2013
 */

/**
 * Méthode appelée lors du retour avec succès du résultat des équipes
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerTeamSuccess(data, text, jqXHR) {
  //Appelé lorsque la liste des équipes est reçue
  // var cmbEquipes = document.getElementById("cmbEquipes");
  // cmbEquipes.options.length = 0;
  // $(data).find("equipe").each(function() {
  //     var equipe = new Equipe();
  //     equipe.setPk($(this).find("id").text());
  //     equipe.setNom($(this).find("nom").text());
  //     cmbEquipes.options[cmbEquipes.options.length] = new Option(equipe, JSON.stringify(equipe));
  // });
  // Appelé lorsque la liste des équipes est reçue
  var cmbEquipes = document.getElementById("cmbEquipes");
  cmbEquipes.options.length = 0;

  // Convertir le JSON en objet JavaScript
  var equipesData = data;

  // Parcourir les données des équipes
  equipesData.forEach(function (equipeData) {
    var equipe = new Equipe();
    equipe.setPk(equipeData.PK_equipe);
    equipe.setNom(equipeData.Nom);
    cmbEquipes.options[cmbEquipes.options.length] = new Option(
      equipe.toString(),
      equipe.getPk()
    );
  });
}

/**
 * Méthode appelée lors du retour avec succès du résultat des joueurs
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerPlayerSuccess(data, text, jqXHR) {
  // Appelé lorsque la liste des joueurs est reçue
  // var cmbJoueurs = document.getElementById("cmbJoueurs");
  // // A COMPLETER!!! selon la logique suivante:
  // // cmbJoueurs.options[cmbJoueurs.options.length] = new Option(<ce qui sera affiché>, <la valeur de la cellule>));
  // cmbJoueurs.options.length=0;
  // $(data).find("joueur").each(function(){
  //     var joueur = new Joueur();
  //     joueur.setNom($(this).find("nom").text());
  //     joueur.setPoints($(this).find("points").text());
  //     cmbJoueurs.options[cmbJoueurs.options.length] = new Option(joueur, JSON.stringify(equipe));
  // });
  // Vider la comboBox avant de peupler les options
  var cmbJoueurs = document.getElementById("cmbJoueurs");
  cmbJoueurs.options.length = 0;

  // Convertir le JSON en objet JavaScript
  var joueursData = data;

  // Parcourir les données des équipes
  joueursData.forEach(function (joueurData) {
    var joueur = new Joueur();

    joueur.setNom(joueurData.Nom);
    joueur.setPoints(joueurData.Points);
    var option = new Option(joueur.toString(), joueur.getPoints());
    option.setAttribute("data-nom", joueur.toString()); // Ajouter le nom du joueur comme attribut
    cmbJoueurs.appendChild(option); // Ajouter l'option à la ComboBox
  });
}

/**
 * Méthode appelée en cas d'erreur lors de la lecture du webservice
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerTeamError(request, status, error) {
  alert("erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Méthode appelée en cas d'erreur lors de la lecture du webservice
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerPlayerError(request, status, error) {
  alert("erreur : " + error + ", request: " + request + ", status: " + status);
}

/**
 * Méthode "start" appelée après le chargement complet de la page
 */
$(document).ready(function () {
  var butLoad = $("#displayTeams");
  var cmbEquipes = $("#cmbEquipes");
  var cmbJoueurs = $("#cmbJoueurs");
  var equipe = "";
  var joueur = "";
  $.getScript("javascripts/beans/equipe.js", function () {
    console.log("equipe.js chargé !");
  });
  $.getScript("javascripts/beans/joueur.js", function () {
    console.log("joueur.js chargé !");
  });
  $.getScript("javascripts/services/servicesHttp.js", function () {
    console.log("servicesHttp.js chargé !");
    chargerTeam(chargerTeamSuccess, chargerTeamError);
  });

  // Ce qui se passe lorsque l'on sélectionne une équipe
  cmbEquipes.change(function (event) {
    equipe = this.options[this.selectedIndex].value;
    chargerPlayers(equipe, chargerPlayerSuccess, chargerPlayerError);
  });

  // Ce qui se passe lorsque l'on sélectionne une joueur
  cmbJoueurs.change(function (event) {
    var option = this.options[this.selectedIndex];
    var nom = option.getAttribute("data-nom");
    var points = option.value;
    alert(nom + ": " + points + " points");
  });
});