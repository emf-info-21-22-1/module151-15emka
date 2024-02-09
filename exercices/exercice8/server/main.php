<?php 

    include_once('ctrl/EquipesCtrl.php');
    include_once('ctrl/Joueurs.php');

    $equipeDB = new EquipeCtrl();
    $joueurDB = new JoueurCtrl();

    if ($_GET['action'] == "equipe") {

        echo $equipeDB->getEquipesJSON();

    }

    if ($_GET['action'] == "joueur") {

        echo $joueurDB->getJoueursJSON($_GET['equipeId']);

    }

?>