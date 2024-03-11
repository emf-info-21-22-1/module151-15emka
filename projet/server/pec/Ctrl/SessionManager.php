<?php

/**
 * The SessionManager class, its use is to manage session
 */
class SessionManager
{
    private static $instance;

    /**
     * Create a new instance of SessionManager, it creates a new session if it already doesn't exist
     */
    public function __construct()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function getInstance(): SessionManager
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Return the value of an existing key stored in the session, otherwise null
     * @param string $key The searched key's value
     */
    public function get($key)
    {
        if (array_key_exists($key, $_SESSION)) {
            return $_SESSION[$key];
        }
        return null;
    }
    /**
     * Set a new/modify pair of key-value in the session
     * @param string $key The key to set/modify
     * @param mixed $value The value assigned to the key
     */
    public function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }
    /**
     * Remove a pair of key-value in the session
     * @param string $key The key to unset
     */
    public function remove($key)
    {
        if (array_key_exists($key, $_SESSION)) {
            unset($_SESSION[$key]);
        }
    }
    /**
     * Remove all the session keys
     */
    public function clear()
    {
        session_unset();
    }
    /**
     * Check if a key exists, true if it does
     * @param string $key The key to check
     */
    public function has($key)
    {
        return array_key_exists($key, $_SESSION);
    }

    public function destroy(){
        if (session_status() === PHP_SESSION_NONE) {
            return false;
        } else {
            // Détruire toutes les données de session
            $_SESSION = array();

            // Supprimer le cookie de session s'il existe
            if (ini_get("session.use_cookies")) {
                $params = session_get_cookie_params();
                setcookie(session_name(), '', time() - 42000,
                    $params["path"], $params["domain"],
                    $params["secure"], $params["httponly"]
                );
            }

            // Détruire la session
            session_destroy();
            return true;
        }
    }
}
?>