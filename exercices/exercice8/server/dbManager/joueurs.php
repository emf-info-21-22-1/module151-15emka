<?php

    include_once('connexion.php');

    class Joueurs {

        public function selectJoueur($fk) {
            $liste = array();
        
            // Préparez la requête SQL avec un paramètre à lier
            $query = "SELECT PK_joueur, Nom, Points FROM t_joueur WHERE FK_equipe = ?";
            
            // Exécutez la requête avec la valeur du paramètre
            $liste = connexion::getInstance()->SelectQuery($query, [$fk]);
        
            return $liste;
        }
        

    }

?>