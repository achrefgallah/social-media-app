import React, { useContext } from "react";
import Log from "../component/log";
import  UidContext  from "../component/AppContext";
import UpdateProfil from "../component/Profil/UpdateProfil"

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil/>
      ) : (
        <div className="log-container">
          <Log signin={false} singup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
