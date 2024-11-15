import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Title from "./title";
import AddTask from "./add";
import { isValidAuthToken } from "./authUtils";
import {useRouter} from "next/router";

function Dashboard() {

  const router = useRouter();

  useEffect(() => {
  const isAuthenticated = sessionStorage.getItem("authenticated")=="true"
    console.log("isAuthenticated:", isAuthenticated);
    if (!isAuthenticated) {
      console.log("Not authorized");
      router.push("/login");
    }
  }, []);
  //   console.log("Not Authenticated");
  //   return (
  //     <div>
  //       <p>You are not authenticated.</p>
  //     </div>
  //   );
  // }

  console.log("User is authenticated. Rendering dashboard...");

  return (
    <div>
      <Navbar />
      <Title />
      <AddTask />
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const authToken = req.headers.authorization;

//   const isAuthenticated = isValidAuthToken(authToken);

//   if (!isAuthenticated) {
//     console.log("Not Authenticated. Redirecting to login...");
//     // return {
//     //   redirect: {
//     //     destination: '/login',
//     //     permanent: false,
//     //   },
//     // };
//   }

//   console.log("User is authenticated.");

//   // Pass the isAuthenticated prop to the Dashboard component
//   return {
//     props: { isAuthenticated },
//   };
// }

export default Dashboard;
