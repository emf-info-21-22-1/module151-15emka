<?php 

    include_once('dbManager/equipes.php');
    include_once('dbManager/joueurs.php');

    $equipeDB = new Equipes();
    $joueurDB = new Joueurs();

    if ($_GET['action'] == "equipe") {

        echo json_encode($equipeDB->selectEquipe());

    }

    if ($_GET['action'] == "joueur") {

        echo json_encode($joueurDB->selectJoueur($_GET['equipeId']));

    }

?>