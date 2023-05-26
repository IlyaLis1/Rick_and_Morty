import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CharacterProfile() {
  const router = useRouter();
  const [data, setData] = useState({});

  useEffect(() => {
    router.query.pid &&
      fetch(`https://rickandmortyapi.com/api/character/${router.query.pid}`)
        .then((res) => res.json())
        // Логика, если эпизоды будут приходить массивом IRI
        .then(async (res) => {
          if (res.episode?.length) {
            await fetch(
              `https://rickandmortyapi.com/api/episode/${res.episode
                .map((episode) => episode.split("/").pop())
                .join(",")}`
            )
              .then((res) => res.json())
              .then((episodes) => {
                console.log(episodes)
                res.episode = Array.isArray(episodes) ? episodes : [episodes]
              });
          }

          return res;
        })
        .then((res) => setData(res));
  }, [router.query]);

  console.log(data.episode);

  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={router.back}>GO BACK</button>

        <Image
          src={data.image}
          width={300}
          height={300}
          style={{ borderRadius: "9999px" }}
        />
        <h1>{data.name}</h1>
        <div style={{ display: "grid", gridColumn: 2, gap: "10px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <h3>Informations</h3>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <h3>Episodes</h3>
            {data?.episode?.map((episode) => (
              <Link key={episode.id} href={`/episodes/${episode.id}`}>
                <div>
                    <p>{episode.name}</p>
                    <p>{episode.episode}</p>
                    <p>{episode.air_date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}