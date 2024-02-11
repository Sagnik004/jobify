import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import links from '../utils/links';
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks = (props) => {
  const { isBigSidebar } = props;
  const { user, toggleSidebar } = useDashboardContext();

  return (
    <div className='nav-links'>
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === 'admin' && role !== 'admin') {
          return;
        }
        return (
          <NavLink
            to={path}
            key={text}
            end
            className='nav-link'
            onClick={isBigSidebar ? null : toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

NavLinks.propTypes = {
  isBigSidebar: PropTypes.bool,
};

export default NavLinks;
