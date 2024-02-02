<?php
require_once('config.php');

class Connexion {

    private static $_instance = null;
    private $pdo;

    public static function getInstance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new Connexion();
        }
        return self::$_instance;
    }

    private function __construct() {
        try {
            $this->pdo = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS, array(
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
                PDO::ATTR_PERSISTENT => true));
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function __destruct() {
        $this->pdo = null;
    }

    public function SelectQuery($query, $params) {
        try {
            $queryPrepared = $this->pdo->prepare($query);
            $queryPrepared->execute($params);
            return $queryPrepared->fetchAll();
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function SelectSingleQuery($query, $params) {
        try {
            $queryPrepared = $this->pdo->prepare($query);
            $queryPrepared->execute($params);
            return $queryPrepared->fetch();
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function ExecuteQuery($query, $params) {
        try {
            $queryPrepared = $this->pdo->prepare($query);
            $queryPrepared->execute($params);
            return $queryPrepared->rowCount();
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function getLastId($table) {
        try {
            $lastId = $this->pdo->lastInsertId($table);
            return $lastId;
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    function startTransaction() {
        return $this->pdo->beginTransaction();
    }

    public function addQueryToTransaction($query, $params) {
        $res = false;
        if ($this->pdo->inTransaction()) {
            $maQuery = $this->pdo->prepare($query);
            $res = $maQuery->execute($params);
        }
        return $res;
    }

    public function commitTransaction() {
        $res = false;
        if ($this->pdo->inTransaction()) {
            $res = $this->pdo->commit();
        }
        return $res;
    }

    public function rollbackTransaction() {
        $res = false;
        if ($this->pdo->inTransaction()) {
            $res = $this->pdo->rollBack();
        }
        return $res;
    }

}
?>