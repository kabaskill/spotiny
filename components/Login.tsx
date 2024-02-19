import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const session = useSession();

  if (session.status === "authenticated") {
    return (
      <>
        Signed in as {session.data?.user?.email} <br />
        <button className="borde-2 border-sky-500" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button className="borde-2 border-sky-500" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
}
