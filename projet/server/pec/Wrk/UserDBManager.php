<?php

include_once(PATH . '/Modele/User.php');
include_once(PATH . '/Wrk/Connexion.php');

class UserDBManager
{


    public function saveUser(User $user)
    {
        $connexion = Connexion::getInstance();
        $sql = "INSERT INTO t_user (username, email, password) VALUES (:username, :email, :password)";
        $params = array(
            ':username' => $user->getUsername(),
            ':email' => $user->getEmail(),
            ':password' => password_hash($user->getPassword(), PASSWORD_DEFAULT)
        );
        try {
            $stmt = $connexion->executeQuery($sql, $params);
            if ($stmt != 0) {
                return array("accountOk" => true);
            } else {
                return array("accountOk" => false);
            }
        } catch (PDOException $e) {
            return "Une erreur s'est produite lors de l'ajout de l'utilisateur : " . $e->getMessage();
        }
    }

    public function checkIfMailExists($email){
        $connexion = Connexion::getInstance();
        $sql = "SELECT COUNT(*) FROM t_user WHERE email = :email";
        $params = array(':email' => $email);
        try {
            $stmt = $connexion->checkIfExists($sql, $params);
            if (!$stmt) {
                return false;
            } else {
                return true;
            }
        } catch (PDOException $e) {
            return "Une erreur s'est produite lors de la vérification du mail : " . $e->getMessage();
        }
    }
    public function getPasswordFromMail($mail){
        $connexion = Connexion::getInstance();
        $sql = "SELECT password FROM t_user WHERE email = :email";
        $params = array(':email' => $mail);
        try {
            $stmt = $connexion->selectSingleQuery($sql, $params);
            if($stmt != null){
                return $stmt;
            }
        } catch (PDOException $e) {
            return "Une erreur s'est produite lors de la vérification du mot de passe : " . $e->getMessage();
        }
    }

    public function getListUsers()
    {
        $users = array();
        $users[0] = new User(null, 'user1', 'test', 'user1@gmail.com');
        $users[1] = new User(null, 'user2', 'test', 'user2@gmail.com');
        $users[2] = new User(null, 'user3', 'test', 'user3@gmail.com');
        $users[3] = new User(null, 'user4', 'test', 'user4@gmail.com');

        $data = array();
        foreach ($users as $user) {
            $data[] = $user->toArray();
        }
        return $data;
    }

    public function getUser($pk)
    {
        return "Le user '{$pk}' a été récupéré avec succès !";
    }
}

?>