import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledProjectContainer = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 0;

  @media (max-width: 768px) {
    padding: 80px 0;
  }
`;

const StyledProjectHeader = styled.header`
  margin-bottom: 50px;

  h1 {
    font-size: clamp(30px, 5vw, 50px);
    margin-bottom: 20px;
  }

  .github-button {
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    font-family: var(--font-mono);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    margin-top: 10px;
    display: inline-block;

    &:hover,
    &:focus,
    &:active {
      background-color: var(--green-tint);
      outline: none;
    }
  }
`;

const StyledProjectContent = styled.div`
  h2, h3, h4, h5, h6 {
    margin: 2em 0 1em;
    color: var(--lightest-slate);
  }

  p {
    margin: 1em 0;
    line-height: 1.6;
    color: var(--light-slate);
  }

  a {
    color: var(--green);
    text-decoration: underline;
  }
  
  ul, ol {
    color: var(--light-slate);
    margin-bottom: 1em;
  }
`;

const ProjectTemplate = ({ location, data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { title, github } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={title} />
      <StyledProjectContainer>
        <StyledProjectHeader>
          <h1 className="title">{title}</h1>
          
          {github && (
            <a className="github-button" href={github} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          )}
        </StyledProjectHeader>

        <StyledProjectContent dangerouslySetInnerHTML={{ __html: html }} />
      </StyledProjectContainer>
    </Layout>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        github
      }
    }
  }
`;