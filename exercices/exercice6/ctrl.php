<?php

  require('wrk.php');
  
  class EquipeController {
    private $equipeWorker;

    public function __construct(EquipeWorker $equipeWorker) {
        $this->equipeWorker = $equipeWorker;
    }

    public function getEquipes() {
        return $this->equipeWorker->getEquipesFromDB();
    }
}

?>