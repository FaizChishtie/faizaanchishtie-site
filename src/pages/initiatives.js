import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import Layout from "components/Layout";
import InitiativeCard from "components/InitiativeCard";

const WorkTitle = styled("h1")`
    margin-bottom: 1em;
`

const Initiatives = ({ initiatives, meta }) => (
    <>
        <Helmet
            title={`Initiatives | Faizaan Chishtie's Initiatives`}
            titleTemplate={`%s | Initiatives | Faizaan Chishtie's Initiatives`}
            meta={[
                {
                    name: `description`,
                    content: meta.description,
                },
                {
                    property: `og:title`,
                    content: `Initiatives | Faizaan Chishtie's Initiatives`,
                },
                {
                    property: `og:description`,
                    content: meta.description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: meta.author,
                },
                {
                    name: `twitter:title`,
                    content: meta.title,
                },
                {
                    name: `twitter:description`,
                    content: meta.description,
                },
            ].concat(meta)}
        />
        <Layout>
            <WorkTitle>
                Initiatives
            </WorkTitle>
            <>
                {initiatives.map((initiative, i) => (
                    <InitiativeCard
                        key={i}
                        category={initiative.node.initiative_category}
                        title={initiative.node.initiative_title}
                        description={initiative.node.initiative_preview_description}
                        thumbnail={initiative.node.initiative_preview_thumbnail}
                        uid={initiative.node._meta.uid}
                    />
                ))}
            </>
        </Layout>
    </>
);

export default ({ data }) => {
    const initiatives = data.prismic.allInitiatives.edges;
    const meta = data.site.siteMetadata;
    if (!initiatives) return null;

    return (
        <Initiatives initiatives={initiatives} meta={meta}/>
    )
}

Initiatives.propTypes = {
    initiatives: PropTypes.array.isRequired,
};

export const query = graphql`
    {
        prismic {
            allInitiatives {
                edges {
                    node {
                        initiative_title
                        initiative_preview_description
                        initiative_preview_thumbnail
                        initiative_category
                        initiative_post_date
                        _meta {
                            uid
                        }
                    }
                }
            }
        }
        site {
            siteMetadata {
                title
                description
                author
            }
        }
    }
`

