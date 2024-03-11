<?php

include_once(PATH . '/Modele/Project.php');
include_once(PATH . '/Wrk/ProjectDBManager.php');
include_once(PATH . '/Ctrl/SessionManager.php');

class ProjectCtrl{

    private $projectDBManager;
    private $session;

    public function __construct(){
        $this->projectDBManager = new ProjectDBManager;
        $this->session = SessionManager::getInstance();
    }

    public function newProject($title, $description){
        if ($this->session->has('email')) {
            if ($title != null) {
                $project = new Project(null, $title, $description);
                $result = $this->projectDBManager->saveProject($project);
            } else {
                return http_response_code(401);
            }
            return json_encode($result);
        } else {
            return http_response_code(401);
        }
    }

    public function getListProjects(){
        //Créer une liste de projet et la remplir avec projectDBManager
        //retourner la liste
        $projects = $this->projectDBManager->getListProjects();
        return $projects;
    }

    public function getProject($pk){
        return $this->projectDBManager->getProject($pk);
    }
}
?>