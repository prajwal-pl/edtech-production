import React from "react";
import DashboardComponent from "@/components/global/DashboardComponent";
import Container from "@/components/global/Container";
import { ensureUserInDatabase } from "@/actions/ensure-user";
import { auth, currentUser } from "@clerk/nextjs/server";

// Add server-side data fetching
export async function generateMetadata() {
  // This will be called on the server side before rendering
  // and will ensure the user is in our database
  await ensureUserInDatabase();

  return {
    title: "Dashboard | EdTech Platform",
  };
}

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
