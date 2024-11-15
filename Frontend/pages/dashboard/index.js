import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Title from "./title";
import AddTask from "./add";
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

export default Dashboard;
