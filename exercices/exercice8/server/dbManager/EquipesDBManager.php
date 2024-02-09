<?php

    include_once('Connexion.php');

    class EquipesDBManager {

        public function selectEquipe(){
            $liste = array();

            $query = connexion::getInstance()->SelectQuery("SELECT PK_equipe, Nom FROM t_equipe", null);
            $liste = $query;
            return $liste;
        }

    }

?>