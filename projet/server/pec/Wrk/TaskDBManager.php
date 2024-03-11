<?php

include_once(PATH . '/Modele/Task.php');

class TaskDBManager{

    public function saveTask(Task $task){
        $connexion = Connexion::getInstance();
        $sql = "INSERT INTO t_task (state, title, fk_project) VALUES (:state, :title, :fk_project)";
        $params = array(
            ':state' => $task->getState(),
            ':title' => $task->getTitle(),
            ':fk_project' => $task->getFKProject()
        );
        try {
            $stmt = $connexion->executeQuery($sql, $params);
            if ($stmt != 0){
                return array("newTaskOk" => true);
            } else {
                return array("newTaskOk" => false);
            }
        } catch (PDOException $e) {
            return "Une erreur s'est produite lors de l'ajout d'une tâche : " . $e->getMessage();
        }
    }

    public function getListTasks($fk){
        $connexion = Connexion::getInstance();
        $sql = "SELECT pk_task, state, title, fk_project FROM t_task WHERE fk_project = :fk_project";
        $params = array(
            ':fk_project' => $fk
        );
        try {
            $stmt = $connexion->selectQuery($sql, $params);
            if ($stmt){
                $data = array();
                foreach ($stmt as $task){
                    // Créer un nouvel objet Project avec les données de la base de données
                    $tk = new Task($task['pk_task'], $task['state'], $task['title'], $task['fk_project']);
                    // Ajouter le projet à la liste des résultats
                    $data[] = $tk->toArray();
                }
                return $data;
            } else {
                return "Un problème est survenu.";
            }
        } catch (PDOException $e) {
            return "Une erreur s'est produite lors de la récupération des tâches : " . $e->getMessage();
        }
    }
}
?>