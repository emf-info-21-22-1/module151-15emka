<?php

class Post{

    private $pk;
    private $comments;
    private $datePub;

    public function __construct($pk, $comments, $datePub){
        $this->pk = $pk;
        $this->comments = $comments;
        $this->datePub = $datePub;
    }

    public function getPk()
    {
        return $this->pk;
    }
    public function getComments()
    {
        return $this->comments;
    }
    public function getDatePub()
    {
        return $this->datePub;
    }

    public function toArray(){
        return array(
            'pk' => $this->getPk(),
            'comments' => $this->getComments(),
            'datePub' => $this->getDatePub()
        );
    }

    public function __toString(){
        return $this->comments;
    }
}
?>