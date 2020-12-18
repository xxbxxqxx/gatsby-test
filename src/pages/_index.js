import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
//import Img from "gatsby-image";
import Image from "../components/image"
import Img from "gatsby-image";
import SEO from "../components/seo"
//import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const IndexPage = ({ data, location }) => {
  const samplePosts = data.allContentfulSamplePosts.edges;

  return (
  <Layout>
    <SEO title="Home" />
    <div className="bg-gray">
      <div className="ast-container ast-container-top">
        <div className="post-basic">
          <h2>Sample Posts</h2>
          {samplePosts && samplePosts.map(({ node: post }) => {
              return (
                <Link to={`/post/${post.slug}/`} className="post-basic-item bg-white">
                  <div className="post-basic-textblock flex-row">
                    <div className="flex-column flex-column-3">
                      {post.thumbnail ? //もしサムネイル画像をもっていれば
                        <Img
                          fluid={post.thumbnail.fluid}
                          className="thumbnail"
                        />
                        :
                        <div className="thumbnail gatsby-image-wrapper img-dummy">{post.title.slice(0, 9)}...</div>
                      }
                    </div>
                    <div className="flex-column flex-column-9">
                      <h3>{post.title}</h3>
                      <p className="post-basic-desc">
                        {documentToPlainTextString(post.content.json).slice(0, 100)}...
                      </p>
                      <div className="post-basic-postedat">Posted on {post.createdAt}</div>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
        <div className="post-basic">
          <h2>Sample Posts</h2>
          <p><Link to="/cloudinary/test-post-cloudinary">LINK</Link></p>
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default IndexPage

export const query = graphql`
  query BlogArticleQueryTop {
    allContentfulSamplePosts: allContentfulSamplePosts(limit: 10, sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          id
          title
          slug
          content{
            json
          }
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