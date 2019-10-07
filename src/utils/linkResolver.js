// -- The Link Resolver
// This function will be used to generate links to Prismic documents
// As your project grows, you should update this function according to your routes

exports.linkResolver = function linkResolver(doc) {
    // Route for blog posts
    if (doc.type === 'Post') {
        return '/projects/' + doc.uid;
    }

    if (doc.type === 'Work') {
        return '/work/' + doc.uid;
    }

    if (doc.type === 'Initiative') {
        return '/initiatives/' + doc.uid;
    }

    return '/';
}