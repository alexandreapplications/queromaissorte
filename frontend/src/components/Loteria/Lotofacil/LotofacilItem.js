import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles(theme => ({
  checkedBox: {
    border: "1px solid orange",
    flexBasis: 30,
    margin: 3,
    padding: 3,
    textAlign: "center",
    fontSize: "0.8em"
  }
}));
function LotofacilItem(props) {
  const classes = useStyles();
  const groups = [0, 5, 10, 15, 20, 25];
  return groups.map(inicio => {
    return (
      <Box
        display="flex"
        alignContent="space-between"
        width="100%"
        key={inicio}
      >
        {props.jogo.numeros.slice(inicio, inicio + 5).map((element, index) => {
          return (
            <Box
              key={index}
              className={classes.checkedBox}
              bgcolor={element ? "primary.main" : "disabled.main"}
              color={element ? "primary.contrastText" : "disabled.contrastText"}
              borderRadius={4}
            >
              {index + inicio + 1}
            </Box>
          );
        })}
      </Box>
    );
  });
}
export default LotofacilItem;
