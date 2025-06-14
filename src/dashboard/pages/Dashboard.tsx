import Navbar from '../../shared/components/Navbar';

function Dashboard() {
  return (
    <main className="w-full h-screen flex flex-col">
      <Navbar />
      <aside className="h-full w-[250px] border-r-2">Mani</aside>
    </main>
  );
}

export default Dashboard;
