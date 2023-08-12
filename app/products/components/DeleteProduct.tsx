'use client'
import {useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
    _id: string;
    title: string;
    description: string;
}


const DeleteProduct = (post : Product) => {
    const [modal,setModal] = useState(false);
    const [isMutating,setIsMutating] = useState(false);

    const router = useRouter()

    async function handleDelete(productId:string){
    setIsMutating(true)
    await fetch(`https://next-blog-prisma.vercel.app/api/blog/${productId}`,
    {
        method: 'DELETE',
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
        <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are You Sure to delete this {post.title}?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isMutating ? (
                        <button type="button" onClick={() =>handleDelete(post._id)} className="btn btn-primary">Delete</button>
                        ): (
                        <button type="button" className="btn loading">Deleting..</button>
                        )}
                    </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteProduct