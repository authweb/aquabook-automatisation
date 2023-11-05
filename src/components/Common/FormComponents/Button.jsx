import React from 'react';
import { Link } from 'react-router-dom';

export default function Button(buttons, to) {
  return (
    <>
      <Link to={to} className="ab-button ab-button_md color-default theme-ghost">
        <span className="ab-button__content">
          <span className="ab-button__text">{buttons}</span>
        </span>
      </Link>
    </>
  );
}
