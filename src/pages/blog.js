import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledMainContainer = styled.main`
  /* Increased top padding to 220px to completely clear the fixed navbar */
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

  .back-to-series-btn {
    color: var(--green);
    background: none;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    cursor: pointer;
    margin-bottom: 40px;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;

    &:hover {
      background-color: var(--green-tint);
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

  /* Folder Card Structure (For Series) */
  .folder-card {
    background-color: var(--light-navy);
    padding: 2.25rem 1.75rem;
    border-radius: var(--border-radius);
    border: 1px solid transparent;
    cursor: pointer;
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

  /* Standard Article Card Structure (For Single Posts or Parts) */
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
      
      h3 {
        color: var(--green);
      }
    }
  }
`;

const BlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;
  
  // Track which series folder the user has clicked open
  const [activeSeries, setActiveSeries] = useState(null);

  // Grouping pipeline
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

  // Calculate total counts for display on the folders
  const uniqueSeriesNames = Object.keys(seriesGroups);

  return (
    <Layout location={location}>
      <Helmet title="Publications | Portfolio" />

      <StyledMainContainer className="fillHeight">
        
        {/* VIEW 1: Main Feed (Folders + Independent Posts) */}
        {!activeSeries ? (
          <>
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
                    // Grab description from the first part to act as the folder description
                    const folderDesc = seriesGroups[seriesName][0].frontmatter.description;

                    return (
                      <div 
                        key={seriesName} 
                        className="folder-card"
                        onClick={() => setActiveSeries(seriesName)}
                      >
                        <div className="folder-icon">📂</div>
                        <h3>{seriesName}</h3>
                        <p>{folderDesc}</p>
                        <div className="meta-info">⚡ {totalParts} {totalParts === 1 ? 'Part' : 'Parts'}</div>
                      </div>
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
          </>
        ) : (
          
          /* VIEW 2: Sub-Page (Inside a Specific Series Folder) */
          <>
            <button className="back-to-series-btn" onClick={() => setActiveSeries(null)}>
              ← Back to All Blogs
            </button>

            <header style={{ textAlign: 'left', marginBottom: '40px' }}>
              <span className="subtitle">Series Publication</span>
              <h1 className="title" style={{ textAlign: 'left', fontSize: 'clamp(30px, 4vw, 45px)' }}>
                {activeSeries}
              </h1>
            </header>

            <div className="unified-grid">
              {seriesGroups[activeSeries].map((node, i) => {
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