<?php

include_once(PATH . '/Wrk/TaskDBManager.php');
include_once(PATH . '/Modele/Task.php');
class TaskCtrl{

    private $taskDBManager;

    public function __construct(){
        $this->taskDBManager = new TaskDBManager;
    }

    public function newTask($state, $title, $fk_project){

        if($state != null && $title != null && $fk_project != ''){
            $task = new Task(null, $state, $title, $fk_project);
            $result = $this->taskDBManager->saveTask($task);
        }else{
            $result = 'Une erreur est survenue pour cause de manque de données.';
        }

        return json_encode($result);
    }

    public function getListTasks($fk){
        $tasks = $this->taskDBManager->getListTasks($fk);
        return $tasks;
    }
}
?>