<?php

include_once(PATH . '/Modele/User.php');
include_once(PATH . '/Wrk/UserDBManager.php');
include_once(PATH . '/Ctrl/SessionManager.php');

class UserCtrl
{
    private $userDBManager;
    private $session;

    public function __construct()
    {
        $this->userDBManager = new UserDBManager;
        $this->session = SessionManager::getInstance();
    }

    public function signUp($username, $password, $email)
    {
            // Création d'une instance de modèle User
            $user = new User(null, $username, $password, $email);

            // Enregistrement de l'utilisateur dans la base de données
            $result = $this->userDBManager->saveUser($user);

            return json_encode($result);
    }



    public function signIn($email, $password)
    {
        if(!$this->userDBManager->checkIfMailExists($email)){
            return json_encode(array('accountExists' => false), http_response_code(401));
        } else {
            if (!$this->checkPassword($email, $password)){
                return json_encode(array('loginOk' => false), http_response_code(401));
            } else {
                return json_encode(array('loginOk' => true));
            }
        }
    }

    public function logout(){
        if ($this->session->destroy()) {
            return json_encode(array('logoutOk' => true));
        } else {
            return json_encode(array('logoutOk' => false));
        }
    }



    public function getListUsers(){
        $users = $this->userDBManager->getListUsers();
        return $users;
    }

    public function getUser($pk){
        return $this->userDBManager->getUser($pk);
    }




    public function checkPassword($mail, $password): bool
    {
        $ok = false;
        if (password_verify($password, $this->userDBManager->getPasswordFromMail($mail)['password'])) {
            $this->session->set('email', $mail);
            $ok = true;
        }
        return $ok;
    }
}
