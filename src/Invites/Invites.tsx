import React, {FC, useState, useCallback, useEffect, FormEventHandler} from "react";

import "./style.css";

interface Props {
  invites: string[];
  onAdd: (name: string) => void;
}

export const Invites: FC<Props> = ({ invites, onAdd }) => {
  const [name, setName] = useState("");

  const handleChangeName = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const handleSubmit = useCallback<React.ChangeEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault();
    onAdd(name);
  }, [name, onAdd]);

  useEffect(() => {
    setName("");
  }, [invites.length]);

  return (
    <div className="invites">
      <form className="invites--form" onSubmit={handleSubmit}>
        <input
          className="invites--form-input"
          onChange={handleChangeName}
          type="text"
          value={name}
        />
        <button className="invites--form-submit">
          Invite
        </button>
      </form>

      <div className="invites--delimiter" />

      <ul className="invites--items">
        {invites.map((name, index) => (
          <li key={`${name}-${index}`} className="invites--item">{name}</li>
        ))}
      </ul>
    </div>
  );
};
