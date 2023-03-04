import SingUp from "@/components/SignUp";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react"

const SignUpPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [router, user])


  return ( 
    <SingUp />
   );
}
 
export default SignUpPage;