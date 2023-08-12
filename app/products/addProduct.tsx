'use client'
import {SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

const addProduct = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [modal,setModal] = useState(false);
    const [isMutating,setIsMutating] = useState(false);

    const router = useRouter()

async function handleSubmit(e:SyntheticEvent){
e.preventDefault()
setIsMutating(true)
await fetch('https://next-blog-prisma.vercel.app/api/blog',
{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title,
        description
    })
})
setIsMutating(false)
setTitle("")
setDescription("")
router.refresh();
setModal(false)
}

function handleChange(){
    setModal(!modal);
}



  return (
    <div>
        <button className="btn" onClick={handleChange}>Add New</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">add new Blog</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" className="input w-full input-bordered" placeholder="Blog name" value={title} onChange={(e) =>setTitle(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Description</label>
                        <input type="text" className="input w-full input-bordered" placeholder="Description" value={description} onChange={(e) =>setDescription(e.target.value)}  />
                    </div>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>Close</button>
                        {!isMutating ? (
                        <button type="submit" className="btn btn-primary">Save</button>
                        ): (
                        <button type="button" className="btn loading">Saving..</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default addProduct