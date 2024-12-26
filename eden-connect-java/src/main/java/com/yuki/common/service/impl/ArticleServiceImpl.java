import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../utils/request";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Container, Typography } from "@mui/material";
import Quill from "quill"; // Import Quill directly

const ArticleDetail = () => {
    const { id } = useParams();
    const [articleInfo, setArticleInfo] = useState(null);
    const [htmlContent, setHtmlContent] = useState("<p>Loading content...</p>");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        // Increment the view count for the article
        request.put(`/article/view/${id}`);

        // Fetch the article details
        request
            .get(`/article/${id}`)
            .then((res) => {
                const data = res.data.data;
                setArticleInfo(data);

                try {
                    const deltaContent = data.content; // Delta JSON content from the backend
                    console.log("Delta Content:", deltaContent); // Debugging purposes

                    // Convert Delta JSON to HTML using Quill
                    const quill = new Quill(document.createElement("div"));
                    quill.setContents(deltaContent);
                    const html = quill.root.innerHTML;

                    // Handle image dimensions manually (optional)
                    const processedHtml = html.replace(
                        /<img/g,
                        (match) => `${match} style="max-width:100%;height:auto;" `
                    );

                    setHtmlContent(processedHtml);
                } catch (err) {
                    console.error("Error parsing Delta JSON:", err);
                    setHtmlContent("<p>Failed to load content.</p>");
                }

                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching article details:", error);
                setHtmlContent("<p>Failed to load content.</p>");
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container maxWidth="md" style={{ marginTop: "2rem" }}>
            {articleInfo && (
                <>
                    <Typography variant="h4" gutterBottom>
                        {articleInfo.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        By {articleInfo.author} | {new Date(articleInfo.createdAt).toLocaleDateString()}
                    </Typography>
                </>
            )}

            {/* Render the article content */}
            <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                style={{ marginTop: "1.5rem", lineHeight: 1.6 }}
            />
        </Container>
    );
};

export default ArticleDetail;
