import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image";
//import { Link } from "gatsby"
//import { FaSearch } from "react-icons/fa"
//import TextHighlighter from "./highlight"
//import { Wrapper, ResultWrapper } from "./style"

const SearchResult = props => {
	// 全記事データ取得 //
	const tempData = useStaticQuery(graphql`
			query SearchData {
			allContentfulSamplePostsForSearch: allContentfulSamplePosts(sort: {fields: createdAt, order: DESC}) {
				edges {
					node {
						title
						slug
						createdAt(formatString: "YYYY-MM-DD")
					}
				}
			}
		}
	`)
	const [data, setData] = useState([])
	useEffect(() => {
		const temp = []
		tempData.allContentfulSamplePostsForSearch.edges.map(e => {
			temp.push(e.node)
		})
		setData(temp)
	}, [])

	// 表示非表示の切り替え //
	const [className, setClassName] = useState("")
	useEffect(() => {
		let id
		if (props.focus && props.value !== "") {
			id = setTimeout(() => {
				setClassName("active")
			}, 100)
		} else {
			id = setTimeout(() => {
				setClassName("")
			}, 100)
		}
		return () => {
			clearTimeout(id)
		}
	}, [props.focus, props.value])

	// 検索処理 //
	const [result, setResult] = useState([])
	const search = () => {
		const value = props.value.toLowerCase()
		const temp = data.filter(e => {
			const target = `
				${e.title.toLowerCase()}
			`
			return target.indexOf(value) !== -1
		})
		setResult(temp)
	}
	const searchNull = () => {
		const value = "oiu94823ud0j98472075dj89u4j359027097"
		const temp = data.filter(e => {
			const target = `
				${e.title.toLowerCase()}
			`
			return target.indexOf(value) !== -1
		})
		setResult(temp)
	}
	useEffect(() => {
		if (props.value !== "") {
			search()
		} else {
			searchNull()
		}
	}, [props.value])

	return (
		<div className={className}>
			<div className="result-inner">
				<div className="result-inner__res">
					{props.value !== "" ?
						props.value + " の検索結果" + result.length + "件"
						: "　"
					}
				</div>
				<ul className="result-inner__search">
					{result && result.map(e => {
						return (
							<li key={e.slug}>
								<a href={`/post/${e.slug}/`}>
									{/*<TextHighlighter str={e.title} includes={props.value} />*/}
									<div className="result-inner__title">
										{e.title}
									</div>
									<div className="result-inner__info">
										<div className="result-inner__info-date">{e.createdAt}</div>
									</div>
									{/*e.contentMarkdown.contentMarkdown*/}
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

const Search = props => {
	const [focus, setFocus] = useState(false)
	const [value, setValue] = useState("")
	const onFocus = () => {
		setFocus(true)
	}
	const onBlur = () => {
		setFocus(false)
	}
	const onChange = e => {
		setValue(e.target.value)
	}
	return (
		<div className={props.className} focus={focus}>
			<div className="searchInputWrapper">
				<input
					type="text"
					placeholder="Search..."
					onFocus={onFocus}
					onBlur={onBlur}
					onChange={onChange}
					className="searchInput"
				/>
			</div>
			<SearchResult focus={focus} value={value} />
		</div>
	)
}

export default Search