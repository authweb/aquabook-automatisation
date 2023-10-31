import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = ({ breadcrumbNameMap }) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [<Breadcrumb.Item key="dashboard"></Breadcrumb.Item>].concat(
    extraBreadcrumbItems,
  );

  return (
    <Breadcrumb className="eb-calendar__header eb-calendar__shadows" style={{ margin: '16px 0' }}>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
