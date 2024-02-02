<?php
class EquipeWorker {
  public function getEquipesFromDB() {
      // Utilisation d'objets pour représenter les équipes avec des attributs (par exemple, ID et Club)
      $equipes = array(
          new Equipe(1, 'Gotteron'),
          new Equipe(2, 'SC Bern'),
          new Equipe(3, 'Fribourg-Gottéron'),
          new Equipe(4, 'HC Davos')
      );

      return $equipes;
  }
}

class Equipe {
  public $id;
  public $club;

  public function __construct($id, $club) {
      $this->id = $id;
      $this->club = $club;
  }
}
?>