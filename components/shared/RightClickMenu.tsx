"use client"; // 클라이언트 컴포넌트
/* eslint-disable multiline-ternary */
import { BLOG } from "@/blog.config";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { useGlobal } from "@/lib/providers/globalProvider";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowUpRightFromSquare,
  faBullhorn,
  faCloudMoon,
  faCloudSun,
  faPodcast,
  faRotateRight,
  faSquareMinus,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// 사전에 사용할 아이콘 추가
library.add(
  faBullhorn,
  faRotateRight,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faPodcast,
  faSquareMinus,
  faTag,
  faArrowUpRightFromSquare,
  faCloudSun,
  faCloudMoon
);
/**
 * Customize right-click menu
 * @param {*} props
 * @returns
 */
export default function RightClickMenu(props: any) {
  const { latestPosts } = useGlobal({ from: "index" });
  const [position, setPosition] = useState({ x: "0px", y: "0px" });
  const [show, setShow] = useState(false);
  const { isDarkMode, locale, handleChangeDarkMode } = useGlobal({
    from: "index",
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const router = useRouter();
  /**
   * Randomly jump to articles
   */
  function handleJumpToRandomPost() {
    const randomIndex = Math.floor(props * latestPosts.length);
    const randomPost: any = latestPosts[randomIndex];
    router.push(`${BLOG.SUB_PATH}/${randomPost?.slug}`);
  }

  useLayoutEffect(() => {
    if (menuRef.current) {
      setWidth(menuRef.current.offsetWidth);
      setHeight(menuRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      // Calculate whether the click position plus menu width and height exceed the screen. If it exceeds, the edge will pop up.

      if (windowSize.width !== undefined && windowSize.height) {
        const x =
          event.clientX < windowSize.width - width
            ? event.clientX
            : windowSize.width - width;
        const y =
          event.clientY < windowSize.height - height
            ? event.clientY
            : windowSize.height - height;
        setPosition({ y: `${y}px`, x: `${x}px` });
        setShow(true);
      }
    };

    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, [windowSize]);

  function handleBack() {
    router.back();
  }

  function handleForward() {
    if (typeof window !== "undefined") {
      window.history.forward();
    }
  }

  function handleRefresh() {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }

  function handleScrollTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setShow(false);
    }
  }

  function handleCopyLink() {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log("The page address has been copied");
        })
        .catch((error) => {
          console.error("Failed to copy page address:", error);
        });
      setShow(false);
    }
  }

  return (
    <div
      ref={menuRef}
      style={{ top: position.y, left: position.x }}
      className={`${
        show ? "" : "invisible opacity-0"
      } select-none transition-opacity duration-200 fixed z-50`}
    >
      {/* Menu content */}
      <div className="rounded-xl w-52 dark:hover:border-yellow-600 bg-white dark:bg-[#040404] dark:text-neutral-200 dark:border-neutral-600 p-3 border drop-shadow-lg flex-col duration-300 transition-colors">
        {/* Top navigation buttons */}
        <div className="flex justify-between">
          <FontAwesomeIcon
            className="dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2] px-2 py-2 text-center w-8 rounded cursor-pointer"
            icon={faArrowLeft}
            onClick={handleBack}
          />

          <FontAwesomeIcon
            className="dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2] px-2 py-2 text-center w-8 rounded cursor-pointer"
            icon={faArrowRight}
            onClick={handleForward}
          />

          <FontAwesomeIcon
            className="dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2]  px-2 py-2 text-center w-8 rounded cursor-pointer"
            icon={faRotateRight}
            onClick={handleRefresh}
          />

          <FontAwesomeIcon
            className="dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2]  px-2 py-2 text-center w-8 rounded cursor-pointer"
            icon={faArrowUp}
            onClick={handleScrollTop}
          />
        </div>

        <hr className="my-2 border-dashed" />

        {/* Jump navigation button */}
        <div className="w-full px-2">
          <div
            onClick={handleJumpToRandomPost}
            title={locale.MENU.WALK_AROUND}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer  dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2]  rounded-lg duration-200 transition-all"
          >
            <FontAwesomeIcon className="mr-2" icon={faPodcast} />
            <div className="whitespace-nowrap">{locale.MENU.WALK_AROUND}</div>
          </div>

          <Link
            href="/category"
            title={locale.MENU.CATEGORY}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2]  rounded-lg duration-200 transition-all"
          >
            <FontAwesomeIcon className="mr-2" icon={faSquareMinus} />

            <div className="whitespace-nowrap">{locale.MENU.CATEGORY}</div>
          </Link>

          <Link
            href="/tag"
            title={locale.MENU.TAGS}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2] rounded-lg duration-200 transition-all"
          >
            <FontAwesomeIcon className="mr-2" icon={faTag} />

            <div className="whitespace-nowrap">{locale.MENU.TAGS}</div>
          </Link>
        </div>

        <hr className="my-2 border-dashed" />

        {/* Function buttons */}
        <div className="w-full px-2">
          <div
            onClick={handleCopyLink}
            title={locale.MENU.COPY_URL}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer dark:hover:text-black dark:hover:bg-[#f1efe9e2] hover:text-[#f1efe9e2] rounded-lg duration-200 transition-all"
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowUpRightFromSquare} />

            <div className="whitespace-nowrap">{locale.MENU.COPY_URL}</div>
          </div>

          <div
            onClick={handleChangeDarkMode}
            title={isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE}
            className="w-full px-2 h-10 flex justify-start items-center flex-nowrap cursor-pointer dark:hover:text-black dark:hover:bg-[#f1efe9e2]  hover:text-[#f1efe9e2]  rounded-lg duration-200 transition-all"
          >
            {isDarkMode ? (
              <FontAwesomeIcon className="mr-2" icon={faCloudSun} />
            ) : (
              <FontAwesomeIcon className="mr-2" icon={faCloudMoon} />
            )}
            <div className="whitespace-nowrap">
              {isDarkMode ? locale.MENU.LIGHT_MODE : locale.MENU.DARK_MODE}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
