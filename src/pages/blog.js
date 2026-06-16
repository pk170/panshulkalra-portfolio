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
    text-align: center;
    margin-bottom: 60px;

    .title {
      font-size: clamp(40px, 5vw, 60px);
      color: var(--lightest-slate);
    }
    
    .subtitle {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
      margin-top: 10px;
    }
  }

  .grid-section-title {
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    
    &::after {
      content: '';
      display: block;
      width: 100px;
      height: 1px;
      position: relative;
      top: 5px;
      left: 20px;
      background-color: var(--lightest-navy);
    }
  }

  .unified-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 60px;
  }

  .folder-card {
    background-color: var(--light-navy);
    padding: 2.25rem 1.75rem;
    border-radius: var(--border-radius);
    border: 1px solid transparent;
    text-decoration: none;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    position: relative;

    .folder-icon {
      color: var(--green);
      font-size: 40px;
      margin-bottom: 20px;
    }

    h3 {
      font-size: var(--fz-xl);
      color: var(--lightest-slate);
      margin-bottom: 12px;
    }

    p {
      color: var(--slate);
      font-size: 14px;
      line-height: 1.4;
    }

    .meta-info {
      margin-top: auto;
      padding-top: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      color: var(--green);
    }

    &:hover {
      transform: translateY(-5px);
      border: 1px solid var(--green);
      box-shadow: 0 10px 30px -15px var(--navy-shadow);
    }
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

const BlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  
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

  const uniqueSeriesNames = Object.keys(seriesGroups);

  return (
    <Layout location={location}>
      <Helmet title="Publications | Portfolio" />

      <StyledMainContainer className="fillHeight">
        <header>
          <h1 className="title">All my blogs</h1>
          <p className="subtitle">Explorations in tech, strategy, and systems</p>
        </header>

        {uniqueSeriesNames.length > 0 && (
          <>
            <h2 className="grid-section-title">Curated Series</h2>
            <div className="unified-grid">
              {uniqueSeriesNames.map(seriesName => {
                const totalParts = seriesGroups[seriesName].length;
                const folderDesc = seriesGroups[seriesName][0].frontmatter.description;
                
                // Formats the URL exactly the same way gatsby-node did
                const formattedSlug = seriesName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                const seriesUrl = `/blog/${formattedSlug}`;

                return (
                  <Link 
                    key={seriesName} 
                    to={seriesUrl}
                    className="folder-card"
                  >
                    <div className="folder-icon">📂</div>
                    <h3>{seriesName}</h3>
                    <p>{folderDesc}</p>
                    <div className="meta-info">⚡ {totalParts} {totalParts === 1 ? 'Part' : 'Parts'}</div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {independentPosts.length > 0 && (
          <>
            <h2 className="grid-section-title">Independent Articles</h2>
            <div className="unified-grid">
              {independentPosts.map((node, i) => {
                const { title, description, date, slug } = node.frontmatter;
                const formattedDate = new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                });

                return (
                  <Link key={i} to={slug} className="article-card">
                    <span className="date">{formattedDate}</span>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </Link>
                );
              })}
            </div>
          </>
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