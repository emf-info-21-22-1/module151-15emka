<?php

include_once(PATH . '/Modele/Post.php');
include_once(PATH . '/Wrk/Connexion.php');

class PostDBManager{

    public function savePost(Post $post){
        $connexion = Connexion::getInstance();
        return "Le post '{$post->getComments()}' a été sauvegardé avec succès !";
    }

    public function getListPosts(){
        $posts = array();
        $posts[0] = new Post(1, 'Commentaire poste 1', '28.02.2024');
        $posts[1] = new Post(2, 'Commentaire poste 2', '28.02.2024');
        $posts[2] = new Post(3, 'Commentaire poste 3', '28.02.2024');
        $posts[3] = new Post(4, 'Commentaire poste 4', '28.02.2024');

        $data = array();
        foreach ($posts as $post){
            $data[] = $post->toArray();
        }

        return $data;
    }

}
?>