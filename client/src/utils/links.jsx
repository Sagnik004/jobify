import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats, MdAdminPanelSettings } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  { text: 'Add job', path: '.', icon: <FaWpforms /> },
  { text: 'All jobs', path: 'all-jobs', icon: <MdQueryStats /> },
  { text: 'Stats', path: 'stats', icon: <IoBarChartSharp /> },
  { text: 'Profile', path: 'profile', icon: <ImProfile /> },
  { text: 'Admin', path: 'admin', icon: <MdAdminPanelSettings /> },
];

export default links;
