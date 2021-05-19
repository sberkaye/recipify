// Takes ingredients and their measures in an array of objects and displays them
import React from 'react';
import {
  makeStyles,
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    fontFamily: 'Montserrat, sans-serif',
  },
}));

const HeaderTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}))(TableCell);

const IngredientsTable = (props) => {
  const classes = useStyles();
  const { rows } = props; // data that will amke up the rows
  return (
    <TableContainer component={Paper}>
      <Table
        className={classes.table}
        size="small"
        aria-label="ingredients table"
      >
        <TableHead>
          <TableRow>
            <HeaderTableCell>Ingredient</HeaderTableCell>
            <HeaderTableCell align="left">Measure</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.ingredient}>
              <TableCell component="th" scope="row">
                {row.ingredient}
              </TableCell>
              <TableCell align="left">{row.measure}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

IngredientsTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      ingredient: PropTypes.string,
      measure: PropTypes.string,
    }),
  ).isRequired,
};

export default IngredientsTable;
