//@ts-nocheck
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function LinkBack() {
  return <Link to={-1} className="inline-block"> <ArrowLeft /></Link>
}
