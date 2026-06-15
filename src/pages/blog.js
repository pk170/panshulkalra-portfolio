import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  padding: 150px 0 100px;

  header {
    text-align: center;
    margin-bottom: 50px;

    .title {
      font-size: clamp(40px, 5vw, 60px);
    }
  }

  .series-section {
    margin-top: 60px;
    margin-bottom: 40px;
  }

  .series-title {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xl);
    margin-bottom: 30px;
    border-bottom: 1px solid var(--lightest-navy);
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    
    &::before {
      content: '▹';
      margin-right: 10px;
      font-size: var(--fz-xxl);
    }
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .post-card {
    background-color: var(--light-navy);
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    height: 100%;

    header {
      text-align: left;
      margin-bottom: 0;
    }

    .date {
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      margin-bottom: 10px;
      display: block;
    }

    h2 {
      font-size: var(--fz-xl);
      color: var(--lightest-slate);
      margin-bottom: 10px;
      line-height: 1.2;
    }

    p {
      color: var(--light-slate);
      font-size: 15px;
      margin-top: auto;
    }

    &:hover,
    &:focus {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px -15px var(--navy-shadow);
      
      h2 {
        color: var(--green);
      }
    }
  }
`;

const BlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  
  // THE SORTING ALGORITHM
  // This groups posts by their series tag. If they don't have one, they go into 'Independent Articles'
  const seriesGroups = {};
  const independentPosts = [];

  posts.forEach(({ node }) => {
    const seriesName = node.frontmatter.series;
    if (seriesName) {
      if (!seriesGroups[seriesName]) {
        seriesGroups[seriesName] = [];
      }
      seriesGroups[seriesName].push(node);
    } else {
      independentPosts.push(node);
    }
  });

  return (
    <Layout location={location}>
      <Helmet title="All my blogs" />

      <StyledMainContainer className="fillHeight">
        <header>
          <h1 className="title">All my blogs</h1>
        </header>

        {/* 1. Render all grouped Series first */}
        {Object.keys(seriesGroups).map(seriesName => (
          <div key={seriesName} className="series-section">
            <h2 className="series-title">{seriesName}</h2>
            <div className="posts-grid">
              {seriesGroups[seriesName].map((node, i) => {
                const { frontmatter } = node;
                const { title, description, date, slug } = frontmatter;
                const formattedDate = new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                });

                return (
                  <Link key={i} to={slug} className="post-card">
                    <header>
                      <span className="date">{formattedDate}</span>
                      <h2>{title}</h2>
                    </header>
                    <p>{description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* 2. Render Independent Articles below */}
        {independentPosts.length > 0 && (
          <div className="series-section">
            <h2 className="series-title">Independent Articles</h2>
            <div className="posts-grid">
              {independentPosts.map((node, i) => {
                const { frontmatter } = node;
                const { title, description, date, slug } = frontmatter;
                const formattedDate = new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                });

                return (
                  <Link key={i} to={slug} className="post-card">
                    <header>
                      <span className="date">{formattedDate}</span>
                      <h2>{title}</h2>
                    </header>
                    <p>{description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </StyledMainContainer>
    </Layout>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            date
            slug
            series
          }
        }
      }
    }
  }
`;

