// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import forms from './forms';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, forms(), pages, utilities, support]
};

export default menuItems;
