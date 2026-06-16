import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  padding: 220px 0 100px;
  max-width: 1000px;
  margin: 0 auto;

  header {
    text-align: left;
    margin-bottom: 40px;

    .title {
      font-size: clamp(30px, 4vw, 45px);
      color: var(--lightest-slate);
    }
    
    .subtitle {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
      margin-bottom: 10px;
      display: block;
    }
  }

  .unified-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
  }

  .article-card {
    background-color: var(--light-navy);
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    height: 100%;

    .date {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      margin-bottom: 10px;
    }

    h3 {
      font-size: var(--fz-xl);
      color: var(--lightest-slate);
      margin-bottom: 10px;
      line-height: 1.2;
    }

    p {
      color: var(--light-slate);
      font-size: 14px;
      line-height: 1.4;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px -15px var(--navy-shadow);
      h3 { color: var(--green); }
    }
  }
`;

const SeriesTemplate = ({ pageContext, data, location }) => {
  const { series } = pageContext;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <Helmet title={`${series} | Publications`} />

      <StyledMainContainer className="fillHeight">
        <header>
          <span className="subtitle">Series Publication</span>
          <h1 className="title">{series}</h1>
        </header>

        <div className="unified-grid">
          {posts.map(({ node }, i) => {
            const { title, description, date, slug } = node.frontmatter;
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            });

            return (
              <Link key={i} to={slug} className="article-card">
                <span className="date">Part {i + 1} — {formattedDate}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </Link>
            );
          })}
        </div>
      </StyledMainContainer>
    </Layout>
  );
};

export default SeriesTemplate;

export const pageQuery = graphql`
  query($series: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { series: { eq: $series } } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            date
            slug
          }
        }
      }
    }
  }
`;