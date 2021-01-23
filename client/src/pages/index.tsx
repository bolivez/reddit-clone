import Head from "next/head"
import { Fragment, useEffect, useState } from "react"
import Axios from "axios"
import Link from "next/link"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { Post } from "../../types"
import { GetServerSideProps } from "next"
dayjs.extend(relativeTime)

export default function Home() {
  //destructure the posts if server side rendering
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    Axios.get("posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err))
  })

  return (
    <div className="pt-12">
      <Head>
        <title>reddit: the front page of the internet</title>
        {/*<link rel="icon" href="/reddit.svg" />*/}
      </Head>
      <div className="container flex pt-4">
        {/* Posts feed*/}
        <div className="white-160">
          {posts.map((post) => (
            <div key={post.identifier} className="flex mb-4 bg-white rounded">
              {/* Vote section */}
              <div className="w-10 text-center bg-gray-200 rounded-l">
                <p>V</p>
              </div>
              {/* Post data section */}
              <div className="w-full p-2">
                <div className="flex items-center">
                  <Link href={`/r/${post.subName}`}>
                    <Fragment>
                      <img
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        className="w-6 h-6 mr-1 cursor-poiner rounder-full "
                      />
                      <a href="" className="text-xs font-bold hover:underline">
                        /r/{post.subName}
                      </a>
                    </Fragment>
                  </Link>
                  <p className="text-xs text-gray-500">
                    <span className="mx-1">•</span>
                    Posted by
                    <Link href={`/u/${post.username}`}>
                      <a className="mx-1 hover:underline">/u/{post.username}</a>
                    </Link>
                    <Link
                      href={`/r/${post.subName}/${post.identifier}/${post.slug}`}
                    >
                      <a className="mx-1 hover:underline">
                        {dayjs(post.createdAt).fromNow()}
                      </a>
                    </Link>
                  </p>
                </div>
                <Link href={post.url}>
                  <a className="my-1 text-lg font-medium">{post.title} </a>
                </Link>
                {post.body && <p className="my-1 text-sm"> {post.body} </p>}

                <div className="flex">
                  <Link href={post.url}>
                    <a>
                      <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                        <i className="mr-1 fas fa-comment-alt fa-xs"></i>
                        <span className="font-bold">20 Comments</span>
                      </div>
                    </a>
                  </Link>
                  <a>
                    <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                      <i className="mr-1 fas fa-share fa-xs"></i>
                      <span className="font-bold">Share</span>
                    </div>
                  </a>
                  <a>
                    <div className="px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                      <i className="mr-1 fas fa-bookmark fa-xs"></i>
                      <span className="font-bold">Save</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar*/}
      </div>
    </div>
  )
}
/*
Server Side Rendering
export const getStaticProps: GetServerSideProps = async (context) => {
  try {
    const res = await Axios.get("/posts")

    return { props: { posts: res.data } }
  } catch (err) {
    return { props: { error: "Something went wrong" } }
  }
}
*/