/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from "react";
import { PageProps } from "gatsby";
import gql from "graphql-tag";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import { DataGrid } from "@material-ui/data-grid";
import CloseIcon from "@material-ui/icons/Close";

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
  mutation PayToClub($_id: ID!, $amount: Int!) {
    payToClubById(_id: $_id, Amount: $amount) {
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

const DEL_TRNX = gql`
  mutation deleteTrnx($_id: ID!) {
    deleteTrnx(_id: $_id) {
      _id
    }
  }
`;

const DEL_CLUB = gql`
  mutation deleteClub($_id: ID!) {
    deleteClub(_id: $_id) {
      _id
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
  page: { padding: 100, display: `flex` },
  clubContainer: {
    backgroundColor: "#ffe8e8",
    padding: 20,
    maxWidth: 600,
    marginRight: 30,
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
  clubName: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  inputRoot: {
    padding: 5,
  },
  transactionHeader: {
    display: "flex",
    width: 500,
    height: 50,
    padding: 10,
    marginBottom: 30,
    backgroundColor: "#ffe8e8",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#d44000",
  },
  transactions: {
    backgroundColor: "#ffe8e8",
    padding: 10,
    width: 500,
    height: 800,
    overflowY: "auto",
  },
  title: {
    color: "#d44000",
  },
  addGroup: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    "&>*": {
      marginLeft: 15,
    },
  },
  button: {
    color: "#d44000",
  },
  clubData: {
    overflowY: "auto",
  },
  transactionDetails: {
    "&>*": {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  closeButton: {
    cursor: "pointer",
    color: "#bbbbbb",
    "&>:hover": {
      color: "black",
    },
  },
}));

export function dateFormat(timestamp) {
  const date: Date = new Date(timestamp);
  const stringDate: string = date.toString();
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

  const [delTrnx] = useMutation(DEL_TRNX, {
    // refetch cache after add club
    refetchQueries: [
      { query: LIST_TRX_BY_ID, variables: { clubId: activeClub } },
    ],
  });

  const [delClub] = useMutation(DEL_CLUB, {
    // refetch cache after add club
    refetchQueries: [{ query: GET_CLUBS }],
  });

  const [PayToClub] = useMutation(PAY_CLUB_BY_ID, {
    // refetch cache after add club
    refetchQueries: [
      { query: GET_CLUBS },
      { query: LIST_TRX_BY_ID, variables: { clubId: activeClub } },
    ],
    awaitRefetchQueries: true,
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
    console.log(event.target.value);
    setPaymentInput({ ...PaymentInput, [clubID]: event.target.value });
  };

  const handlePayClubClick = (id) => (event) => {
    event.preventDefault();
    const clubID: string = id;
    const amountPay: number = parseInt(PaymentInput[id]);
    console.log("club type: ", typeof clubID, clubID);
    console.log("amount type ", typeof amountPay, amountPay);
    console.log("Button Click");
    if (clubID && amountPay) {
      PayToClub({ variables: { _id: clubID, amount: amountPay } });
    } else {
      alert("Amount cannot be 0");
    }
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

  const handleDeleteTransaction = (id) => (event) => {
    delTrnx({ variables: { _id: id } });
  };

  const handleDeleteClub = (id) => (event) => {
    delClub({ variables: { _id: id } });
  };

  // const columns = [
  //   { field: "_id", headerName: "ID", width: 130 },
  //   { field: "amount", headerName: "Amount", width: 130 },
  //   { field: "date", headerName: "date", width: 130 },
  // ];

  return (
    <main>
      <div className={classes.page}>
        <Paper elevation={10} className={classes.clubContainer}>
          <Typography className={classes.title} variant="h3">
            Koha
          </Typography>
          <Typography>Currently Owned</Typography>
          <Grid container>
            <Grid item xs={3}>
              <Typography>Name</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Amount</Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.clubData}>
            {clubData?.kohaclub?.map(({ name, Amount, _id: id }) => (
              <>
                <Grid
                  item
                  xs={3}
                  key={id}
                  onClick={handleClubClick(id)}
                  className={classes.clubName}
                >
                  {name}
                </Grid>
                <Grid item xs={2} className={classes.cellItem}>
                  {Amount}
                </Grid>
                <Grid item xs={3} className={classes.cellItem}>
                  <TextField
                    className={classes.input}
                    type="number"
                    variant="outlined"
                    InputProps={{
                      inputProps: { step: 10 },
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
                    className={classes.button}
                  >
                    Mark Paid
                  </Button>
                </Grid>
                <Grid item xs={1} className={classes.cellItem}>
                  <CloseIcon
                    fontSize="small"
                    onClick={handleDeleteClub(id)}
                    className={classes.closeButton}
                  />
                </Grid>
              </>
            ))}
          </Grid>
          <div className={classes.addGroup}>
            <Typography>Add an Option</Typography>
            <TextField
              onChange={handleNewClubChange}
              value={newClub}
              variant="outlined"
              placeholder="Club Name"
              InputProps={{
                classes: { input: classes.inputRoot },
              }}
            >
              Club Name
            </TextField>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNewClubClick}
            >
              Add Koha Group
            </Button>
          </div>
        </Paper>

        <div className={classes.transactionContainer}>
          <Paper elevation={10} className={classes.transactionHeader}>
            <Typography variant="h5">Transaction for Club </Typography>
            <Typography variant="h4">{activeClubName}</Typography>
          </Paper>
          <Paper elevation={10} className={classes.transactions}>
            {activeClub !== `` ? (
              <>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography align="center">Date</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="center">Amount</Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.transactionDetails}>
                  {/* {TrnxData && TrnxData.listTransactionByClubId ? (
                  <DataGrid
                    columns={columns}
                    rows={TrnxData.listTransactionByClubId}
                  ></DataGrid>
                ) : (
                  ""
                )} */}
                  {TrnxData?.listTransactionByClubId?.map(
                    ({ _id, amount, date }) => (
                      <>
                        <Grid item xs={6}>
                          <div>{dateFormat(date)}</div>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography align="right">${amount}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <CloseIcon
                            fontSize="small"
                            onClick={handleDeleteTransaction(_id)}
                            className={classes.closeButton}
                          />
                        </Grid>
                      </>
                    )
                  )}
                </Grid>
              </>
            ) : (
              <div>Click on club name on the left to view transactions</div>
            )}
          </Paper>
        </div>
      </div>
    </main>
  );
};

export default Home;
