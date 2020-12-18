import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from "gatsby-image";
//import Img from "gatsby-image";

//import { renderRichText } from "gatsby-source-contentful/rich-text"
//import { renderRichText } from "gatsby-source-contentful/rich-text"
//import { BLOCKS, INLINES } from "@contentful/rich-text-types"
//import Sidebar from "../components/sidebar"
//import useContentfulImage from "../utils/useContentfulImage";
//import PostBasic from "../components/postBasic";
//import { documentToReactComponents } from '@contentful/rich-text-html-renderer';
//import marked from "marked";
//import SquareBanner from "../components/squareBanner"


const options = {
	renderText: text => {
		return text.split('\n').reduce((children, textSegment, index) => {
			return [...children, index > 0 && <br key={index} />, textSegment];
		}, []);
	},
	renderNode: {
		[BLOCKS.EMBEDDED_ASSET]: (node) => (
			<img
				src={node.data.target.fields.file["en-US"].url}
			/>
		)
	},
};
 
const samplePost2 = ({ data, location }) => {
	const { title, content, createdAt, thumbnailCloudinary } = data.contentfulSamplePosts2;

	//const imageUrl = thumbnail ? thumbnail.file.url : "//images.ctfassets.net/zbyipzusy20r/69YBVOds5ZZwcOtPgKe6dC/8bb092eeefb0372aa3f6e1be78d6f58d/pr_competition_img.jpg"

	return (
		<Layout>
			<SEO
				pageTitle={title}
				showSiteNameInTitle="true"
				//pageDescription={content.raw.replace(/\n/gi, '').replace(/#/gi, '').slice(0, 90)}
				pagePath={location.pathname}
			/>
			<div className="ast-container ast-container-post">
				<div className="main">
					<div className="post">
						<h1>{title}</h1>
						<p className="post__date">Posted on {createdAt}</p>
						<div>
							{thumbnailCloudinary ? //もしサムネイル画像をもっていれば
								<img src={thumbnailCloudinary[0].url} className="thumbnail" />
								:
								<div className="thumbnail gatsby-image-wrapper img-dummy">{title.slice(0, 18)}...</div>
							}
						</div>
						<div className="body-text">
							{documentToReactComponents(content.json, options)}
						</div>
						<p className="post__date">Posted on {createdAt}</p>
					</div>
					<div className="cm-header-manualhome-wrapper">
						<Link to="/" className="cm-header-manualhome">Go To Top</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};
export default samplePost2;
export const pageQuery = graphql`
	query( $slug: String) {
		contentfulSamplePosts2(slug: { eq: $slug }) {
			id
			title
			content{
				json
			}
			thumbnailCloudinary {
				url
				format
				public_id
			}
			createdAt(formatString: "YYYY-MM-DD")
		}
	}
`;