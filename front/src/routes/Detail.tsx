import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IMovie, IMovieQuery } from './Home';

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  position: relative;
  flex-wrap: wrap;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div<{ bg?: string }>`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Suggestion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SgColumn = styled.div`
  width: 200px;
  margin-left: 10px;
  height: 300px;
`;

const SgPoster = styled.div<{ bg?: string }>`
  height: 100%;
  width: 100%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      language
      rating
      medium_cover_image
      description_full
    }
    suggestions(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery<IMovieQuery<IMovie>>(GET_MOVIE, {
    variables: { id: id && +id },
  });
  console.log(data);
  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? 'Loading...'
            : `${data?.movie.title} ${data?.movie.isLiked ? 'OK' : 'NOT'}`}
        </Title>
        {!loading && (
          <>
            <Subtitle>
              {data?.movie?.language} &#183; {data?.movie?.rating}
            </Subtitle>
            <Description>{data?.movie?.description_full}</Description>
          </>
        )}
      </Column>
      <Poster bg={data?.movie?.medium_cover_image} />
      <Suggestion>
        <h1 style={{ fontSize: '2rem' }}>Sugegestion</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          {data?.suggestions?.map((m) => (
            <Link key={m.id} to={`/${m.id}`}>
              <SgColumn style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{m.title}</span>
                <SgPoster bg={m.medium_cover_image} />
              </SgColumn>
            </Link>
          ))}
        </div>
      </Suggestion>
    </Container>
  );
};

export default Detail;
