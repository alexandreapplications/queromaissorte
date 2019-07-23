import React from "react";
import propTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LotofacilItem from "./LotofacilItem";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  Jogo: {
    margin: theme.spacing()
  },
  JogoItem: {
    margin: 5,
    padding: 5
  },
  IdentificadorJogo: {
    margin: 5,
    fontWeight: "bold"
  },
  HeaderData: {
    flexGrow: 1
  }
}));

function formataData(seconds) {
  var mData = moment(`/Date(${seconds}-0300)/`);
  return mData.format("DD/MM/YYYY");
}

function LotofacilList(props) {
  const classes = useStyles();
  if (props.jogos) {
    return (
      <Box
        display="flex"
        alignContent="space-between"
        width="100%"
        flexWrap="wrap"
      >
        {props.jogos.map(item => {
          return (
            <Paper key={item.id} elevation={2} className={classes.Jogo}>
              <Box className={classes.JogoItem}>
                <Box className={classes.IdentificadorJogo} display="flex">
                  <div className={classes.HeaderData}>
                    <button
                      onClick={() => {
                        props.selectJogo(item);
                      }}
                    >
                      {item.id}
                    </button>
                  </div>
                  <div>{formataData(item.data._seconds)}</div>
                </Box>
                <LotofacilItem jogo={item} key={item.id} />
              </Box>
            </Paper>
          );
        })}
      </Box>
    );
  } else {
    return <p>Loading data</p>;
  }
}

LotofacilList.propTypes = {
  selectJogo: propTypes.func.isRequired
};

export default LotofacilList;
