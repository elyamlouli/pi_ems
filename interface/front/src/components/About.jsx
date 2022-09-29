const { Link } = require("react-router-dom");
  
const About = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>About Page</h1>
      <p>Projet en collaboration avec l'Eurométropole de Strasbourg</p>
    </div>
  );
};
  
export default About;