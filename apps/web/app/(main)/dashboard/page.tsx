import React from "react";
import DashboardComponent from "@/components/global/DashboardComponent";
import Container from "@/components/global/Container";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  // Get the current user - this is server-side and will have
  // already been ensured to exist in our database by generateMetadata
  const user = await currentUser();
  const username = user?.firstName || "Student";

  return (
    <Container>
      <DashboardComponent username={username} />
    </Container>
  );
}
