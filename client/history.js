//create browser history so history.push can be used to navigate to other routes
//need history package v 4.x - version 5 was not redirecting properly
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default history;
