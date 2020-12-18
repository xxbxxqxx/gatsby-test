const path = require(`path`);
const slash = require(`slash`);
exports.createPages = ({ graphql, actions }) => {
  const { createRedirect } = actions;
  const { createPage } = actions;

  return graphql(
    `
      {
        allContentfulSamplePosts {
          edges {
            node {
              id
              slug
            }
          }
        }
        allContentfulSamplePosts2 {
          edges {
            node {
              id
              slug
            }
          }
        }
      }
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data",      result.errors);
      }

      const template = path.resolve("./src/templates/post.js");
      result.data.allContentfulSamplePosts.edges.forEach(edge => {

        //const relatedTags = [];
        //edge.node.tags && edge.node.tags.forEach(tag => {
        //  relatedTags.push(tag.slug);
        //})

        createPage({//contextで送る値はgraphQLで変数として使用できる
          path: `/post/${edge.node.slug}/`,
          component: slash(template),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
            //tags: relatedTags
          }
        });
      });
      const template2 = path.resolve("./src/templates/post-cloudinary.js");
      result.data.allContentfulSamplePosts2.edges.forEach(edge => {

        //const relatedTags = [];
        //edge.node.tags && edge.node.tags.forEach(tag => {
        //  relatedTags.push(tag.slug);
        //})

        createPage({//contextで送る値はgraphQLで変数として使用できる
          path: `/cloudinary/${edge.node.slug}/`,
          component: slash(template2),
          context: {
            slug: edge.node.slug,
            id: edge.node.id,
            //tags: relatedTags
          }
        });
      });

      ////Main Categoryごとの記事一覧ページ
      //const mainCategoryTemplate = path.resolve("./src/templates/category.js");
      //const categories = [
      //  { name_en: 'Travel',
      //    slug: 'travel',
      //    name_fr: 'Voyage',
      //    name_ja: '旅する',
      //    desc: '日本からフランスへの旅行、フランス国内旅、ヨーロッパへの旅を楽しむための便利情報'
      //  },
      //  { name_en: 'Life',
      //    slug: 'life',
      //    name_fr: 'Vie',
      //    name_ja: '暮らす',
      //    desc: 'フランス生活を始めるためのヒントや、暮らしの役立ち情報、時事ニュースなど'
      //  },
      //];
      //categories.forEach(categoryItem => {
      //  createPage({
      //    //path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      //    path: `/${categoryItem.slug}/`,
      //    component: mainCategoryTemplate,
      //    context: {
      //      slug: categoryItem.slug,
      //      name_en: categoryItem.name_en,
      //      name_fr: categoryItem.name_fr,
      //      name_ja: categoryItem.name_ja,
      //      desc: categoryItem.desc,
      //    },
      //  })
      //})

      ////subCategoryごとのページ作成
      //const subCategoryTemplate = path.resolve("./src/templates/subCategory.js");
      //const subCategory = result.data.subCategories.nodes;
      //subCategory.forEach(subCategoryItem => {
      //  createPage({
      //    path: `/${subCategoryItem.parentCategory.toLowerCase()}/${subCategoryItem.name_en.toLowerCase()}/`,
      //    //path: `/subs/${subCategoryItem.name_en}/`,
      //    component: subCategoryTemplate,
      //    context: {
      //      name_en: subCategoryItem.name_en,
      //      name_fr: subCategoryItem.name_fr,
      //      name_ja: subCategoryItem.name_ja,
      //      parentCategory: subCategoryItem.parentCategory,
      //    },
      //  })
      //})

      ////Tagごとの記事一覧ページ
      //const tagTemplate = path.resolve("./src/templates/tag.js");
      //const tags = result.data.tags.distinct;
      //tags.forEach(tagSlug => {
      //  createPage({
      //    path: `/tag/${tagSlug}/`,
      //    component: tagTemplate,
      //    context: {
      //      slug: tagSlug,
      //    },
      //  })
      //})
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};
exports.onCreateNode = ({ node }) => {
  console.log(node.internal.type)
}

