import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles(theme => ({
  checkedBox: {
    backgroundColor: "#aaa",
    color: "white",
    border: "1px solid orange",
    "flex-basis": "25%",
    margin: 5,
    "padding-top": 5,
    "padding-bottom": 5,
    textAlign: "center"
  },
  uncheckedBox: {
    border: "1px solid orange",
    "flex-basis": "25%",
    margin: 5,
    "padding-top": 5,
    "padding-bottom": 5,
    textAlign: "center"
  }
}));
function LotofacilItem(props) {
  const classes = useStyles();
  const groups = [0, 5, 10, 15, 20, 25];
  return groups.map(inicio => {
    return (
      <Box
        display="flex"
        alignItems="stretch"
        alignContent="stretch"
        width="100%"
        key={inicio}
      >
        {props.jogo.numeros.slice(inicio, inicio + 5).map((element, index) => {
          return (
            <Box
              key={index}
              className={element ? classes.checkedBox : classes.uncheckedBox}
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
