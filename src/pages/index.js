import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image";
import SEO from "../components/seo"

const IndexPage = ({ data, location }) => {
  const samplePosts = data.allContentfulSamplePosts.edges;

  return (
  <Layout>
    <SEO title="Home" />
    <div className="bg-gray">
      <div className="ast-container ast-container-top">
        <h2>Sample Posts</h2>
        {samplePosts && samplePosts.map(({ node: post }) => {
          return (
            <Link to={`/post/${post.slug}/`} className="post-basic-item flex-column">
              <div className="flex-column-3">
                {post.thumbnail && //もしサムネイル画像をもっていれば
                  <Img
                    fluid={post.thumbnail.fluid}
                    className="thumbnail"
                  />
                }
              </div>
              <div className="flex-column-9">
                <h3>{post.title}</h3>
                <div className="post-basic-postedat">Posted on {post.createdAt}</div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="ast-container ast-container-top">
        <h2>Cloudinary Sample Posts</h2>
        <Link to="/cloudinary/test-post-cloudinary" className="post-basic-item flex-column">
          test-post-cloudinary
        </Link>
      </div>
    </div>
  </Layout>
  );
};
export default IndexPage

export const query = graphql`
  query QueryTop {
    allContentfulSamplePosts: allContentfulSamplePosts( sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          title
          slug
          thumbnail {
            fluid(maxWidth : 600) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          createdAt(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`;