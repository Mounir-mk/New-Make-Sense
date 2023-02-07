import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../_services/AuthContext";
import Loader from "../Loader";

function StatsTab() {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [decisions, setDecisions] = useState([]);

  console.warn(decisions);

  useEffect(() => {
    axios
      .get("http://localhost:5000/decisions", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((response) => {
        setDecisions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <div />;
}

export default StatsTab;
