<?php

class Project {

    private $pk;
    private $title;
    private $description;

    public function __construct($pk, $title, $description){
            $this->pk = $pk;
            $this->title = $title;
            $this->description = $description;
    }

    public function getPk(){
        return $this->pk;
    }
    public function getTitle(){
        return $this->title;
    }
    public function getDescription(){
        return $this->description;
    }

    public function toArray(){
        return array(
            'pk' => $this->getPk(),
            'title' => $this->getTitle(),
            'description' => $this->getDescription()
        );
    }

    public function __toString(){
        return $this->title;
    }
}

?>