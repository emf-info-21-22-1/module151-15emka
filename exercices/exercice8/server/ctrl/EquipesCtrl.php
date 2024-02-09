<?php
require_once('../dbManager/EquipesDBManager.php');
class EquipeCtrl{
  
  private $manager;  
  public function __construct(){
    $this->manager = new EquipesDBManager();
  } 
  public function getEquipesJSON(){
    $equipes = $this->manager->selectEquipe();
    return json_encode($equipes);
  }
}
?>