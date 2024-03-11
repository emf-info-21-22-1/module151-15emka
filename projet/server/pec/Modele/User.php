<?php

class User {

    private $pk;
    private $username;
    private $password;
    private $email;

    public function __construct($pk, $username, $password, $email) {
        $this->pk = $pk;
        $this->username = $username;
        $this->password = $password;
        $this->email = $email;
    }

    public function getPk()
    {
        return $this->pk;
    }
    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getEmail() {
        return $this->email;
    }

    public function toArray(){
        return array(
            'pk' => $this->getPk(),
            'username' => $this->getUsername(),
            'password' => $this->getPassword(),
            'email' => $this->getEmail()
        );
    }

    public function __toString()
    {
        return $this->username;
    }
}
?>