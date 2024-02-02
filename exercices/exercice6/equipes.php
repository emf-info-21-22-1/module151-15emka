<!doctype html>
  <header>
    <link rel="stylesheet" type="text/css" href="stylesheets/main.css" />
</header>
  <body>
    <div id="conteneur">
      <h1>Les équipes de National League</h1>    
      <table border= "1">
      <tr>
        <td>ID</td>
        <td>Club</td>
      </tr>
      <?php
        require('ctrl.php');
        $equipeController = new EquipeController(new EquipeWorker());
          $equipes = $equipeController->getEquipes();
          foreach ($equipes as $equipe) {
            echo "<tr><td>{$equipe->id}</td><td>{$equipe->club}</td></tr>";
          }
      ?>
      </table>
    </div>
  </body>
</html>