import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;

  h2 {
    /* SCALED UP TO MATCH 'MY BLOGS' EXACTLY */
    font-size: clamp(40px, 5vw, 60px); 
    font-weight: 700;
    margin-bottom: 50px;
    color: var(--lightest-slate);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    width: 100%;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .project-card {
    background-color: var(--light-navy);
    padding: 2rem;
    border-radius: var(--border-radius);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid transparent;
    text-decoration: none;

    &:hover {
      transform: translateY(-5px);
      border-color: var(--green);
    }

    h3 {
      color: var(--lightest-slate);
      margin-bottom: 10px;
      font-size: var(--fz-xl);
    }

    p {
      color: var(--slate);
      font-size: var(--fz-md);
      line-height: 1.5;
    }
  }

  .more-card {
    background-color: transparent;
    border: 2px dashed var(--green);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: var(--green-tint);
      border-style: solid;
    }

    span {
      font-family: var(--font-mono);
      color: var(--green);
      font-size: var(--fz-lg);
    }

    .arrow {
      margin-top: 10px;
      font-size: var(--fz-xxl);
      transition: var(--transition);
    }

    &:hover .arrow {
      transform: translateX(5px);
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 2
      ) {
        edges {
          node {
            frontmatter {
              title
              slug
              description
            }
          }
        }
      }
    }
  `);

  const projectEdges = data.projects.edges;

  return (
    <StyledProjectsSection id="projects">
      {/* TEXT CHANGED HERE */}
      <h2>My Projects</h2>

      <div className="projects-grid">
        {projectEdges.map(({ node }, i) => {
          const { frontmatter } = node;
          const { title, slug, description } = frontmatter;

          return (
            <Link to={slug} className="project-card" key={i}>
              <div>
                <h3>{title}</h3>
                <p>{description || "Click to view the full case study analysis."}</p>
              </div>
            </Link>
          );
        })}

        <Link to="/projects" className="project-card more-card">
          <span>More Projects</span>
          <div className="arrow">&rarr;</div>
        </Link>
      </div>
    </StyledProjectsSection>
  );
};

export default Projects;

