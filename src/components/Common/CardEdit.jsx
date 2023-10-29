import React from 'react';
import { useAuth } from '../../contexts/AuthContexts';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

const CardEdit = ({ general, switcher, children }) => {
  const { users, setUsers } = useAuth();
  return (
    <>
      <section className="ab-card ab-island">
        <div role="button" className="ab-island__heading">
          <div className="ab-island__title-wrap">
            <h3 className="ab_headline ab-island__title">{general}</h3>
          </div>
          {/* <div className="ab-island__description">
            <div className="ab-description">Повелитель</div>
          </div> */}
          <div className="ab-island__arrow-wrap">
            <div className="whitespace-no-wrap leading-none relative inline-block rounded-lg text-xs">
              {switcher && (
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              )}
            </div>
          </div>
        </div>
        <div className="ab-island__content-wrap">
          <div className="ab-island__content">
            <div className="grid grid-cols-1 gap-4 items-start">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CardEdit;
