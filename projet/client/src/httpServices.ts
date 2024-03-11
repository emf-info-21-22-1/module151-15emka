const BASE_URL = 'http://localhost/pec/server.php';

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "ContentType": "application/json"
            },
            body: JSON.stringify({
                action: "signIn",
                password: password,
                email: email
            }),
            credentials: "include"
        });
        const data = await response.json();
        return !!data.loginOk;

    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "ContentType": "application/json"
            },
            body: JSON.stringify({
                action: "logout"
            }),
            credentials: "include"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la déconnexion : ", error);
        throw error;
    }
};

export const createAccount = async (username: string, email: string, password: string) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "ContentType": "application/json"
            },
            body: JSON.stringify({
                action: "signUp",
                username: username,
                password: password,
                email: email
            }),
            credentials: "include"
        });
        const data = await response.json();
        return !!data.accountOk;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
    }
};

export const createProject = async (title: string, description: string) => {
  try {
      const response = await fetch(BASE_URL, {
          method: "POST",
          headers: {
              "ContentType": "application/json"
          },
          body: JSON.stringify({
              action: "newProject",
              title: title,
              description: description
          }),
          credentials: "include"
      });
      const data = await response.json();
      return !!data.newProjectOk;
  }  catch (error) {
      console.error("Erreur lors de la création d'un projet : ", error);
      throw error;
  }
};

export const createTask = async (title: string, fk_project: string | undefined) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "ContentType": "application/json"
            },
            body: JSON.stringify({
                action: "newTask",
                title: title,
                fk_project: fk_project
            }),
            credentials: "include"
        });
        const data = await response.json();
        return !!data.newTaskOk;
    } catch (error) {
        console.error("Erreur lors de la création de la tâche : ", error);
        throw error;
    }
};

export const getListProjects = async () => {
    try {
        const response = await fetch(`${BASE_URL}?action=getListProjects`, {credentials: "include"});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des projets : ", error);
        throw error;
    }
};

export const getListTasks = async (fkProject: string | undefined) => {
    try {
        const response = await fetch(`${BASE_URL}?action=getListTasks&fkProject=${fkProject}`, {credentials: "include"});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupérations des tâches : ", error);
        throw error;
    }
};

export const getProject = async (pkProject: string | undefined) => {
  try {
      const response = await fetch(`${BASE_URL}?action=getProject&pkProject=${pkProject}`, {credentials: "include"});
      const data = await response.json();
      return data;
  }  catch (error) {
      console.error("Erreur lors de la récupération du projet : ", error);
      throw error;
  }
};
