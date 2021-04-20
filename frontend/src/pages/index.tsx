/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { PageProps } from "gatsby";
import gql from "graphql-tag";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";

// queries fro graph ql

const GET_CLUBS = gql`
  query getclubs {
    kohaclub {
      _id
      name
      Amount
    }
  }
`;

const PAY_CLUB_BY_ID = gql`
  mutation PayToClubById($_id: ID!, $Amount: Number!) {
    payToClubById(_id: $_id, Amount: $Amount) {
      _id
      name
      Amount
    }
  }
`;

const PAY_CLUB_BY_ID_TEST = gql`
  mutation PayToClubByName($_id: ID!) {
    payToClubById10(_id: $_id) {
      name
      Amount
    }
  }
`;

const ADD_CLUB = gql`
  mutation addclub($name: String!) {
    addClub(name: $name) {
      _id
      name
      Amount
    }
  }
`;

const LIST_TRX_BY_ID = gql`
  query listTransactionByID($clubId: String!) {
    listTransactionByClubId(clubId: $clubId) {
      _id
      clubId
      amount
      date
    }
  }
`;

// material ui styling
const useStyles = makeStyles((theme) => ({
  flex: {
    display: `flex`,
  },
  clubContainer: {
    maxWidth: 600,
  },
  input: {
    width: 120,
    margin: 10,
    padding: 1,
  },
  transactionContainer: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    height: "100%",
  },
  cellItem: {
    display: "flex",
    alignItems: "center",
  },
  inputRoot: {
    padding: 5,
  },
}));

export function dateFormat(timestamp) {
  const date = new Date(timestamp);
  const stringDate = date.toString();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${stringDate.substring(
    0,
    3
  )} ${date.getDate()} ${stringDate.substring(
    4,
    7
  )} ${date.getFullYear()} ${time}`;
}

const Home: React.FC<PageProps> = () => {
  const classes = useStyles();
  const [activeClub, setActiveClub] = useState(``);
  const [activeClubName, setactiveClubName] = useState(``);
  const [newClub, setNewClub] = useState(``);
  const [PaymentInput, setPaymentInput] = useState(``);
  // fetch all clubs data
  const { loading, error, data: clubData } = useQuery(GET_CLUBS);

  const [addclub] = useMutation(ADD_CLUB, {
    // refetch cache after add club
    refetchQueries: [{ query: GET_CLUBS }],
  });

  const [PayToClub] = useMutation(PAY_CLUB_BY_ID_TEST, {
    // refetch cache after add club
    refetchQueries: [
      { query: GET_CLUBS },
      { query: LIST_TRX_BY_ID, variables: { clubId: activeClub } },
    ],
  });

  const [getTransactions, { data: TrnxData }] = useLazyQuery(LIST_TRX_BY_ID);

  const handleNewClubChange = (event) => {
    setNewClub(event.target.value);
  };

  const handleNewClubClick = () => {
    if (newClub !== ``) {
      addclub({ variables: { name: newClub } });
      setNewClub(``);
    }
  };

  const handlePayClubChange = (clubID) => (event) => {
    console.log(PaymentInput);
    setPaymentInput({ ...PaymentInput, [clubID]: event.target.value });
  };

  const handlePayClubClick = (id) => (event) => {
    event.preventDefault();
    console.log(typeof id);
    console.log(typeof PaymentInput[id]);
    console.log("Button Click");
    PayToClub({ variables: { _id: id } });
  };

  useEffect(() => {
    getTransactions({ variables: { clubId: activeClub } });
  }, [activeClub, clubData]);

  const handleClubClick = (id) => (event) => {
    console.log("club clicked");
    setActiveClub(id);
    const club = clubData.kohaclub.find((club) => club._id === id);
    setactiveClubName(club.name);
  };

  // const columns = [
  //   { field: "_id", headerName: "ID", width: 130 },
  //   { field: "amount", headerName: "Amount", width: 130 },
  //   { field: "date", headerName: "date", width: 130 },
  // ];

  return (
    <main>
      <div className={classes.flex}>
        <div className={classes.clubContainer}>
          <Typography variant="h4">Koha</Typography>
          <Typography>Currently Owned</Typography>
          <Grid container>
            <Grid item xs={3}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Amount</Typography>
            </Grid>
          </Grid>
          <Grid container>
            {clubData?.kohaclub?.map(({ name, Amount, _id: id }) => (
              <>
                <Grid
                  item
                  xs={3}
                  key={id}
                  onClick={handleClubClick(id)}
                  className={classes.cellItem}
                >
                  {name}
                </Grid>
                <Grid item xs={3} className={classes.cellItem}>
                  {Amount}
                </Grid>
                <Grid item xs={3} className={classes.cellItem}>
                  <TextField
                    className={classes.input}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      inputProps: { min: 0, max: Amount, step: 1 },
                      classes: { input: classes.inputRoot },
                    }}
                    onChange={handlePayClubChange(id)}
                    defaultValue={0}
                  />
                </Grid>
                <Grid item xs={3} className={classes.cellItem}>
                  <Button
                    id={id}
                    style={{ margin: `2px` }}
                    variant="outlined"
                    size="small"
                    onClick={handlePayClubClick(id)}
                  >
                    Mark Paid
                  </Button>
                </Grid>
              </>
            ))}
          </Grid>
          <div className={classes.flex}>
            <Typography>Add an Option</Typography>
            <TextField
              onChange={handleNewClubChange}
              value={newClub}
              variant="outlined"
              placeholder="Club Name"
            >
              Club Name
            </TextField>
            <Button variant="contained" onClick={handleNewClubClick}>
              Add Koha Group
            </Button>
          </div>
        </div>

        <div className={classes.transactionContainer}>
          <div>Transaction for Club </div>{" "}
          <Typography variant="h4">{activeClubName}</Typography>
          {activeClub !== `` ? (
            <>
              <Grid container>
                <Grid item xs={4}>
                  <Typography align="right">Amount</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography align="center">Date</Typography>
                </Grid>
              </Grid>
              <Grid container>
                {/* {TrnxData && TrnxData.listTransactionByClubId ? (
                  <DataGrid
                    columns={columns}
                    rows={TrnxData.listTransactionByClubId}
                  ></DataGrid>
                ) : (
                  ""
                )} */}
                {TrnxData?.listTransactionByClubId?.map(({ amount, date }) => (
                  <>
                    <Grid item xs={6}>
                      <div>{amount}</div>
                    </Grid>
                    <Grid item xs={6}>
                      <div>{dateFormat(date)}</div>
                    </Grid>
                  </>
                ))}
              </Grid>
            </>
          ) : (
            <div>Click on club name on the left to view transactions</div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
