import Link from "next/link"

const PostDetail = ({params} : {params: {postId: string}}) => {
  return (
    <div>get parameter with folder
        {params.postId}
    <Link href={"/products"} className="btn"> back to home</Link>
    </div>
  )
}

export default PostDetail