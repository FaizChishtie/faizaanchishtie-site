import React from 'react';
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import colors from "styles/colors";
import { Link, graphql } from 'gatsby';
import { RichText } from "prismic-reactjs";
import Button from "components/_ui/Button";
import Layout from "components/Layout";

const InitiativeHeroContainer = styled("div")`
    background: ${colors.grey200};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    position: relative;
    padding-top: 2.25em;
    margin-bottom: 3.5em;

    img {
        max-width: 600px;
    }
`

const InitiativeTitle = styled("div") `
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
`

const InitiativeBody = styled("div")`
    max-width: 550px;
    margin: 0 auto;

    .block-img {
        margin-top: 3.5em;
        margin-bottom: 0.5em;

        img {
            width: 100%;
        }
    }
`

const WorkLink = styled(Link)`
    margin-top: 3em;
    display: block;
    text-align: center;
`


const Initiative = ({ initiative, meta }) => {
    return (
        <>
            <Helmet
                title={`${initiative.initiative_title[0].text}`}
                titleTemplate={`%s | ${meta.title}`}
                meta={[
                    {
                        name: `description`,
                        content: meta.description,
                    },
                    {
                        property: `og:title`,
                        content: `${initiative.initiative_title[0].text}`,
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
                <InitiativeTitle>
                    {RichText.render(initiative.initiative_title)}
                </InitiativeTitle>
                {initiative.initiative_hero_image && (
                    <InitiativeHeroContainer>
                        <img src={initiative.initiative_hero_image.url} alt="bees" />
                    </InitiativeHeroContainer>
                )}
                <InitiativeBody>
                    {RichText.render(initiative.initiative_description)}
                    <WorkLink to={"/initiatives"}>
                        <Button className="Button--secondary">
                            See other initiatives
                        </Button>
                    </WorkLink>
                </InitiativeBody>
            </Layout>
        </>
    )
}

export default ({ data }) => {
    const InitiativeContent = data.prismic.allInitiatives.edges[0].node;
    const meta = data.site.siteMetadata;
    return (
        <Initiative initiative={InitiativeContent} meta={meta}/>
    )
}

Initiative.propTypes = {
    Initiative: PropTypes.object.isRequired,
};

export const query = graphql`
    query InitiativeQuery($uid: String) {
        prismic {
            allInitiatives(uid: $uid) {
                edges {
                    node {
                        initiative_title
                        initiative_preview_description
                        initiative_preview_thumbnail
                        initiative_category
                        initiative_post_date
                        initiative_hero_image
                        initiative_description
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