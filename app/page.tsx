import Link from "next/link"

export default function Home() {
  return (
  <div>hi
        <Link href={"/products"} className="btn"> Go To Products</Link>
  </div>
  )
}
