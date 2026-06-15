import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  padding: 100px 0;

  header {
    text-align: center;
    margin-bottom: 50px;

    .title {
      font-size: clamp(40px, 5vw, 60px);
    }

    .subtitle {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
      margin-top: 10px;
    }
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 50px;
  }

  .post-card {
    background-color: var(--light-navy);
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    text-decoration: none;
    transition: var(--transition);
    display: flex;
    flex-direction: column;

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

  return (
    <Layout location={location}>
      <Helmet title="Engineering Archive" />

      <StyledMainContainer className="fillHeight">
        <header>
          <h1 className="title">Engineering Archive</h1>
          <p className="subtitle">Technical Post-Mortems & Market Analysis</p>
        </header>

        <div className="posts-grid">
          {posts.length > 0 &&
            posts.map(({ node }, i) => {
              const { frontmatter } = node;
              const { title, description, date, slug } = frontmatter;
              const formattedDate = new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
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
      </StyledMainContainer>
    </Layout>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { fields: [frontmatter___date], order: DESC }
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