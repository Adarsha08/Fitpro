import Login from "./(auth)/login/page";
import SuperAdmin from "./(dashboard)/superAdmin/page";
export default function Home() {
  return (
    <div className="h-screen" >
      {/* <SuperAdmin/> */}
      <Login/>
    </div>
  );
}
