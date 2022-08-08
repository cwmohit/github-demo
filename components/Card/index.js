import React from "react";
function Card({ name, description, language, stars, forks, url }) {
  return (
    <div className="card_container">
      <h4>{name}</h4>
      <p>{description}</p>
      <ul className="tech-list-tags">
        {language
          ? [language].map((item, index) => {
              return (
                <li key={index} className={"tag-" + index}>
                  {item}
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}

export default Card;
