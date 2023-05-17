
import { Link } from "react-router-dom";

function Setup(props) {



  return (<>
    <h1>SETTINGS</h1>
    <div className="settings-panel">
      <div className="personal">
        {props.row.first_name}
      </div>
      <div className="details">
        <h2>Details</h2>
        <Link to="/">Save Changes</Link>
      </div>
      <div className="permissions">
        <h2>Permissions</h2>
      </div>
    </div>
  </>
  );
}

export default Setup;
