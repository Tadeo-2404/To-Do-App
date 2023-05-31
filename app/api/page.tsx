import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import React, { useEffect } from "react";

const api = () => {
  useEffect(() => {
    async function createTask() {
      const task = await prisma.todo.create({
        data: {
          title: "clean room",
          description: "cleaning my room",
        },
      });
      console.log("Created task: ", task);
    }
    createTask();
  })

  return (
    <div>api</div>
  )
}

export default api