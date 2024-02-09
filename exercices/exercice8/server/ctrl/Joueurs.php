<?php
require_once('../dbManager/JoueursDBManager.php');
class JoueurCtrl{
  
  private $manager;
  
  public function __construct(){
    $this->manager = new JoueursDBManager();
  }
  
  public function getJoueursJSON($equipeID){
    $joueurs = $this->manager->selectJoueur($equipeID);
    return json_encode($joueurs);
  }
}
?>