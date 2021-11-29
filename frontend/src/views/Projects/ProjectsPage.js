import baseStyles from '../../components/Styling.module.css';
import {Link} from "react-router-dom";

const Projects = () => {
  return (
    <>
      <h1 className={baseStyles.header}>
        Your dashboard
      </h1>

      <div style={{ maxWidth: 1000, margin: "auto", padding: 20, paddingTop: 0 }}>
        <p style={{ fontSize: 19, marginBottom: 4, fontFamily: "Manrope" }}><b>History</b></p>
        <ul style={{ margin: 0 }}>
          <li><Link to="code/archive">Run on September 2, 2021 at 10:32 AM</Link></li>
          <li><a href="#">Run on August 12, 2021 at 11:59 PM</a></li>
          <li><a href="#">Run on August 12, 2021 at 11:50 PM</a></li>
          <li><a href="#">Run on August 12, 2021 at 10:23 PM</a></li>
          <li><a href="#">Run on August 11, 2021 at 6:42 AM</a></li>
        </ul>
        <p style={{ fontSize: 19, marginBottom: 4, fontFamily: "Manrope" }}><b>Your account</b></p>
        <p style={{ margin: 0}}><Link to="profile">Edit account settings</Link></p>
      </div>
    </>
  );
};

export default Projects;
