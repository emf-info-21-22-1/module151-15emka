<?php

    include_once('connexion.php');

    class Equipes {

        public function selectEquipe(){
            $count = 0;
            $liste = array();

            $query = connexion::getInstance()->SelectQuery("SELECT PK_equipe, Nom FROM t_equipe", null);
            $liste = $query;
            return $liste;
        }

    }

?>