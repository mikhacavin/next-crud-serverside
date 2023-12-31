import Link from "next/link";
import AddProduct from "./components/AddProduct";
import DeleteProduct from "./components/DeleteProduct";
import UpdateProduct from "./components/UpdateProduct";


type Product = {
    id: string;
    title: string;
    description: string;
}

async function getProducts(){
    const res = await fetch('https://next-blog-prisma.vercel.app/api/blog', {
        cache : "no-store"});
    // return res.json();
    const data = await res.json();
    return data.posts;
}


const ProductList = async () => {
    const posts: Product[] = await getProducts();
  return (
    <div className="py-10 px-10">
        <div className="py-2">
            <AddProduct />
            <Link href={"/posts/1/mimimi/this is route"} className="btn"> Posts</Link>
        </div>
        <table className="table w-full">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Blog Title</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
        {posts.map((post, index) =>(
           <tr key={post.id}>
                <td>{index +1}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td className="flex">
                    <UpdateProduct {...post} />
                    <DeleteProduct {...post} />
                    </td>
           </tr>
            ))}
            </tbody>
        </table>
    </div>
  )
}

export default ProductList