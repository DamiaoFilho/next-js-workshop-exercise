import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import logo from "/public/logo.png";
import path from "path";
import { title } from "process";

interface Movie {
  movie: {
    Title: string;
    Year: string;
    Genre: string;
    Director: string;
    Language: string;
    Poster: string;
  } | null;
  slug: string;
}

export default function Movie({ movie, slug }: Movie) {
  return (
    <main className="bg-black h-[100vh] flex flex-col p-[70px] pb-[0] items-center">
      <a href="/" className="flex items-center gap-4 drop-shadow-lg mb-[32px]">
        <Image src={logo} width={60} height={60} alt="logo" />
        <h1 className="text-[31px] text-white font-bold">MovDB</h1>
      </a>
      {movie ? (
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-white text-center text-6xl">{movie.Title}</h1>
          <Image src={movie.Poster} width={300} height={300} alt="Img"></Image>
          <p className="text-white text-center text-xl">{movie.Genre}</p>
          <p className="text-white text-center text-lg">{movie.Year}</p>
          <p className="text-white text-center text-lg">{movie.Director}</p>
        </div>
      ) : (
        <p className="text-white">NOT MOVIE FOUND</p>
      )}
    </main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { slug } = ctx.params as { slug: string };

  try {
    const res = await movieApi.get(`?t=${slug}&apikey=97264100`);
    const { Title, Year, Genre, Director, Language, Poster, Error } = res.data;

    if (Error != null) {
      return { props: { movie: null } };
    }
    return {
      props: {
        movie: {
          Title,
          Year,
          Genre,
          Director,
          Language,
          Poster,
        },
        slug,
      },
    };
  } catch (error) {
    return {
      props: {
        movie: null,
        slug,
      },
    };
  }
};
