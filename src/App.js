import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, Typography } from '@material-ui/core';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(8);
  // const [loading, setLoading] = useState(false);

  // const loadMore = () => {
  //   setLoading(true);
  //   setPage(page + 1);
  // };

  const getDataFromAPI = async () => {
    // setLoading(true);
    const response =
      await fetch(`https://randomuser.me/api/?results=${page}`)
    const json = await response?.json();
    const data = json?.results;
    console.log(data)
    setItems([...items, ...data]);
    // setLoading(false);

  }

  useEffect(() => {
    getDataFromAPI();
  }, [page]);

  return (
    <>
      <h2 className='head'>Infinite Scroll</h2>
      <InfiniteScroll
        dataLength={items.length}
        next={getDataFromAPI}
        hasMore={true}
        loader={<Typography variant="h6" style={styles.loading}>Loading...</Typography>}
      >
        <Grid container spacing={2} style={styles.grid}>
          {items.map(item => (
            <Grid item xs={12} key={item.id}>
              <div style={styles.main}>
                <h3>Name: {item?.name?.first + item?.name?.last}</h3>
                <h3>Email: {item?.email}</h3>
              </div>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </>
  );
};

const styles = {
  grid: {
    maxWidth: 600,
    margin: '0 auto',
  },
  main: {
    padding: 16,
    border: '1px solid #ccc',
    borderRadius: 4,
  },
  loading: {
    textAlign: 'center',
    marginTop: 16,
  },
};

export default App;
