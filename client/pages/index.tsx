import Seo from "../components/Seo";

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from "../components/MarkDown";

export default function Home() {
  const posts = ["#post1\n ##post1\n - qwrqwrqw\n - qwrqwrqwrwqr\n - qrqwrqwqwr", "post2", "post3"];
  const title = 'From the firehose';

  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Seo title="Home"/>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <Markdown className="markdown" key={post.substring(0, 40)}>
          {post}
        </Markdown>
      ))}
    </Grid>
  );
}