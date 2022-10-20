import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTimelinePosts } from '../../actions/PostAction'

const Posts = () => {

  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.authReducer.authData)
  let {posts, loading} = useSelector((state) => state.postReducer)
  const params = useParams()
  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])

  if(!posts) return 'No posts available right now'

  if(params.id) posts = posts.filter((post) => post.userId === params.id)

  return (
    <div className='Posts'>
        { loading ? 'Fetching Posts...' :
          posts.map((post, id) => {
              return <Post data={post} id={id} key={id} />
          })
        }
    </div>
  )
}

export default Posts