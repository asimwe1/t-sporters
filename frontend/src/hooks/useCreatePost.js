import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const createPost = async (title, description, file) => {
    try {
      const res = await fetch('/api/post/create', {
        method : 'POST',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify({ title, description, file})
      });
      const data = res.json();
    } catch (error) {
      console.log(error.message);
    }
  }
}