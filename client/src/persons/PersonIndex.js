import React, { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../common/api";
import PersonTable from "./PersonTable";
import PersonFilter from "./PersonFilter";


const PersonIndex = () => {
  const [directorsState, setDirectors] = useState([]);
  const [actorsState, setActors] = useState([]);
  const [directorLimitState, setDirectorLimit] = useState("");
  const [actorLimitState, setActorLimit] = useState("");

  const moreActors = Boolean(actorsState.length > directorsState.length);

  const deleteDirector = async (id) => {
    try {
      await apiDelete("/api/people/" + id);
      setDirectors(directorsState.filter((item) => item._id !== id));
    } catch (error) {
      alert("Nelze smazat osobu, která je přiřazena k alespoň jednomu filmu!");
    }
  };

  const deleteActor = async (id) => {
    try {
      await apiDelete("/api/people/" + id);
      setActors(actorsState.filter((item) => item._id !== id));
    } catch (error) {
      alert("Nelze smazat osobu, která je přiřazena k alespoň jednomu filmu!");
    }
  };

  useEffect(() => {
    apiGet("/api/directors").then((data) => setDirectors(data));
    apiGet("/api/actors").then((data) => setActors(data));
  }, []);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "actorLimit") setActorLimit(value);
    else if (name === "directorLimit") setDirectorLimit(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const directorLimit = parseInt(directorLimitState);
    const actorLimit = parseInt(actorLimitState);

    if (directorLimit) {
      const params = {
        limit: directorLimitState,
      };

      await apiGet("/api/directors", params).then((data) => setDirectors(data));
    }

    if (actorLimit) {
      const params = {
        limit: actorLimitState,
      };
      await apiGet("/api/actors", params).then((data) => setActors(data));
    }
  };

  return (
    <div>
      <h3>Seznam osobností</h3>
      <hr />

      <div className="row">
        <div className="col">
          <PersonFilter
            name={"actorLimit"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            value={actorLimitState}
            label="Limit počtu herců"
            confirm="Filtrovat herce"
          />
        </div>
        <div className="col">
          <PersonFilter
            name={"directorLimit"}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            value={directorLimitState}
            label="Limit počtu režisérů"
            confirm="Filtrovat režiséry"
          />
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col">
          <PersonTable
            deletePerson={deleteActor}
            link={!moreActors}
            items={actorsState}
            label="Počet herců:"
          />
        </div>
        <div className="col">
          <PersonTable
            deletePerson={deleteDirector}
            link={moreActors}
            items={directorsState}
            label="Počet režisérů:"
          />
        </div>
      </div>
    </div>
  );
};
export default PersonIndex;
