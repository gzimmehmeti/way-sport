import React from "react";
import { Button } from "@/components/ui/button";
import Page from "./page";
type Props = {};

const Home = (props: Props) => {
  return (
    <Page>
      <div>
        <Button
          className="bg-green-400"
          onClick={async () => {
            const newUser = await window.ipcRenderer.invoke("create-user", {});
            console.log("new user ..:", newUser);
          }}
        >
          add new user
        </Button>
        <h1></h1>
        <Button
          onClick={async () => {
            const users = await window.ipcRenderer.invoke("get-users");
            console.log("all users..:", users);
          }}
        >
          view users
        </Button>
      </div>
    </Page>
  );
};

export default Home;
