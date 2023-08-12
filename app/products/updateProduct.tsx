'use client'
import {SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
    _id: string;
    title: string;
    description: string;
}

const updateProduct = (post : Product) => {
    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [modal,setModal] = useState(false);
    const [isMutating,setIsMutating] = useState(false);

    const router = useRouter()

async function handleUpdate(e:SyntheticEvent){
e.preventDefault()
setIsMutating(true)
await fetch(`https://next-blog-prisma.vercel.app/api/blog/${post._id}`,
{
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title,
        description
    })
})
setIsMutating(false)
router.refresh();
setModal(false)
}

function handleChange(){
    setModal(!modal);
}



  return (
    <div>
        <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit {post.title}</h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" className="input w-full input-bordered" placeholder="Product name" value={title} onChange={(e) =>setTitle(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Description</label>
                        <input type="text" className="input w-full input-bordered" placeholder="Price" value={description} onChange={(e) =>setDescription(e.target.value)}  />
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isMutating ? (
                        <button type="submit" className="btn btn-primary">Update</button>
                        ): (
                        <button type="button" className="btn loading">Updating..</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default updateProduct