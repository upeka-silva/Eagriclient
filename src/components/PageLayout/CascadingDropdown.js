import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dropdownContainer: {
    marginTop: theme.spacing(2), // Adjust the margin value as needed
  },
}));

const CascadingDropdown = ({ data }) => {
  const classes = useStyles();

  return (
      <div className={classes.dropdownContainer}>
        <select id="dropdown">
          {Object.keys(data).map(key => (
              <option key={key} value={data[key].displayName}>
                {data[key].displayName}
              </option>
          ))}
        </select>
      </div>
  );
};

export default CascadingDropdown;
