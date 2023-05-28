import Head from 'next/head';
import EpisodesCard from '../../components/episodes-card';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState();
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setEpisodes((prev) => [...prev, ...data.results]);
        setInfo(data.info);
      });
  }, [page]);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/episode?name=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        setEpisodes(data.results);
        setInfo(data.info);
      });
  }, [searchValue]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            color: "black"
          }}>Episodes</h1>

        <input
          style={{
            backgroundColor: "white",
            marging: "2em 2em",
            weight: "20em",
            height: "2em",
          }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2em',
          }}
        >
          {episodes.map((episode, index) => (
            <Link href={`/episodes/${episode.id}`} key={index}>
              <EpisodesCard
                name={episode.name}
                episode={episode.episode}
                air_date={episode.air_date}
              />
            </Link>
          ))}
        </div>

        {info?.next && (
          <button onClick={() => setPage((prev) => ++prev)}>Load more</button>
        )}
      </main>
    </>
  );
}