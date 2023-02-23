import React, { useState, useEffect } from 'react'

interface Post {
  id: number
  title: string
  body: string
}

function PostList() {
  const numberOfPosts = 10
  const [postCount, setPostCount] = useState(numberOfPosts)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${postCount}`
      )
      const newPosts = await response.json()
      setPosts([...posts, ...newPosts])
    }
    fetchPosts()
  }, [postCount])

  const handleLoadMore = () => {
    setPostCount(postCount + numberOfPosts)
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
      <button onClick={handleLoadMore}>Load More</button>
    </>
  )
}

export default PostList
