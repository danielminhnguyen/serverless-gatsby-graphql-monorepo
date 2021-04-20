/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { PageProps } from 'gatsby';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

const PAY_CLUB = gql`
  mutation payclub($id: String!, $Amount: Int!) {
    payToClub(_id: $id, Amount: $Amount) {
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

// material ui styling
const useStyles = makeStyles((theme) => ({
  flex: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
  },
  formContainer: {
    width: 800,
  },
  input: {
    width: 120,
    margin: 10,
  },
}));

const Home: React.FC<PageProps> = () => {
  const classes = useStyles();

  const [payclub, { data1 }] = useMutation(PAY_CLUB);
  const [addclub, { data2 }] = useMutation(ADD_CLUB, {
    // refetch cache after add club
    refetchQueries: [{ query: GET_CLUBS }],
  });

  const { loading, error, data: clubData } = useQuery(GET_CLUBS);

  const [newClub, setNewClub] = useState(``);

  const handleNewClubChange = (event) => {
    setNewClub(event.target.value);
  };

  const handleNewClubClick = () => {
    if (newClub !== ``) {
      addclub({ variables: { name: newClub } });
      setNewClub(``);
    }
  };

  return (
    <main>
      <div className={classes.formContainer}>
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
          {clubData?.kohaclub?.map((club, index) => (
            <>
              <Grid item xs={3} key={club._id}>
                {club.name}
              </Grid>
              <Grid item xs={3}>
                {club.Amount}
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id={club._id}
                  className={classes.input}
                  type="number"
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 0, max: club.Amount, step: 1 },
                  }}
                  defaultValue={0}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  id={club._id}
                  style={{ margin: `2px` }}
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    payclub({
                      variables: {
                        _id: `6079b28c74df0d3a779044f2`,
                        Amount: 1,
                      },
                    })
                  }
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
    </main>
  );
};

export default Home;
