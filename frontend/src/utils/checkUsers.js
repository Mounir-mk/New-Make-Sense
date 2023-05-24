function checkUsers(username, concerned, args) {
  const {
    myUsers,
    createDecision,
    setCreateDecision,
    usersConcerned,
    setUsersConcerned,
    inputImpacted,
    setInputImpacted,
    inputExpert,
    setInputExpert,
    setMessage,
  } = args;
  const [firstname, lastname] = username.split(" ");
  const userFound = myUsers.find(
    (user) => user.firstname === firstname && user.lastname === lastname
  );

  if (!username.length) {
    setMessage(`Veuillez choisir une personne dans la liste !`);
    return;
  }

  if (!userFound) {
    setMessage(`${username} n'existe pas !`);
    return;
  }

  if (concerned === "impacted") {
    if (createDecision.impacted.includes(username)) {
      setMessage(`${username} est déjà dans les impactés`);
    } else {
      setCreateDecision({
        ...createDecision,
        impacted: [...createDecision.impacted, inputImpacted],
      });

      setUsersConcerned([
        ...usersConcerned,
        {
          user_status: "impacted",
          user_id: userFound.id,
          decision_id: 1,
        },
      ]);

      setInputImpacted("");
      setMessage("");
    }
  } else if (concerned === "expert") {
    if (createDecision.experts.includes(username)) {
      setMessage(`${username} est déjà dans les experts`);
    } else {
      setCreateDecision({
        ...createDecision,
        experts: [...createDecision.experts, inputExpert],
      });

      setUsersConcerned([
        ...usersConcerned,
        {
          user_status: "experts",
          user_id: userFound.id,
          decision_id: 1,
        },
      ]);

      setInputExpert("");
      setMessage("");
    }
  }
}

export default checkUsers;
