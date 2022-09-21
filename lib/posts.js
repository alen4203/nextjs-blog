import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // get file names under /posts
  const filenames = fs.readdirSync(postsDir);
  const allPostsData = filenames.map((filename) => {
    // remove .md from the filename to get id
    const id = filename.replace(/\.md$/, "");

    // read markdown file as a string
    const fullPath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // use gray-matter to parse the post meta data section
    const matterResult = matter(fileContents);

    // combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // sort posts by dates
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

// the return list must be an array of objects with a params key, and contains an object with the 'id' key
// since we are using [id] in the filename, otherwise getStaticPaths will fail.
export function getAllPostsIds() {
  const filenames = fs.readdirSync(postsDir);
  return filenames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContent);

  // use remark to convert markdown into html string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const htmlContent = processedContent.toString();

  // combine the data with id and htmlContent
  return {
    id,
    htmlContent,
    ...matterResult.data,
  };
}
