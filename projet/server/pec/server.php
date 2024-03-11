<?php

const PATH = __DIR__;

include_once(PATH . "/Ctrl/UserCtrl.php");
include_once(PATH . "/Ctrl/TaskCtrl.php");
include_once(PATH . "/Ctrl/ProjectCtrl.php");
include_once(PATH . "/Ctrl/PostCtrl.php");

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: ContentType");
header("Access-Control-Allow-Credentials: true");

$projectCtrl = new ProjectCtrl();
$taskCtrl = new TaskCtrl();
$postCtrl = new PostCtrl();
$userCtrl = new UserCtrl();

if (isset($_SERVER['REQUEST_METHOD'])) {
    // Récupérer le contenu de la requête POST
    $json_data = file_get_contents('php://input');

    // Décoder les données JSON
    $data = json_decode($json_data, true);

    switch ($_SERVER['REQUEST_METHOD']) {

        case 'GET':
            if (isset($_GET['action'])) {
                switch ($_GET['action']) {
                    case 'getListProjects':
                        $result = $projectCtrl->getListProjects();
                        $jsonData = json_encode($result);
                        header('Content-Type: application/json');
                        echo $jsonData;
                        break;
                    case 'getListTasks':
                        if (isset($_GET['fkProject'])) {
                            $fk = $_GET['fkProject'];

                            $result = $taskCtrl->getListTasks($fk);

                            $jsonData = json_encode($result);
                            header('Content-Type: application/json');
                            echo $jsonData;
                        } else {
                            echo 'Certains champs sont manquants dans les données JSON !';
                        }
                        break;
                    case 'getListPosts':
                        $result = $postCtrl->getListPosts();

                        $jsonData = json_encode($result);
                        header('Content-Type: application/json');
                        echo $jsonData;
                        break;
                    case 'getListUsers':

                        $result = $userCtrl->getListUsers();

                        $jsonData = json_encode($result);
                        header('Content-Type: application/json');
                        echo $jsonData;
                        break;
                    case 'getProject':
                        if (isset($_GET['pkProject'])){
                            $pk = $_GET['pkProject'];


                            $result = $projectCtrl->getProject($pk);

                            $jsonData = json_encode($result);
                            header('Content-Type: application/json');
                            echo $jsonData;
                        } else {
                            echo 'Certains champs sont manquants dans les données JSON !';
                        }
                        break;
                    case 'getUser':
                        if (isset($data['pk'])){
                            $pk = $data['pk'];


                            $result = $userCtrl->getUser($pk);
                            echo $result;
                        } else {
                            echo 'Certains champs sont manquants dans les données JSON !';
                        }
                        break;
                }
            } else {
                // Action non spécifiée, renvoyer une erreur
                http_response_code(400); // Bad Request
                echo json_encode(array("message" => "Action non spécifiée."));
            }
            break;

        case 'POST':

            if ($data !== null) {
                switch($data['action']){
                    case 'signUp':
                        // Vérifier que les champs nécessaires sont présents dans les données JSON
                        if (isset($data['username'], $data['password'], $data['email'])) {
                            $username = $data["username"];
                            $password = $data["password"];
                            $email = $data["email"];


                            $result = $userCtrl->signUp($username, $password, $email);

                            echo $result;
                        } else {
                            echo 'Certains champs sont manquants dans les données JSON !';
                        }
                        break;
                    case 'signIn':
                        // Vérifier que les champs nécessaires sont présents dans les données JSON
                        if (isset($data['email'], $data['password'])) {
                            $email = $data["email"];
                            $password = $data["password"];


                            $result = $userCtrl->signIn($email, $password);

                            echo $result;
                        } else {
                            echo 'Certains champs sont manquants dans les données JSON !';
                        }
                        break;
                    case 'logout':
                        $result = $userCtrl->logout();
                        echo $result;
                        break;
                    case 'newTask':
                        if (isset($data['title'], $data['fk_project'])){
                            $title = $data['title'];
                            $fk_project = $data['fk_project'];

                            $result = $taskCtrl->newTask(1, $title, $fk_project);

                            echo $result;
                        } else {
                            echo 'Certains champs sont manquants dans les données JSON !';
                        }
                        break;
                    case 'newProject':
                        if (isset($data['title'], $data['description'])){
                            $title = $data['title'];
                            $description = $data['description'];

                            $result = $projectCtrl->newProject($title, $description);

                            echo $result;
                        } else {
                            echo 'Certains champs sont manquants dans les données JSON !';
                        }
                        break;
                    case 'newPost':
                        if (isset($data['comments'], $data['datePub'])){
                            $comments = $data['comments'];
                            $datePub = $data['datePub'];


                            $result = $postCtrl->newPost($comments, $datePub);

                            echo $result;
                        } else {
                            echo 'Certains champs sont manquants dans les données JSON !';
                        }
                        break;
                }

            } else {
                echo 'Erreur lors de la lecture des données JSON !';
            }
            break;

        case 'PUT':
            echo "<h1>Ceci est un PUT</h1>";
            break;

        case 'DELETE':
            echo "<h1>Ceci est un DELETE</h1>";
            break;
        case 'OPTIONS':
            break;
    }
}
