<?php

class Task{

    private $pk;
    private $state;
    private $title;

    private $fk_project;

    public function __construct($pk, $state, $title, $fk_project){
        $this->pk = $pk;
        $this->state = $state;
        $this->title = $title;
        $this->fk_project = $fk_project;
    }

    public function getPk()
    {
        return $this->pk;
    }
    public function getState()
    {
        return $this->state;
    }
    public function getTitle()
    {
        return $this->title;
    }
    public function getFKProject()
    {
        return $this->fk_project;
    }

    public function toArray(){
        return array(
            'pk' => $this->getPk(),
            'state' => $this->getState(),
            'title' => $this->getTitle(),
            'fk_project' => $this->getFKProject()
        );
    }

    public function __toString(){
        return $this->title;
    }
}

?>