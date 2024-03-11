<?php

include_once(PATH . '/Modele/Post.php');
include_once(PATH . '/Wrk/PostDBManager.php');
include_once(PATH . '/Ctrl/SessionManager.php');

class PostCtrl{

    private $postDBManager;
    private $session;

    public function __construct(){
        $this->postDBManager = new PostDBManager;
        $this->session = new SessionManager();
    }

    public function newPost($comments, $datePub){
        if ($this->session->get('email') != null) {
            if ($comments != null && $datePub != null) {
                $post = new Post(null, $comments, $datePub);
                $result = $this->postDBManager->savePost($post);
            } else {
                $result = 'Une erreur est survenue pour cause de manque de données.';
            }
            return $result;
        } else {
            return 'Vous devez être connecté pour effectuer cette action.';
        }
    }

    public function getListPosts(){
        $posts = $this->postDBManager->getListPosts();
        return $posts;
    }
}
?>