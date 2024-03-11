<?php

include_once(PATH . '/Modele/Project.php');
include_once(PATH . '/Wrk/Connexion.php');

class ProjectDBManager{

    public function saveProject(Project $project){
        $connexion = Connexion::getInstance();
        $sql = "INSERT INTO t_project (title, description) VALUES (:title, :description)";
        $params = array(
            ':title' => $project->getTitle(),
            ':description' => $project->getDescription()
        );
        try {
            $stmt = $connexion->executeQuery($sql, $params);
            if ($stmt != 0){
                return array("newProjectOk" => true);
            } else {
                return array("newProjectOk" => false);
            }
        } catch (PDOException $e) {
            return "Une erreur s'est produite lors de l'ajout d'un projet : " . $e->getMessage();
        }
    }

    public function getListProjects(){
        $connexion = Connexion::getInstance();
        $sql = "SELECT pk_project, title, description FROM t_project";
        try {
            $stmt = $connexion->selectQuery($sql, null);
            if ($stmt){
                $data = array();
                foreach ($stmt as $proj){
                    // Créer un nouvel objet Project avec les données de la base de données
                    $project = new Project($proj['pk_project'], $proj['title'], $proj['description']);
                    // Ajouter le projet à la liste des résultats
                    $data[] = $project->toArray();
                }
                return $data;
            } else {
                return http_response_code(401);
            }
        } catch (PDOException $e) {
            return http_response_code(401);
        }
    }

    public function getProject($pk){
        $connexion = Connexion::getInstance();
        $sql = "SELECT pk_project, title, description FROM t_project WHERE pk_project = :pk_project";
        $params = array(
            ':pk_project' => $pk
        );
        try {
            $stmt = $connexion->selectSingleQuery($sql, $params);
            if ($stmt != null) {
                return $stmt;
            } else {
                return "Un problème est survenu.";
            }
        } catch (PDOException $e) {
            return "Une erreur s'est produite lors de la récupération du projet : " . $e->getMessage();
        }
    }

}
?>