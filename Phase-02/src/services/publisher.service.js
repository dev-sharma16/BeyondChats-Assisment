import axios from 'axios';
import { config } from '../config/env.js';

export const publishUpdatedArticle = async (
  articleId,
  updatedContent,
  references
) => {
  await axios.put(`${config.phase1Api}/articles/${articleId}`, {
    content: `${updatedContent}
<hr/>
<h3>References</h3>
<ul>
${references.map((r) => `<li><a href="${r}">${r}</a></li>`).join('')}
</ul>`,
    isUpdated: true,
    references,
  });
};
