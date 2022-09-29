const { Link } = require("react-router-dom");
  
const Home = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      <h1>Home Page</h1>
      <br />
      <ul>
        <li>
            {/* Endpoint to route to Applications List component */}
            <Link to="/listapplications">Applications List</Link>
        </li>
        <li>
          {/* Endpoint to route to About component */}
          <Link to="/about">About</Link>
        </li>
        <li>
          {/* Endpoint to route to Contact Us component */}
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};
  
export default Home;



// login (POST) => localhost:5000/api/sessions
// reçoit 2 tokens:
/* machin.body. ...
    accessToken et refreshTocken
        (Trouver où les stocker)

    lorsque requête, inclure dans le header
        le champ "Authorization : Bearer accessToken"
    
regarder Axios (react refresh token)

localhost:5000/api/refresh ? (POST)
    la réponse est soit OK, soit erreur 403
    => envoyer le champ "x-refresh : {refreshToken}"

        => dans le header de la réponse se trouve alors "x-access-token",
    le nouveau accessToken à remplacer

    Séparer les actions de refresh et d'access
    si de nouveau erreur 403 : renvoyer vers login

Pour avoir la liste des applications : faire un (GET)
    sur localhost:5000/api/applications
    totalCount
    result [ { 
        id:
        name:
        description:
    } , ... ]    (liste d'objets)

Pour créer un utilisateur du serveur : faire un (POST)
    sur localhost:5000/api/users
    avec un body 
    {
        email:
        password:
        passwordConfirmation:
        name:
    }

Pour ajouter un device : faire un (POST)
    sur localhost:5000/api/devices ?
*/