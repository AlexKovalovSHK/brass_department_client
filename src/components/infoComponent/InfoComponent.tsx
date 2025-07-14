import { useEffect } from "react";
import { apiUrl } from "../../App";

const InfoComponent = () => {
  useEffect(() => {
    fetch(`${apiUrl}/api/v1/departments`, {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }, []);


  return <div>InfoComponent</div>;
};

export default InfoComponent;
