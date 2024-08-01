import React, { useEffect, useState } from "react";
import classes from "../Style/Cookie/Cookie.module.css";

export default function Cookie() {
  const [acceptedCookies, setAcceptedCookies] = useState(
    // localStorage.getItem("acceptedCookies") === "true"
    undefined
  );
  const [cookieStorage, setCookieStorage] = useState(
    localStorage.setItem("Cookies", undefined)
  );
  // console.log(acceptedCookies, "hello");
  // useEffect(() => {
  //   localStorage.setItem("acceptedCookies", acceptedCookies);
  // }, [acceptedCookies]);

  const acceptCookies = () => {
    setAcceptedCookies(true);
    setCookieStorage(localStorage.setItem("Cookies", true));
  };

  const rejectCookies = () => {
    setAcceptedCookies(false);
    setCookieStorage(localStorage.setItem("Cookies", false));
  };
  if (acceptedCookies === undefined) {
    return (
      <div className={classes.containerCookies}>
        <div className={classes.banierCookie}>
          <h1>Cookies et choix publicitaires</h1>
          <div className={classes.paragrapheCookie}>
            <p>
              Sur nos sites et nos applications, nous recueillons à chacune de
              vos visites des données vous concernant. Ces données nous
              permettent de vous proposer les offres et services les plus
              pertinents pour vous, et de vous adresser, en direct ou via des
              partenaires, des communications et publicités personnalisées et de
              mesurer leur efficacité. Elles nous permettent également d’adapter
              le contenu de nos sites à vos préférences, de vous faciliter le
              partage de contenu sur les réseaux sociaux et de réaliser des
              statistiques. Pour en savoir plus sur l'utilisation des cookies
            </p>
            <br />
            <p>Merci d’avance pour votre confiance.</p>
          </div>
          <div className={classes.boutonsCookies}>
            <button
              className={classes.accepterBoutonStyle}
              onClick={acceptCookies}
            >
              Accepter
            </button>
            <button
              className={classes.refuserBoutonStyle}
              onClick={rejectCookies}
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
