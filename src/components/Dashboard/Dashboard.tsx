type Props = {
  user: { username: string; _id: string };
};

function Dashboard({ user }: Props) {
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
}

export default Dashboard;
