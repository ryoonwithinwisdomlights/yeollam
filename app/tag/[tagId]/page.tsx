import { BLOG } from "@/blog.config";
import AllRecordsPostListPage from "@/components/records/AllRecordsPostListPage";
import { getGlobalData } from "@/lib/notion/getNotionData";

export async function generateStaticParams() {
  const records = [{ tagId: "기술로그" }, { tagId: "another-Tags" }];
  return records.map((record) => ({
    tagId: record.tagId,
  }));
}

export default async function Page({ params }) {
  const { tagId } = await params;
  const decodedTagId = decodeURIComponent(tagId);

  if (!tagId) {
    return <div>Invalid tag</div>;
  }

  const props = await getGlobalData({
    type: "tag-props",
    pageId: BLOG.NOTION_PAGE_ID,
    from: "tag-props",
  });

  props.posts = props.allPages
    ?.filter(
      (page) =>
        page.type !== "CONFIG" &&
        page.type !== "Menu" &&
        page.type !== "SubMenu" &&
        page.type !== "SubMenuPage" &&
        page.type !== "Notice" &&
        page.type !== "Page" &&
        page.status === "Published"
    )
    .filter((post) => {
      // if (post.type === "Sideproject") {
      //   console.log("decodedTagId:", decodedTagId);
      //   console.log("post.tags:", post.tags);
      // }
      return post && post.tags && post.tags.includes(decodedTagId);
    });

  // Process article page count
  props.postCount = props.posts.length;
  // Handle pagination
  if (BLOG.RECORD_LIST_STYLE === "scroll") {
    // Scroll list returns all data to the front end
  } else if (BLOG.RECORD_LIST_STYLE === "page") {
    props.posts = props.posts?.slice(0, BLOG.RECORDS_PER_PAGE);
  }
  props.tag = tagId;
  delete props.allPages;

  return (
    <AllRecordsPostListPage postCount={props.postCount} posts={props.posts} />
  );
}
