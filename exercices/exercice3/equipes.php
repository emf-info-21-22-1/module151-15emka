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
        $equipes = getEquipes();
        $i = 1;
        foreach ($equipes as $equipes){
          echo "<tr><td>$i</td><td>$equipes</td></tr>";
          $i++;
        }
      ?>
      </table>
    </div>
  </body>
</html>