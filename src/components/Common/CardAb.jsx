import React from 'react';

import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons';

const CardAb = ({ tag, options, avatar, arrow, title, description, to, danger }) => {
  return (
    <Link to={to}>
      <section className="ab-card ab-island">
        <div role="button" className="ab-island__heading">
          {title && (
            <div className="ab-island__title-wrap">
              <h2
                className="ab-sub-headline ab-island__title"
                style={danger ? { color: '#e9555b' } : {}}>
                {title}
              </h2>
            </div>
          )}
          {description && (
            <div className="ab-island__description">
              <div className="ab-description">{description}</div>
            </div>
          )}
          {options && (
            <div className="ab-island__options">
              {avatar && <div className="flex items-center"></div>}
              <h3 className="ab-headline my-0 ml-4">{options}</h3>
            </div>
          )}

          <div className="ab-island__arrow-wrap">
            {arrow && (
              <CaretRightOutlined className="ab-icon ab-island__arrow ab-icon--size-text" />
            )}
            {tag && (
              <div className="whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs">
                <Tag color="success">{tag}</Tag>
              </div>
            )}
          </div>
        </div>
      </section>
    </Link>
  );
};

export default CardAb;
