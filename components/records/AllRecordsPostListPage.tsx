"use client";
import { BLOG } from "@/blog.config";
import AllRecordsPostCard from "./AllRecordsPostCard";
import NavPostListEmpty from "./NavPostListEmpty";
import PaginationSimple from "../PaginationSimple";
import { useRouter } from "next/navigation";
import { useGlobal } from "@/lib/providers/globalProvider";
/**
 * Article list pagination table
 * @param page current page
 * @param posts All articles
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const AllRecordsPostListPage = ({
  page = 1,
  posts = [],
  postCount,
}: {
  page?: number;
  posts?: [];
  postCount: number;
}) => {
  const router = useRouter();
  const { searchKeyword, setSearchKeyword } = useGlobal({});
  const totalPage = Math.ceil(postCount / BLOG.RECORDS_PER_PAGE);

  if (!posts || posts.length === 0) {
    return <NavPostListEmpty searchKeyword={searchKeyword} />;
  }
  const historGoBack = () => {
    router.back();
  };
  return (
    <div className="w-full justify-center gap-2">
      <div
        onClick={historGoBack}
        className="text-center w-2/5 mt-4 mb-10  duration-200 p-2 hover:border-orange-200 border-b-2 hover:font-bold "
      >
        ← 뒤로가기
      </div>
      <div id="posts-wrapper">
        {/* Article list */}
        {posts?.map((post: any) => (
          <AllRecordsPostCard key={post.id} post={post} className={""} />
        ))}
      </div>

      <PaginationSimple page={page} totalPage={totalPage} />
    </div>
  );
};

export default AllRecordsPostListPage;
