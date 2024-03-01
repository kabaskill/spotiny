import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const session = useSession();

  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col">
        <p className="text-center">Signed in as {session.data?.user?.email}</p>
        <button className="border-2 border-sky-500" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <p className='text-center'>Not signed in</p>
      <button className="border-2 border-sky-500" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
